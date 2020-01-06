// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';
import { link as linkIcon } from 'react-icons-kit/ionicons/link';

import { BREAKPOINTS } from '@constants';

const slugify = (str = '') =>
  str
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '');

class Heading extends Component<Props> {
  static propTypes = {
    size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    anchorId: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    size: 3,
  };

  node: HTMLElement;

  componentDidMount() {
    // Check and see if the anchor ID is duplicated
    const anchorId = this.getDerivedAnchorId();

    const numOfAnchorsWithThisId = document.querySelectorAll(`#${anchorId}`)
      .length;

    if (numOfAnchorsWithThisId > 1) {
      console.error(
        'Found multiple anchors on the page with this ID:',
        anchorId,
        '\n\n',
        'Please add an explicit unique "anchorId" to this Heading'
      );
    }
  }

  getDerivedAnchorId = () => {
    return this.props.anchorId || slugify(this.props.children);
  };

  render() {
    const { size, children, ...delegated } = this.props;

    const Element = [H1, H2, H3, H4, H5, H6][size - 1];

    // If we don't provide an anchor-id (as is the case with MDX posts),
    // derive it from the children.
    const anchorId = this.getDerivedAnchorId();

    return (
      <Element {...delegated} ref={node => (this.node = node)}>
        <Anchor name={anchorId} id={anchorId} href={`#${anchorId}`}>
          <IconBase size="0.75em" icon={linkIcon} />
        </Anchor>

        {children}
      </Element>
    );
  }
}

const Base = styled.div`
  position: relative;
  font-weight: 700;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  margin-bottom: 8px;
`;

const H1 = styled(Base)`
  font-size: 72px;
  letter-spacing: -2px;
`;

const H2 = styled(Base)`
  font-size: 48px;
  letter-spacing: -0.5px;
  padding-top: 65px;
`;

const H3 = styled(Base)`
  font-size: 40px;
  padding-top: 65px;
`;

const H4 = styled(Base)`
  font-size: 32px;
  padding-top: 30px;
`;

const H5 = styled(Base)`
  font-size: 28px;
`;

const H6 = styled(Base)`
  font-size: 16px;
`;

const Anchor = styled.a`
  display: none;

  @media ${BREAKPOINTS.mdMin} {
    display: block;
    position: absolute;
    left: 0;
    transform: translateX(-125%);
    transition: opacity 250ms;
    opacity: 0;
    margin-top: -80px;
    padding-top: 80px;

    ${Base}:hover &,
    &:focus {
      opacity: 0.75;
    }
  }
`;

export default Heading;
