import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';

import NewsletterSignup from './NewsletterSignup';
import SectionHeading from './SectionHeading';
import Paragraph from './Paragraph';
import FullWidth from './FullWidth';
import MaxWidthWrapper from './MaxWidthWrapper';
import Spacer from './Spacer';

const InterstitialNewsletterSignup = () => (
  <Wrapper>
    <MaxWidthWrapper>
      <SectionHeading color={COLORS.violet[700]}>
        Join the newsletter
      </SectionHeading>

      <Spacer size={20} />

      <Paragraph>
        Finding this blog post worthwhile? Receive early notifications for
        upcoming posts. I'll be writing more about neat animation and
        interaction stuff with React.
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
