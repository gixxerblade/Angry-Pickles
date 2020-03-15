import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Products from "../components/Products";
import {Router} from "@reach/router";
const Home = () => (
  <Layout>
    <SEO title="Home" keywords={[`Angry Pickles`, `Pickles`, `gourmet pickles`, `handmade`, `spicy`,`dill`,`kosher`,`gluten free`,`comfort food`,`power food`,`homemade`, `artisan` ]} />
    <Styledh2>Making small batches of pickles using fresh stuff</Styledh2>
    <Products />
  </Layout>

);

export default Home;
const Styledh2 = styled.h2`
  font-family: "Poppins", sans-serif;
  margin: 2rem;
  text-align: center;
`;
