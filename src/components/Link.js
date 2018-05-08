import React from 'react';
import GatsbyLink from 'gatsby-link';
import styled from 'styled-components';

import { COLORS } from '../constants';

const Link = ({ external, href, target, rel, ...delegated }) => {
  const LinkComponent = external ? ExternalLink : InternalLink;

  const safeRel = target === '_blank' ? 'noopener noreferrer' : rel;

  return <LinkComponent href={href} rel={safeRel} {...delegated} />;
};

const ExternalLink = styled.a`
  color: ${props =>
    props.theme === 'light' ? COLORS.white : COLORS.pink[500]};
`;

const InternalLink = ExternalLink.withComponent(GatsbyLink).extend.attrs({
  to: props => props.href,
})``;

export default Link;
