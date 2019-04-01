import TurndownService from 'turndown';
import marked from 'marked';
import React from 'react';
import rp from 'request-promise';
import fecha from 'fecha';
import { css } from 'emotion';
import _ from 'lodash';

const turndownService = new TurndownService();

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

	$parent.scroll({ top: $article.offsetTop - $parent.offsetTop });
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
	const date = fecha.format(
		new Date(parseInt(datestr)),
		'HH:mm - YY年MM月DD日'
	);
	const tmplines = _.split(text.trim(), /&#10;/);
	const lines = [tmplines.unshift()];

	_.forEach(tmplines, (line, i) => {
		lines.push(line, <br key={i} />);
	});

	return (
		<a
			href={url}
			className={css({
				color: 'inherit',
				textDecoration: 'none',
				cursor: 'pointer'
			})}
		>
			<div
				className={css({
					maxWidth: 500,
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
						{lines}
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
