import React, { Component } from 'react';
import styled from 'styled-components';

class Quote extends Component {
  render() {
    return <Wrapper>{this.props.children}</Wrapper>;
  }
}

const Wrapper = styled.blockquote`
  font-size: 1.2em;
  font-style: italic;
  color: rgb(100, 100, 100);
  padding: 0 4rem;
`;

export default Quote;
