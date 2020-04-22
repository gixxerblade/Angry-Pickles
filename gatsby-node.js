const path = require("path");
const slug = require("slug");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Add slug for Stripe page generation.
  if (node.internal.type === "StripeSku") {
    // console.log(node.internal.type);
    const value = slug(node.product.name, slug.defaults.modes["rfc3986"]);
    createNodeField({
      node,
      name: "slug",
      value,
    });
  }
  // Add slug for Markdown page generation.
  if (node.internal.type === `MarkdownRemark`) {
    // console.log(node.internal.type);
    const value = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: value,
    });
  }
};

// Create page for each Stripe SKU
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allStripeSku {
        edges {
          node {
            fields {
              slug
            }
            product {
              id
              name
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      Promise.reject(result.errors);
    }

    // Create product pages
    const products = {};

    result.data.allStripeSku.edges.forEach(({ node }) => {
      products[node.product.id] = node.fields.slug;
    });

    const productTemplate = path.resolve("src/templates/ProductTemplate.js");
    Object.entries(products).forEach(([id, slug]) => {
      createPage({
        path: "buy/" + slug,
        component: productTemplate,
        context: { id },
      });
    });
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // Only update the `/order` page.
  if (page.path.match(/^\/order/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/order/*";
    // Update the page.
    createPage(page);
  }
};

// Create page for each Markdown file
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });
};
