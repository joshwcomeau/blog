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
          const data = allMdx.edges
            .filter(edge => {
              const { isPublished } = edge.node.frontmatter;

              return isPublished;
            })
            .map(edge => {
              const { siteUrl } = site.siteMetadata;
              const {
                slug,
                abstract,
                publishedOn,
                interactive,
              } = edge.node.frontmatter;

              const postUrl = `${siteUrl}/posts/${slug}`;

              let html;

              if (interactive) {
                html = `<div style="margin-top: 50px; font-style: italic;">This post features interactive elements, and cannot be displayed in an RSS reader. <strong><a href="${postUrl}">View it on joshwcomeau.com</a></strong>.</div>`;
              } else {
                const disclaimer = `${abstract}<div style="margin-top: 50px; font-style: italic;"><strong><a href="${postUrl}">View the original post</a>.</strong></div><br /><br />`;

                // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
                html = edge.node.html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);

                html = disclaimer + html;
              }

              return Object.assign({}, edge.node.frontmatter, {
                description: abstract,
                date: publishedOn,
                url: postUrl,
                guid: postUrl,
                custom_elements: [{ 'content:encoded': html }],
              });
            });

          return data;
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
                    interactive
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
