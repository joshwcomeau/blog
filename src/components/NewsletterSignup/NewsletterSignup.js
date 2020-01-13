import React from 'react';
import styled from 'styled-components';

import { BREAKPOINTS } from '@constants';
import { signUpForNewsletter } from '@helpers/analytics.helpers';

import MagicRainbowButton from '../MagicRainbowButton';
import RenderWhenOnscreen from '../RenderWhenOnscreen';
import Spacer from '../Spacer';

const NewsletterSignup = ({ id, hideDisclaimer }) => {
  const handleSubmit = () => {
    window.open(
      'https://tinyletter.com/joshwcomeau',
      'popupwindow',
      'scrollbars=yes,width=800,height=600'
    );

    signUpForNewsletter({ id });
  };

  return (
    <Wrapper>
      <RenderWhenOnscreen height={hideDisclaimer ? 128 : 150}>
        <Form
          action="https://tinyletter.com/joshwcomeau"
          method="post"
          target="popupwindow"
          onSubmit={handleSubmit}
        >
          <EmailInput
            required
            type="email"
            name="email"
            placeholder="name@domain.com"
            aria-label="Email address"
          />

          <SubmitButton id={`#newsletter-signup-${id}`}>Subscribe</SubmitButton>
          <input type="hidden" value="1" name="embed" />
        </Form>

        <Spacer size={20} />

        {!hideDisclaimer && (
          <Disclaimer>
            <span role="img" aria-label="sparkles">
              ✨
            </span>{' '}
            Roughly 4 issues a year, focusing on content I've published{' '}
            <span role="img" aria-label="sparkles">
              ✨
            </span>
          </Disclaimer>
        )}
      </RenderWhenOnscreen>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: inherit;
  margin-bottom: 4rem;
  perspective: 500px;
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
  border-radius: 5px;

  @media ${BREAKPOINTS.sm} {
    display: block;
    width: 100%;
  }
`;

export const SubmitButton = styled(MagicRainbowButton)`
  width: 150px;
  height: 60px;
  font-size: 21px;
  border-radius: 5px;
  margin-left: 16px;

  @media ${BREAKPOINTS.sm} {
    margin-top: 16px;
    margin-left: 0;
    width: 100%;
  }
`;

export default NewsletterSignup;
