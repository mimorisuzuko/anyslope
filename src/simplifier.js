import _ from 'lodash';

class HTMLSimplifier {
	/**
	 * @param {Element} $html
	 * @returns {string}
	 */
	simplify($html) {
		_.forEach($html.querySelectorAll('img'), ($img) => {
			this._replace($img, this._img2text($img));
		});

		_.forEach($html.querySelectorAll('a'), ($a) => {
			this._replace($a, this._simplifyA($a));
		});

		for (;;) {
			const $div = $html.querySelectorAll('div:not(.searched)')[0];

			if ($div) {
				this._replace($div, this._simplifyDiv($div));
			} else {
				break;
			}
		}

		_.forEach($html.querySelectorAll('div'), ({ previousSibling }) => {
			if (previousSibling && previousSibling.nodeName === 'DIV') {
				previousSibling.appendChild(new Text('\n'));
			}
		});

		return $html.innerText;
	}

	trim(s) {
		const nls = ['<br>', '\n', ' ', '<div><br></div>'];

		for (;;) {
			if (
				!_.some(nls, (nl) => {
					if (s.indexOf(nl) === 0) {
						s = s.slice(nl.length);
						return true;
					} else {
						return false;
					}
				})
			) {
				break;
			}
		}

		for (;;) {
			if (
				!_.some(nls, (nl) => {
					if (s.lastIndexOf(nl) === s.length - nl.length) {
						s = s.slice(0, -nl.length);
						return true;
					} else {
						return false;
					}
				})
			) {
				break;
			}
		}

		return s;
	}

	/**
	 * @param {Element} $e
	 */
	_replace($e, $new) {
		const { parentElement } = $e;

		parentElement.replaceChild($new, $e);
	}

	/**
	 * @param {HTMLElement} $fragment
	 */
	_isNewLines($fragment) {
		const { childNodes } = $fragment;
		const selfClosedTags = ['IMG'];

		return _.every(childNodes, ($e) => {
			const { nodeName } = $e;

			if (_.includes(selfClosedTags, nodeName)) {
				return false;
			} else if (nodeName === 'BR') {
				return true;
			} else if (nodeName === '#text') {
				const { nodeValue } = $e;

				return nodeValue === '<br>';
			}

			return this._isNewLines($e);
		});
	}

	/**
	 * @param {HTMLImageElement} $img
	 */
	_img2text($img) {
		const { src } = $img;

		return new Text(`<img src="${src}">`);
	}

	/**
	 * @param {HTMLAnchorElement} $a
	 */
	_simplifyA($a) {
		const { childNodes, href } = $a;
		const $fragment = this._processChildNodes(childNodes);

		if (this._isNewLines($fragment)) {
			return $fragment;
		}

		const $ret = document.createDocumentFragment();

		$ret.appendChild(new Text(`<a href="${href}">`));
		$ret.appendChild($fragment);
		$ret.appendChild(new Text('</a>'));

		return $ret;
	}

	/**
	 * @param {HTMLDivElement} $div
	 */
	_simplifyDiv($div) {
		const { childNodes } = $div;
		const $fragment = this._processChildNodes(childNodes);

		if (this._isNewLines($fragment)) {
			const $ret = document.createDocumentFragment();

			$ret.appendChild(new Text('<div>'));
			$ret.appendChild($fragment);
			$ret.appendChild(new Text('</div>'));

			return $ret;
		}

		if ($div.hasAttribute('style')) {
			const $ret = document.createDocumentFragment();

			$ret.appendChild(
				new Text(`<div style="${$div.getAttribute('style')}">`)
			);
			$ret.appendChild($fragment);
			$ret.appendChild(new Text('</div>'));

			return $ret;
		}

		const $ret = document.createElement('div');
		$ret.classList.add('searched');
		$ret.appendChild($fragment);

		return $ret;
	}

	/**
	 * @param {HTMLDivElement} $span
	 */
	_simplifySpan($span) {
		const { childNodes } = $span;
		const $fragment = this._processChildNodes(childNodes);

		if (this._isNewLines($fragment)) {
			return $fragment;
		}

		if ($span.hasAttribute('style')) {
			const $ret = document.createDocumentFragment();

			$ret.appendChild(
				new Text(`<span style="${$span.getAttribute('style')}">`)
			);
			$ret.appendChild($fragment);
			$ret.appendChild(new Text('</span>'));

			return $ret;
		}

		return $fragment;
	}

