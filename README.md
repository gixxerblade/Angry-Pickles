# Angry Pickles E-Commerce Store

A storefront made with [Gatsby](https://www.gatsbyjs.org/), [Stripe](https://stripe.com/), [Easy Post](https://www.easypost.com/) <span style="color:red">(WIP)</span> & [Netlify Lambda Functions](https://www.netlify.com/docs/functions/). This site focuses on handling Stripe and Easy Post integration.

## Features

---

- Statically generate based on Stripe inventory
- Dynamically update with live inventory & availability data
- Checkout powered by Stripe
- Serverless functions interact with Stripe API
- Shopping cart persists in local storage
- Responsive images with gatsby-image
- Contact form powered by Netlify
- Admin login dashboard powered by Netlify Identify
- Shipping powered by Easypost <span style="color:red">(WIP)</span>
- Blog powered by Gatsby

## Getting Started

1. Create a site with Gatsby

`gatsby new <project-name> https://github.com/gixxerblade/Angry-Pickles`

2.Setup Stripe

Create your Products within Stripe. Each Product should have at least one Sku.

The GraphQL query in the `ProductsProvider` lists the properties that Gatsby will expect to find on your Products & Skus. The `localFiles` field is created by `gatsby-source-stripe`, and `fields.slug` is created by the starter in `gatsby-node`.

3.Configure API keys

Rename .env.development.sample to .env.development and fill with your Stripe API test keys. Do the same for .env.production and your live API keys. Don't commit these files to a public repo!

4.Start development servers

You will need to install and configure the [Netlify CLI](https://docs.netlify.com/cli/get-started/): `npm install netlify-cli -g`

To start the development servers for Gatsby & [Netlify Functions](https://github.com/netlify/netlify-lambda#usage) simply run [Netlify Dev](https://www.netlify.com/products/dev/).

`netify dev`

> Note: Make sure to use the proxied Netilfy Dev server and not the Gatsby server directly, >otherwise your Gatsby application will not be able to access your Netlify Functions.

> Note: try deleting the cache (rm -rf .cache) if Gatsby's dev server fails to start.

There are two development servers for this project:

`gatsby serve` for our Gatsby site
`netlify-lambda serve functions` for our Netlify Functions
You will probably want to start both at once:

`npm run start`

Your site is accessible at `http://localhost:8000` and your Netlify Functions are accessible at `http://localhost:8000/.netlify/`.

Note: try deleting the cache (rm -rf .cache) if Gatsby's dev server fails to start.

Start developing

The source files for Netlify Functions are located at /src/functions, they are then built into the files in /functions. Visit the documentation for more information on their structure.

The `ProductsProvider` & `CartProvider` components centralize data & logic, which are then passed through React's Context API. The starter's components are written using Hooks.

Deploy to Netlify

If you want to deploy somewhere other than Netlify, you'll have to find another place to deploy the serverless functions in `/functions`, ex. AWS Lambda.

## TODOs

- [x] Add About page
- [x] Add blog for updates
- [x] Add Contact form
- [x] Add admin area with dashboard
- [ ] Make admin area responsive
- [x] Add protected routes with Netlify Identity
- [x] Load Completed component by fetching 'fulfilled` order status
- [x] Create shipping dashboard for Easypost integration
- [ ] Integrate Twilio to send notification when a new order is received
- [ ] New order page
  - [ ] Functionality to cancel or refund order
- [x] Add Easypost shipping API to request shipping rates [Link](https://github.com/EasyPost/easypost-node)
  - [x] Shipping tracker information
  - [ ] Add functionality to adjust shipping dimensions and weight
  - [ ] Add a “Generate new rates” feature to the shipping dashboard
- [x] After item is shipped move to Completed component list
- [ ] Add Customers tab for marketing
  - [ ] Add sorting by name, purchase date.
  - [ ] Contact customer
  - [ ] Send marketing material/coupons
- [ ] Add Products page to dashboard
  - [ ] Ability to add products
  - [ ] Ability to update inventory
  - [ ] Add photos to products
- [ ] Insert Instagram AngryPickleGuy account into Updates page
- [ ] Add ability to enter coupon codes in Stripe modal
- [ ] Add ability to select shipping speed in Stripe modal
- [ ] Add route for users to create a login with Netlify Identity
- [ ] Use Jest to create testing for site
- [ ] Test Stripe inventory management for low items

## Acknowledgments

Thank you to [brxck](https://github.com/brxck) for making his starter available. Also to [njosefbeck](https://github.com/njosefbeck) for maintaining `gatsby-source-stripe`. Thank you to [Vets Who Code](https://vetswhocode.io/) for giving me the tools to create this site.

A donation to [Vets Who Code](https://vetswhocode.io/) goes to helping veterans, like myself, in learning front end development and other coding skills. You can donate here: [VetsWhoCode](https://vetswhocode.io/donate) or go [here](https://hashflag.shop/) to buy some cool 😎 Vets Who Code swag.
