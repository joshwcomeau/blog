import React from 'react';

import { COLORS } from '../../constants';
import Mountains from '../Mountains';

import BaseHero from './BaseHero';

const WatermelonGradientHero = ({ title, publishedOn }) => (
  <BaseHero
    title={title}
    publishedOn={publishedOn}
    background="linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)"
    titleGradientSteps={['80deg', COLORS.pink[500], COLORS.purple[700]]}
    authorColor={COLORS.pink[500]}
    publishedOnColor={COLORS.purple[500]}
    curveColors={[COLORS.white, COLORS.green[700], COLORS.green[500]]}
    mountains={<Mountains />}
  />
);

export default WatermelonGradientHero;
