// gatsby-plugin-feed config
module.exports = {
  resolve: `gatsby-plugin-feed`,
  options: {
    query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
    feeds: [
      {
        serialize: ({ query: { site, allMdx } }) => {
          return allMdx.edges.map(edge => {
            const { siteUrl } = site.siteMetadata;
            const { slug, abstract, publishedOn } = edge.node.frontmatter;
            const postUrl = `${siteUrl}/${slug}`;
            const postText = `
                <div style="margin-top: 50px; font-style: italic;">(This is just a snippet of an article posted at joshwcomeau.com. <a href="${siteUrl +
                  '/' +
                  slug}">Read the full post instead</a>.)</div>
              `;

            let html = edge.node.html;
            // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
            html = html
              .replace(/href="\//g, `href="${siteUrl}/`)
              .replace(/src="\//g, `src="${siteUrl}/`)
              .replace(/"\/static\//g, `"${siteUrl}/static/`)
              .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);

            return Object.assign({}, edge.node.frontmatter, {
              description: abstract,
              date: publishedOn,
              url: site.siteMetadata.siteUrl + slug,
              guid: site.siteMetadata.siteUrl + slug,
              custom_elements: [{ 'content:encoded': html + postText }],
            });
          });
        },
        query: `
          {
            allMdx(
              limit: 1000,
              sort: { order: DESC, fields: [frontmatter___publishedOn] }
            ) {
              edges {
                node {
                  excerpt
                  html
                  frontmatter {
                    title
                    slug
                    publishedOn
                    abstract
                    isPublished
                  }
                }
              }
            }
          }
        `,
        output: '/rss.xml',
        title: "Josh Comeau's blog",
      },
    ],
  },
};
