import _ from 'lodash';
import matchAll from 'string.prototype.matchall';
import is from '@sindresorhus/is';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const serializer = new XMLSerializer();
const domparser = new DOMParser();

class HTMLSimplifier {
    /**
     * @param {Element} $html
     * @returns {string}
     */
    simplify($html) {
        _.forEach($html.querySelectorAll('img'), ($img) => {
            const { parentElement: $parent } = $img;
            const { tagName } = $parent;

            if ($img.src === document.location.href) {
                // If $img.src is blank, remove it
                $img.remove();
            } else {
                // If parent is <A />, remove it
                this._replace(
                    tagName === 'A' ? $parent : $img,
                    this._img2text($img)
                );
            }
        });

        _.forEach($html.querySelectorAll('a'), ($a) => {
            this._replace($a, this._simplifyA($a));
        });

        $html = this._simplifyDiv($html);

        // Remove blank texts
        _.forEach(this._textWalker($html), (a) => {
            if (!a.nodeValue) {
                a.remove();
            }
        });

        // Convert `<div>Text 0</div><div>Text 1</div>` to `Text 0\nText 1`
        _.forEach($html.querySelectorAll('div'), ({ previousSibling }) => {
            if (previousSibling && previousSibling.nodeName === 'DIV') {
                previousSibling.appendChild(new Text('\n'));
            }
        });

        // Convert `<div>Text 0</div>Text 1` to Text 0\nText 1
        _.forEach(this._textWalker($html), ({ previousSibling, nodeValue }) => {
            if (
                nodeValue &&
                previousSibling &&
                previousSibling.nodeName === 'DIV'
            ) {
                previousSibling.appendChild(new Text('\n'));
            }
        });

        return $html.innerText;
    }

    /**
     * @param {string} s
     */
    trim(s) {
        const nls = [/<br>/g, /\n/g, / /g, /<div>(<br>)+<\/div>/g];

        for (;;) {
            if (
                !_.some(nls, (nl) =>
                    _.some([...matchAll(s, nl)], (matched) => {
                        if (matched.index === 0) {
                            s = s.slice(matched[0].length);

                            return true;
                        } else if (
                            matched.index + matched[0].length ===
                            s.length
                        ) {
                            s = s.slice(0, -matched[0].length);

                            return true;
                        }

                        return false;
                    })
                )
            ) {
                break;
            }
        }

        return s;
    }

    _isHtmlString = (s) => {
        const { innerHTML } = domparser
            .parseFromString(s, 'text/html')
            .querySelector('body');

        return innerHTML;
    };

    /**
     * @param {Element} $e
     */
    _replace($e, $new) {
        const { parentElement } = $e;

        parentElement.replaceChild($new, $e);
    }

    /**
     * @param {Node} $node
     * @returns {Text[]}
     */
    _textWalker($node) {
        const s = [];

        if ($node.nodeName === '#text') {
            s.push($node);
        } else {
            _.forEach($node.childNodes, (a) => s.push(...this._textWalker(a)));
        }

        return s;
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
        const $fragment = this._processChildNodes(childNodes, false);

        if (this._isNewLines($fragment)) {
            return $fragment;
        }

        const $ret = document.createDocumentFragment();

        $ret.appendChild(
            new Text(
                `<a href="${href}">${serializer.serializeToString(
                    $fragment
                )}</a>`
            )
        );

        return $ret;
    }

    /**
     * @param {HTMLDivElement} $div
     */
    _simplifyDiv($div) {
        const { childNodes } = $div;
        const $fragment = this._processChildNodes(childNodes);

        if (!$fragment.hasChildNodes()) {
            return $fragment;
        }

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

    _processChildNodes($nodes, canValidateUrl = true) {
        const $fragment = document.createDocumentFragment();

        _.forEach($nodes, ($node) => {
            const { nodeName } = $node;

            if (nodeName === '#text') {
                let { nodeValue } = $node;

                if (nodeValue === '\u00A0' || nodeValue === '　') {
                    $fragment.appendChild(new Text('<br>'));
                } else {
                    nodeValue = nodeValue.trim();

                    $fragment.appendChild(
                        new Text(
                            canValidateUrl &&
                            is.urlString(nodeValue) &&
                            /^http(s)?:\/\//.test(nodeValue)
                                ? renderToStaticMarkup(
                                      <a href={nodeValue}>{nodeValue}</a>
                                  )
                                : this._isHtmlString(nodeValue)
                                ? nodeValue
                                : nodeValue
                                      .replace(/</g, '&lt;')
                                      .replace(/>/g, '&gt;')
                        )
                    );
                }
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
