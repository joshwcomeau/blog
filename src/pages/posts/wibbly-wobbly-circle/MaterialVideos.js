import React from 'react';
import styled from 'styled-components';

import FullWidth from '@components/FullWidth';
import Em from '@components/Em';

import mdGasMp4 from './md-gas.mp4';
import mdStretchyMp4 from './md-stretchy.mp4';
import { COLORS } from '../../../constants';

const MaterialVideos = () => {
  return (
    <FullWidth>
      <Wrapper>
        <SmallVideo src={mdGasMp4} />
        <BigVideo src={mdStretchyMp4} />
      </Wrapper>
      <Caption>
        🙅‍♀️These demos are{' '}
        <Em style={{ color: COLORS.pink[500] }}>violations</Em> of the
        "Material" specifications.
      </Caption>
    </FullWidth>
  );
};

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const Video = styled.video.attrs({
  autoPlay: true,
  loop: true,
  muted: true,
})`
  display: block;
  width: 100%;
`;

const SmallVideo = styled(Video)`
  @media (min-width: 600px) {
    width: 33.33333%;
  }
`;
const BigVideo = styled(Video)`
  @media (min-width: 600px) {
    width: 66.66667%;
  }
`;

const Caption = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 50px;
`;

export default MaterialVideos;
