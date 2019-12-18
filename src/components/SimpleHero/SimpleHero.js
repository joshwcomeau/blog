import React from 'react';
import styled from 'styled-components';

import { COLORS, Z_INDICES, BREAKPOINTS } from '@constants';
import { humanizeDate } from '@helpers/date.helpers';

import MaxWidthWrapper from '../MaxWidthWrapper';

const SimpleHero = ({ title, isPublished, publishedOn }) => {
  return (
    <MaxWidthWrapper>
      <Wrapper>
        <Title>{title}</Title>

        <Byline>
          <Unemphasized>Written by</Unemphasized>{' '}
          <EmphasizedPrimary>Josh Comeau</EmphasizedPrimary>
          {isPublished ? (
            <>
              {' '}
              <Unemphasized>on</Unemphasized>{' '}
              <EmphasizedSecondary>
                {humanizeDate(publishedOn)}
              </EmphasizedSecondary>
            </>
          ) : (
            <>
              <Unemphasized>.</Unemphasized>{' '}
              <EmphasizedSecondary>(Draft)</EmphasizedSecondary>
            </>
          )}
        </Byline>
      </Wrapper>
    </MaxWidthWrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 180px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  line-height: 4rem;
  letter-spacing: -1px;
`;

const Byline = styled.h3`
  font-size: 1.2rem;
  font-weight: 300;
  color: ${COLORS.gray[600]};
  margin: 0.5rem 0 0 0.25rem;
`;

const Unemphasized = styled.span`
  opacity: 0.85;
`;

const EmphasizedPrimary = styled.span`
  font-weight: bold;
  color: ${COLORS.pink[500]};
`;

const EmphasizedSecondary = styled.span`
  font-weight: bold;
  color: ${COLORS.violet[500]};
`;

export default SimpleHero;
