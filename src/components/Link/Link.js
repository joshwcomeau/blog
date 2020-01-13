import React from 'react';
import GatsbyLink from 'gatsby-link';
import styled from 'styled-components';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import { COLORS } from '@constants';

const Link = ({ href, target, rel, ...delegated }) => {
  // Links are external if they start with `http` or `https`
  const external = href.match(/(^http|^mailto)/i);

  // By default, external links should open in a new tab.
  // This is overrideable though.
  if (typeof target === 'undefined') {
    target = external ? '_blank' : '_self';
  }

  const LinkComponent = external ? ExternalLink : InternalLink;

  const safeRel = target === '_blank' ? 'noopener noreferrer' : rel;

  return (
    <LinkComponent
      as={external ? 'a' : GatsbyLink}
      href={href}
      rel={safeRel}
      target={target}
      {...delegated}
    />
  );
};

const ExternalLink = styled(OutboundLink)`
  color: ${props =>
    props.theme === 'light' ? COLORS.white : COLORS.pink[500]};
`;

const InternalLink = styled(ExternalLink).attrs(props => ({
  to: props.href,
}))``;

export default Link;
