// TODO: This is not a very good solution, as every post has to be manually
// imported here!
// Maybe if/when I move to MDX, this problem will be solved automatically?

import { FRONT_MATTER as bezier } from './pages/posts/dynamic-bezier-curves';

const posts = [bezier].sort((a, b) => (a.publishedOn > b.publishedOn ? -1 : 1));

export default posts;
