// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';
import { link as linkIcon } from 'react-icons-kit/ionicons/link';

import { BREAKPOINTS } from '@constants';

class Heading extends Component<Props> {
  static propTypes = {
    size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    anchorId: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    size: 3,
  };

  render() {
    const { size, anchorId, children, ...delegated } = this.props;

    const Element = [H1, H2, H3, H4, H5, H6][size - 1];

    return (
      <Element {...delegated}>
        {anchorId && (
          <Anchor id={anchorId} href={`#${anchorId}`}>
            <IconBase size="0.75em" icon={linkIcon} />
          </Anchor>
        )}

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
  margin-top: 65px;
`;

const H3 = styled(Base)`
  font-size: 36px;
  margin-top: 65px;
`;

const H4 = styled(Base)`
  font-size: 28px;
  margin-top: 30px;
`;

const H5 = styled(Base)`
  font-size: 22px;
`;

const H6 = styled(Base)`
  font-size: 16px;
`;

const Anchor = styled.a`
  display: block;
  position: absolute;
  left: 0;
  transform: translate(-125%, 7%);
  opacity: 0;
  transition: opacity 250ms;

  @media ${BREAKPOINTS.mdMin} {
    ${Base}:hover & {
      opacity: 0.75;
    }
  }
`;

export default Heading;
