import { createGlobalStyle } from 'styled-components';

import { COLORS } from '../../constants';

const PrismStyles = createGlobalStyle`
/**
 * Josh Blog theme for Javascript, CSS, and HTML.
 * Derived from the a11y-dark theme, by ericwbailey
 */


.prism-code {
  display: block;
	color: ${COLORS.gray[800]};
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;

	-moz-tab-size: 2;
	-o-tab-size: 2;
	tab-size: 2;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
  hyphens: none;

  font-family: 'Fira Mono', monospace !important;
  font-size: 16px;
  letter-spacing: -0.5px;
  outline: none;
	margin: 0;
	overflow: auto;
	border-radius: 0;

  &::selection {
    color: ${COLORS.white};
    background-color: ${COLORS.gray[900]};
  }
}

.token::selection {
  color: ${COLORS.white};
  background-color: ${COLORS.gray[900]};
}

/* Inline code */
:not(pre) > code[class*="language-"] {
	padding: 0.1em;
	border-radius: 0.3em;
	white-space: normal;
}

.token {
  font-weight: 500;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: #B0BEC5;
  /* font-style: italic; */
}

.token.punctuation {
	color: ${COLORS.gray[700]};
}

.token.property,
.token.tag,
.token.constant,
.token.symbol,
.token.deleted {
	color: ${COLORS.pink[500]};
}

.token.attr-name, .token.tag {
  font-weight: 700;
}

.token.boolean,
.token.number {
	color: ${COLORS.orange[500]};
}

.token.string, .token.attr-value {
  color: #78909C;
}

.token.selector,
.token.attr-name,
.token.char,
.token.builtin,
.token.inserted,
.token.script-punctuation {
	color: ${COLORS.violet[700]};
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string,
.token.variable,
.token.keyword {
	color: ${COLORS.purple[500]};
}

.token.atrule,
.token.function {
	color: ${COLORS.blue[500]};
}


.token.regex,
.token.important {
	color: #ffd700;
}

.token.important,
.token.bold {
	font-weight: bold;
}
.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}

@media screen and (-ms-high-contrast: active) {

	.prism-code {
		color: windowText;
		background: window;
	}


	.prism-code {
		background: window;
	}

	.token.important {
		background: highlight;
		color: window;
		font-weight: normal;
	}

	.token.atrule,
	.token.attr-value,
	.token.function,
	.token.keyword,
	.token.operator,
	.token.selector {
		font-weight: bold;
	}

	.token.attr-value,
	.token.comment,
	.token.doctype,
	.token.function,
	.token.keyword,
	.token.operator,
	.token.property,
	.token.string {
		color: highlight;
	}

	.token.attr-value,
	.token.url {
		font-weight: normal;
	}
}`;

export default PrismStyles;
