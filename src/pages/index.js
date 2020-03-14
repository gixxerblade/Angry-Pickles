import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Products from '../components/Products'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`Angry Pickles`, `Pickles`, `react`]} />
    <Products />
  </Layout>
)

export default IndexPage
