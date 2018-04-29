// @flow

export const COLORS = {
  pink: {
    '500': '#f40088',
    '700': '#cc0072',
  },
  red: {
    '500': '#EF5350',
    '700': '#D50000',
  },
  orange: {
    '500': '#FF9100',
    '700': '#FF6D00',
  },
  yellow: {
    '500': '#FFC400',
    '700': '#FFAB00',
  },
  lime: {
    '500': '#C6FF00',
    '700': '#AEEA00',
  },
  green: {
    '500': '#00E676',
    '700': '#00C853',
  },
  blue: {
    '500': '#3D5AFE',
    '700': '#304FFE',
  },
  purple: {
    '500': '#6139f5',
    '700': '#4520cc',
  },
  gray: {
    '100': '#f2f2f2',
    '200': '#eaeaea',
    '300': '#cccccc',
    '400': '#aaaaaa',
    '500': '#888888',
    '700': '#444',
    '800': '#2A2A2A',
    '900': '#111',
  },
};

export const BREAKPOINT_SIZES = {
  xs: 320,
  sm: 540,
  md: 900,
  lg: 1100,
  xl: 1440,
};

export const BREAKPOINTS = {
  xs: `(max-width: ${BREAKPOINT_SIZES.xs}px)`,
  sm: `(max-width: ${BREAKPOINT_SIZES.sm}px)`,
  md: `(max-width: ${BREAKPOINT_SIZES.md}px)`,
  lg: `(max-width: ${BREAKPOINT_SIZES.lg}px)`,
  xl: `(max-width: ${BREAKPOINT_SIZES.xl}px)`,
  xsMin: `(min-width: ${BREAKPOINT_SIZES.xs}px)`,
  smMin: `(min-width: ${BREAKPOINT_SIZES.sm}px)`,
  mdMin: `(min-width: ${BREAKPOINT_SIZES.md}px)`,
  lgMin: `(min-width: ${BREAKPOINT_SIZES.lg}px)`,
  xlMin: `(min-width: ${BREAKPOINT_SIZES.xl}px)`,
  desktop: `(min-width: ${BREAKPOINT_SIZES.sm + 1}px)`,
};

export const MAX_WIDTH = {
  sm: '100%',
  md: '900px',
  base: '950px',
};

const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i;
export const IS_MOBILE_USER_AGENT = mobileRegex.test(navigator.userAgent);
