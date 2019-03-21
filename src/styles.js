import { css } from 'emotion';

const sidebarWidth = 220;

export const shadowBaseStyle = css({
	boxShadow:
		'0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)'
});

export const titlebarBaseStyle = css({
	height: 22,
	WebkitAppRegion: 'drag'
});

export const sidebarBaseStyle = css({
	width: sidebarWidth,
	height: '100%',
	boxSizing: 'border-box'
});

export const bodyBaseStyle = css({
	width: `calc(100% - ${sidebarWidth}px)`,
	height: '100%'
});
