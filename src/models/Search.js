import { Record } from 'immutable';
import queryParser from 'search-query-parser';
import _ from 'lodash';

export default class Search extends Record({
    visible: false,
    query: '',
    parsedQuery: {}
}) {
    static get KEYWORDS() {
        return ['author', 'title', 'content', 'html'];
    }

    updateParsedQuery(query) {
        const parsed = queryParser.parse(query, {
            keywords: Search.KEYWORDS
        });
        let parsedQuery = {};

        if (typeof parsed === 'string') {
            parsedQuery = {
                author: [],
                title: [],
                content: [],
                text: [parsed]
            };
        } else {
            _.forEach(_.concat('text', Search.KEYWORDS), (k) => {
                if (_.has(parsed, k)) {
                    const v = parsed[k];

                    parsedQuery[k] = typeof v === 'string' ? [v] : v;
                } else {
                    parsedQuery[k] = [];
                }
            });
        }

        return this.set('parsedQuery', parsedQuery);
    }

    searched() {
        const { parsedQuery, query } = this;

        return !_.isEmpty(parsedQuery) && query;
    }

    test(article) {
        const { parsedQuery } = this;

        if (!this.searched()) {
            return true;
        }

        return _.some(Search.KEYWORDS, (k0) => {
            const v0 = article.get(k0);

            return _.some([k0, 'text'], (k1) => {
                return _.some(parsedQuery[k1], (v1) => v0.indexOf(v1) >= 0);
            });
        });
    }
}
