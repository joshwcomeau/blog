import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BREAKPOINTS } from '@constants';
import { signUpForNewsletter } from '@helpers/analytics.helpers';

import MagicRainbowButton from '../MagicRainbowButton';
import Spacer from '../Spacer';

class NewsletterSignup extends Component<Props, State> {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  state = {
    submitted: false,
  };

  handleSubmit = () => {
    const { id } = this.props;

    window.open(
      'https://tinyletter.com/joshwcomeau',
      'popupwindow',
      'scrollbars=yes,width=800,height=600'
    );

    this.setState({ submitted: true });

    signUpForNewsletter({ id });
  };

  render() {
    return (
      <Wrapper>
        <Form
          action="https://tinyletter.com/joshwcomeau"
          method="post"
          target="popupwindow"
          onSubmit={this.handleSubmit}
        >
          <EmailInput
            required
            type="email"
            name="email"
            id="tlemail"
            placeholder="name@domain.com"
          />

          <SubmitButton id="newsletter-signup">Subscribe</SubmitButton>
          <input type="hidden" value="1" name="embed" />
        </Form>

        <Spacer size={20} />

        {!this.props.hideDisclaimer && (
          <Disclaimer>
            ✨Roughly 4 issues a year, focusing on content I've published ✨
          </Disclaimer>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  color: inherit;
  margin-bottom: 4rem;
`;

const Disclaimer = styled.div`
  text-align: center;
  font-size: 16px;
`;

const Form = styled.form`
  position: relative;
  max-width: 500px;
  margin: auto;
  display: flex;

  @media ${BREAKPOINTS.sm} {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  width: 400px;
  height: 60px;
  padding: 0 20px;
  font-size: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-right: none;

  @media ${BREAKPOINTS.sm} {
    display: block;
    width: 100%;
  }
`;

const SubmitButton = styled(MagicRainbowButton)`
  width: 150px;
  height: 60px;
  font-size: 1.5rem;

  @media ${BREAKPOINTS.sm} {
    margin-top: 8px;
    width: 100%;
  }
`;

export default NewsletterSignup;
