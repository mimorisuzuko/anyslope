import React, { PureComponent } from 'react';
import { css } from 'emotion';
import { sidebarItemMarginStyle } from '../styles';

export default class DateSeparator extends PureComponent {
    render = () => {
        const {
            props: { date }
        } = this;

        return (
            <div
                className={css(sidebarItemMarginStyle, {
                    borderBottom: '1px solid white'
                })}
            >
                {date.format('YYYY/MM/DD')}
            </div>
        );
    };
}
