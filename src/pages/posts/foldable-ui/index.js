import React from 'react';

import { COLORS } from '../../../constants';
import BlogPostTemplate from '../../../templates/BlogPost';

import StarryBgSrc from './yong-chuan-645079-unsplash.jpg';

const FRONT_MATTER = {
  title: 'Foldable Interfaces',
  publishedOn: '2018-04-29',
  headerImage: StarryBgSrc,
  headerBackground: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
  headerTitleGradientSteps: ['80deg', COLORS.pink[500], COLORS.purple[700]],
};

export default () => (
  <BlogPostTemplate {...FRONT_MATTER}>I'm a blog post text.</BlogPostTemplate>
);
