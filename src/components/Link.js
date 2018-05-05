import React from 'react';
import GatsbyLink from 'gatsby-link';
import styled from 'styled-components';

const Link = ({ external, href, target, ...delegated }) => {
  const hrefProp = external ? { href } : { to: href };
  const rel = target === '_blank' ? 'noopener noreferrer' : delegated.rel;

  console.log(external, href, target, delegated);

  // prettier-ignore
  return external
    ? <a href={href} target={target} rel={rel} {...delegated} />
    : <GatsbyLink to={href} target={target} rel={rel} {...delegated} />;
};

export default Link;