	/**
	 * @param {HTMLElement} $b
	 */
	_simplifyB($b) {
		const { childNodes } = $b;
		const $fragment = this._processChildNodes(childNodes);

		if (this._isNewLines($fragment)) {
			return $fragment;
		}

		const $ret = document.createDocumentFragment();

		if ($b.hasAttribute('style')) {
			$ret.appendChild(
				new Text(`<b style="${$b.getAttribute('style')}">`)
			);
		} else {
			$ret.appendChild(new Text('<b>'));
		}

		$ret.appendChild($fragment);
		$ret.appendChild(new Text('</b>'));

		return $ret;
	}

	/**
	 * @param {HTMLParagraphElement} $p
	 */
	_simplifyP($p) {
		const { childNodes } = $p;
		const $fragment = this._processChildNodes(childNodes);

		if (this._isNewLines($fragment)) {
			return $fragment;
		}

		const $ret = document.createDocumentFragment();

		if ($p.hasAttribute('style')) {
			$ret.appendChild(
				new Text(`<p style="${$p.getAttribute('style')}">`)
			);
		} else {
			$ret.appendChild(new Text('<p>'));
		}

		$ret.appendChild($fragment);
		$ret.appendChild(new Text('</p>'));

		return $ret;
	}

	/**
	 * @param {HTMLElement} $i
	 */
	_simplifyI($i) {
		const { childNodes } = $i;
		const $fragment = this._processChildNodes(childNodes);

		if (this._isNewLines($fragment)) {
			return $fragment;
		}

		const $ret = document.createDocumentFragment();

		if ($i.hasAttribute('style')) {
			$ret.appendChild(
				new Text(`<i style="${$i.getAttribute('style')}">`)
			);
		} else {
			$ret.appendChild(new Text('<i>'));
		}

		$ret.appendChild($fragment);
		$ret.appendChild(new Text('</i>'));

		return $ret;
	}

	/**
	 * @param {HTMLElement} $font
	 */
	_simplifyFont($font) {
		const { childNodes } = $font;
		const $fragment = this._processChildNodes(childNodes);

		if (this._isNewLines($fragment)) {
			return $fragment;
		}

		const $ret = document.createDocumentFragment();
		let style = '';

		if ($font.hasAttribute('face')) {
			style += `font-family: "${$font.getAttribute('face')}";`;
		}

		$ret.appendChild(
			new Text(`<span ${style ? ` style="${style}"` : ''}>`)
		);
		$ret.appendChild($fragment);
		$ret.appendChild(new Text('</span>'));

		return $ret;
	}

	_processChildNodes($nodes) {
		const $fragment = document.createDocumentFragment();

		_.forEach($nodes, ($node) => {
			const { nodeName } = $node;

			if (nodeName === '#text') {
				const { nodeValue } = $node;

				$fragment.appendChild(
					new Text(
						nodeValue === '\u00A0' || nodeValue === '　'
							? '<br>'
							: nodeValue
					)
				);
			} else if (nodeName === 'IMG') {
				$fragment.appendChild(this._img2text($node));
			} else if (nodeName === 'A') {
				$fragment.appendChild(this._simplifyA($node));
			} else if (nodeName === 'BR') {
				$fragment.appendChild(new Text('<br>'));
			} else if (nodeName === 'DIV') {
				$fragment.appendChild(this._simplifyDiv($node));
			} else if (nodeName === 'SPAN') {
				$fragment.appendChild(this._simplifySpan($node));
			} else if (nodeName === 'B' || nodeName === 'STRONG') {
				$fragment.appendChild(this._simplifyB($node));
			} else if (nodeName === 'P') {
				$fragment.appendChild(this._simplifyP($node));
			} else if (nodeName === 'I') {
				$fragment.appendChild(this._simplifyI($node));
			} else if (nodeName === 'FONT') {
				$fragment.appendChild(this._simplifyFont($node));
			}
		});

		return $fragment;
	}
}

export default new HTMLSimplifier();
