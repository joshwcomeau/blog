// TODO: This is not a very good solution, as every post has to be manually
// imported here!
// Maybe if/when I move to MDX, this problem will be solved automatically?

import { FRONT_MATTER as foldable } from './foldable-interfaces';

const posts = [foldable].sort(
  (a, b) => (a.publishedOn > b.publishedOn ? 1 : -1)
);

export default posts;
