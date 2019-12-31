import React from 'react';
import styled from 'styled-components';

import { COLORS, BREAKPOINTS } from '@constants';
import { humanizeDate } from '@helpers/date.helpers';

import MaxWidthWrapper from '../MaxWidthWrapper';
import Divider from '../Divider';

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
      <Divider style={{ marginBottom: 0, marginTop: 100 }} />
    </MaxWidthWrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 90px;
  text-align: center;

  @media screen and ${BREAKPOINTS.mdMin} {
    padding-top: 180px;
    text-align: left;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.4;
  letter-spacing: -1px;

  @media screen and ${BREAKPOINTS.smMin} {
    font-size: 3rem;
    line-height: 4rem;
  }
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
