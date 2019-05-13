export type Frontmatter = {
  title: string,
  slug: string,
  isPublished: boolean,
  publishedOn: string,
  abstract: string,
  // NOTE: This'll be an enum with different options, once multiple exist:
  heroStyle?: 'watermelon-gradient',
};
