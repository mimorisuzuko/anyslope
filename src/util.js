import TurndownService from 'turndown';
import marked from 'marked';
import React from 'react';
import rp from 'request-promise';
import { css } from 'emotion';
import _ from 'lodash';
import dayjs from 'dayjs';

const turndownService = new TurndownService();
const mediaCardWidth = 500;

/**
 * @param {Element} $html
 * @returns {string}
 */
export const convertHtmlToHtmlString = ($html) => {
	return marked(turndownService.turndown($html.innerHTML).trim());
};

/**
 * @param {Element} $e
 * @returns {Element}
 */
const getScrollableParentOfArticle = ($e) => {
	const { parentElement } = $e;

	if (getComputedStyle($e).overflowY === 'scroll') {
		return $e;
	} else {
		return getScrollableParentOfArticle(parentElement);
	}
};

/**
 * @param {Element} $article
 */
export const scrollToArticleTop = ($article) => {
	const $parent = getScrollableParentOfArticle($article);

	$parent.scroll({ top: $article.offsetTop });
};

/**
 * @param {string} text
 * @param {string|RegExp} splitter
 */
const renderTextWithNewLines = (text, splitter) => {
	const tmplines = _.split(text, splitter);
	const lines = [tmplines.shift()];

	_.forEach(tmplines, (line, i) => {
		lines.push(line, <br key={i} />);
	});

	return lines;
};

/**
 * @param {string} url
 */
export const renderTweetCard = async (url) => {
	const body = await rp(url);
	const [, sceenname] = url.match(/https:\/\/twitter.com\/(.+)\/status/);
	const [, username] = body.match(
		/<meta\s+property="og:title"\s+content="(.+)\s+on Twitter">/
	);
	const [, picUrl] = body.match(
		/<meta\s+property="og:image"\s+content="(.+):large">/
	);
	const [, text] = body.match(
		/<meta\s+property="og:description"\s+content="“(.+)”">/
	);
	const [, iconUrl] = body.match(
		/<img\s+class="ProfileAvatar-image\s+"\s+src="(.+)"\s+alt=".+">/
	);
	const [, datestr] = body.match(/data-time-ms="(\d+)"/);
	const date = dayjs(datestr).format('HH:mm - YYYY年MM月DD日');

	return (
		<a
			href={url}
			className={css({
				display: 'block',
				width: mediaCardWidth,
				color: 'inherit',
				textDecoration: 'none',
				cursor: 'pointer'
			})}
		>
			<div
				className={css({
					borderRadius: 4,
					border: '1px solid rgb(225, 232, 237)'
				})}
			>
				<div
					className={css({
						padding: 16
					})}
				>
					<div
						className={css({
							paddingBottom: 8
						})}
					>
						<div
							className={css({
								display: 'flex',
								lineHeight: 1.2
							})}
						>
							<img
								src={iconUrl}
								className={css({
									width: 36,
									height: 36,
									borderRadius: '50%',
									marginRight: 8
								})}
							/>
							<div
								className={css({
									display: 'flex',
									flexDirection: 'column'
								})}
							>
								<span
									className={css({
										fontWeight: 'bold'
									})}
								>
									{username}
								</span>
								<span
									className={css({
										color: 'rgb(101, 119, 134)',
										fontSize: '0.9rem'
									})}
								>
									@{sceenname}
								</span>
							</div>
						</div>
					</div>
					<div>
						{renderTextWithNewLines(text.trim(), /&#10;/)}
						<div
							className={css({
								color: 'rgb(105, 120, 130)',
								fontSize: '0.9rem'
							})}
						>
							{date}
						</div>
						<img
							src={picUrl}
							className={css({
								width: '100%',
								display: 'block',
								borderRadius: 12,
								marginTop: 8
							})}
						/>
					</div>
				</div>
			</div>
		</a>
	);
};

/**
 * @param {string} url
 */
export const renderInstgramCard = async (url) => {
	const body = await rp(url);
	const [, jsonstr] = body.match(
		/<script\s+type="text\/javascript">window._sharedData =([\s\S]+);<\/script>\s+<script\s+type="text\/javascript">window\.__initialDataLoaded\(window._sharedData\);<\/script>/
	);
	const json = JSON.parse(jsonstr).entry_data.PostPage[0].graphql
		.shortcode_media;

	return (
		<a
			href={url}
			className={css({
				display: 'block',
				width: mediaCardWidth,
				color: 'inherit',
				textDecoration: 'none',
				cursor: 'pointer'
			})}
		>
			<div
				className={css({
					border: '1px solid rgb(225, 232, 237)'
				})}
			>
				<div
					className={css({
						padding: 8,
						display: 'flex',
						fontSize: '0.9rem'
					})}
				>
					<img
						className={css({
							width: 34,
							height: 34,
							marginRight: 8,
							borderRadius: '50%'
						})}
						src={json.owner.profile_pic_url}
					/>
					<div>
						<div
							className={css({
								fontWeight: 600
							})}
						>
							{json.owner.full_name}
						</div>
						<div className={css({ color: 'rgb(101, 119, 134)' })}>
							@{json.owner.username}
						</div>
					</div>
				</div>
				<img
					className={css({
						display: 'block'
					})}
					src={json.display_url}
				/>
				<div
					className={css({
						padding: 10,
						lineHeight: '18px',
						fontSize: '0.9rem'
					})}
				>
					{renderTextWithNewLines(
						json.edge_media_to_caption.edges[0].node.text,
						'\n'
					)}
				</div>
			</div>
		</a>
	);
};
