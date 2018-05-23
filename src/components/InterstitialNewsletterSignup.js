import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';

import NewsletterSignup from './NewsletterSignup';
import SectionHeading from './SectionHeading';
import Paragraph from './Paragraph';
import FullWidth from './FullWidth';
import MaxWidthWrapper from './MaxWidthWrapper';
import Spacer from './Spacer';

const DEFAULT_COPY = `
Finding this post helpful? You should sign up for the newsletter!
Subscribers are the first to know about new posts. I may even share some
special additional content 😮`

const InterstitialNewsletterSignup = ({ copy = DEFAULT_COPY }) => (
  <Wrapper>
    <MaxWidthWrapper>
      <SectionHeading color={COLORS.violet[700]}>
        Join the newsletter
      </SectionHeading>

      <Spacer size={20} />

      <Paragraph>
        {copy}
      </Paragraph>

      <NewsletterSignup id="interstitial" />
    </MaxWidthWrapper>
  </Wrapper>
);

const Wrapper = styled(FullWidth)`
  background: ${COLORS.gray[50]};
  padding: 48px 0;
`;

export default InterstitialNewsletterSignup;
