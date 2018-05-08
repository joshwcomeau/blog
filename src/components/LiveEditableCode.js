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
  };

  render() {
    const { code, scope, size } = this.props;

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
            <Left>
              <LiveEditor />
            </Left>
            <Right>
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
  flex: 2;
`;

const Right = styled.div`
  padding: 32px;
  flex: 1;
  background: #f8f8f8;
`;

export default LiveEditableCode;
