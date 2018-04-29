import React from 'react';

import BlogPostTemplate from '../../../templates/BlogPost';
import StarryBgSrc from './yong-chuan-645079-unsplash.jpg';

const FRONT_MATTER = {
  title: 'Foldable UI',
  publishedOn: '2018-04-29',
  headerImage: StarryBgSrc,
};

export default () => (
  <BlogPostTemplate {...FRONT_MATTER}>I'm a blog post text.</BlogPostTemplate>
);
