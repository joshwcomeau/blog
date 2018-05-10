import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';

import FullWidth from './FullWidth';
import MaxWidthWrapper from './MaxWidthWrapper';
import { BREAKPOINTS } from '../constants';

class LiveEditableCode extends PureComponent {
  static propTypes = {
    code: PropTypes.string.isRequired,
    scope: PropTypes.object,
    size: PropTypes.oneOf(['normal', 'extra-wide']),
    split: PropTypes.arrayOf(PropTypes.number),
    maxHeight: PropTypes.number,
  };

  static defaultProps = {
    split: [66, 34],
  };

  render() {
    const { code, scope, size, split, maxHeight } = this.props;

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
            <EditorWrapper split={leftSplit} maxHeight={maxHeight}>
              <LiveEditor />
            </EditorWrapper>
            <PreviewWrapper split={rightSplit}>
              <LiveError />
              <LivePreview />
            </PreviewWrapper>
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

  @media ${BREAKPOINTS.md} {
    flex-direction: column;
  }
`;

const EditorWrapper = styled.div`
  padding: 32px;
  flex: ${props => props.split};
  background: #f8f8f8;
  max-height: ${props => props.maxHeight}px;
  overflow: auto;
`;

const PreviewWrapper = styled.div`
  padding: 32px;
  flex: ${props => props.split};
  background: #f8f8f8;

  @media ${BREAKPOINTS.md} {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media ${BREAKPOINTS.mdMin} {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export default LiveEditableCode;
