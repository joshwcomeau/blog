import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor } from 'react-live';
import styled from 'styled-components';

import { BREAKPOINTS } from '@constants';
import { syntaxTheme } from '@helpers/syntax-highlighting.helpers';

import FullWidth from '../FullWidth';
import MaxWidthWrapper from '../MaxWidthWrapper';

class Code extends PureComponent {
  static propTypes = {
    code: PropTypes.string,
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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

    if (!this.state.hasBeenMounted) {
      return null;
    }

    return (
      <LiveProvider
        code={children.trim()}
        noInline={true}
        mountStylesheet={false}
        theme={syntaxTheme}
      >
        <FullWidth>
          <Wrapper>
            <EditorWrapper maxHeight={maxHeight}>
              <LiveEditor language={lang} />
            </EditorWrapper>
          </Wrapper>
        </FullWidth>
      </LiveProvider>
    );
  }
}

const Wrapper = styled(MaxWidthWrapper)`
  display: flex;
  margin-top: 32px;
  margin-bottom: 48px;

  @media ${BREAKPOINTS.md} {
    flex-direction: column;
    padding-left: 0;
    padding-right: 0;
  }
`;

const EditorWrapper = styled.div`
  flex: 1;
  padding: 16px;
  background: #f8f8f8;
  max-height: ${props =>
    typeof props.maxHeight === 'undefined'
      ? undefined
      : typeof props.maxHeight === 'number'
      ? `${props.maxHeight}px`
      : props.maxHeight};
  overflow: auto;
`;

export default Code;
