import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';

import { COLORS, BREAKPOINTS, EXTRA_WIDE_WIDTH } from '@constants';
import { interactWithCodeSample } from '@helpers/analytics.helpers';

import FullWidth from '../FullWidth';
import MaxWidthWrapper from '../MaxWidthWrapper';
import TextLink from '../TextLink';

class Code extends PureComponent {
  static propTypes = {
    code: PropTypes.string,
    maxHeight: PropTypes.number,
  };

  state = {
    hasBeenMounted: false,
  };

  componentDidMount() {
    // HACK - There's an issue with React-Live and SSR.
    // To avoid dealing with this issue for now, I'm just not rendering things
    // on the initial pass.
    this.setState({ hasBeenMounted: true });
  }

  render() {
    const { children, maxHeight, lang } = this.props;

    console.log({ lang });

    if (!this.state.hasBeenMounted) {
      return null;
    }

    return (
      <LiveProvider
        code={children}
        language={lang}
        noInline={true}
        mountStylesheet={false}
      >
        <FullWidth>
          <Wrapper>
            <EditorWrapper maxHeight={maxHeight}>
              <LiveEditor />
            </EditorWrapper>
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
  flex: 1;
  padding: 32px;
  background: #f8f8f8;
  max-height: ${props =>
    props.maxHeight ? `${props.maxHeight}px` : undefined};
  overflow: auto;
`;

export default Code;
