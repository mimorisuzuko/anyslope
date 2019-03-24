import TurndownService from 'turndown';
import marked from 'marked';
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
