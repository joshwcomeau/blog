import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';

import FullWidth from './FullWidth';
import MaxWidthWrapper from './MaxWidthWrapper';

class LiveEditableCode extends PureComponent {
  static propTypes = {
    code: PropTypes.string.isRequired,
    scope: PropTypes.object,
    size: PropTypes.oneOf(['normal', 'extra-wide']),
    split: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    split: [66, 34],
  };

  render() {
    const { code, scope, size, split } = this.props;

    const [leftSplit, rightSplit] = split;

    const maxWidth = size === 'extra-wide' ? '1058px' : undefined;

    return (
      <LiveProvider
        code={code}
        scope={scope}
        noInline={true}
        mountStylesheet={false}
      >
        <FullWidth>
          <Wrapper maxWidth={maxWidth}>
            <Left split={leftSplit}>
              <LiveEditor />
            </Left>
            <Right split={rightSplit}>
              <LiveError />
              <LivePreview />
            </Right>
          </Wrapper>
        </FullWidth>
      </LiveProvider>
    );
  }
}

const Wrapper = styled(MaxWidthWrapper)`
  display: flex;
  margin-top: 48px;
  margin-bottom: 72px;
`;

const Left = styled.div`
  flex: ${props => props.split};
`;

const Right = styled.div`
  padding: 32px;
  flex: ${props => props.split};
  background: #f8f8f8;
`;

export default LiveEditableCode;
