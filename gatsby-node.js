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
  else if (node.internal.type === `MarkdownRemark`) {
    // console.log(node.internal.type);
    const value = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: value,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // Everything wrapped in a try/catch block for error checking
  try {
    // GraphQL queries
    const result = await graphql(`
      {
        stripe: allStripeSku {
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
        blog: allMarkdownRemark {
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
    // console.log(result);
    // *** Stripe create pages ***
    // Stripe product template location
    const productTemplate = path.resolve("src/templates/ProductTemplate.js");

    // Create product pages
    const products = {};
    result.data.stripe.edges.forEach(({ node }) => {
      products[node.product.id] = node.fields.slug;
    });

    Object.entries(products).forEach(([id, slug]) => {
      createPage({
        path: `buy/${slug}`,
        component: productTemplate,
        context: { id },
      });
    });

    // ***Blog post create pages***
    // Markdown blog post template location
    const blogTemplate = path.resolve(`./src/templates/blog-post.js`);
    // Create new blog post pages
    result.data.blog.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: blogTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      });
    });
  } catch (error) {
    // reporter.panicOnBuild('message', error) built-in Gatsby Noe API helper
    // As seen here: https://www.gatsbyjs.org/docs/node-api-helpers/#reporter
    reporter.panicOnBuild(`Error while running GraphQL query.`, error);
  }
};

// Create an order summary page for each order
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

// Dashboard create page
exports.onCreatePage = ({ page, actions }) => {
  if (page.path.match(/^\/dashboard/)) {
    page.matchPath = "/dashboard/*";
    actions.createPage(page);
  }
};

 // Create an shipping summary page for each order
/* exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // Only update the `/order` page.
  if (page.path.match(/^\/dashboard\/ship/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "dashboard/ship/*";
    // Update the page.
    createPage(page);
  }
};  */
