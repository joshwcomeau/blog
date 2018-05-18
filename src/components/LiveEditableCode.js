import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';

import { BREAKPOINTS, EXTRA_WIDE_WIDTH } from '../constants';
import { interactWithCodeSample } from '../helpers/analytics.helpers';

import FullWidth from './FullWidth';
import MaxWidthWrapper from './MaxWidthWrapper';

class LiveEditableCode extends PureComponent {
  static propTypes = {
    // `id` needed for analytics
    id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    scope: PropTypes.object,
    size: PropTypes.oneOf(['normal', 'extra-wide']),
    split: PropTypes.arrayOf(PropTypes.number),
    maxHeight: PropTypes.number,
  };

  static defaultProps = {
    split: [66, 34],
  };

  trackChange = () => {
    // I'm not interested in how many tweaks the user makes,
    // I just wanna know if they interact with it at all.
    // So, stop recording after the first interaction.
    // (this is also to get around GA's throttling if you
    // fire too many events)
    if (!this.hasBeenTracked) {
      interactWithCodeSample({
        component: 'LiveEditableCode',
        label: this.props.id,
      });

      console.log('ys');

      this.hasBeenTracked = true;
    }
  };

  render() {
    const { code, scope, size, split, maxHeight } = this.props;

    const [leftSplit, rightSplit] = split;

    const maxWidth =
      size === 'extra-wide' ? `${EXTRA_WIDE_WIDTH}px` : undefined;

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
              <LiveEditor onChange={this.trackChange} />
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
  margin-top: 2rem;
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
