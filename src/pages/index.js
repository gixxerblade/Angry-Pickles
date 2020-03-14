import React from "react";
import styled from "styled-components";
import { Router } from "@reach/router";
import Home from "./home";
import About from "./about";
import Contact from "./contact";
import Policies from "./policies";
import Updates from "./updates";
const IndexPage = () => (
  <Router>
    <Home path="/" />
    <About path="/about" />
    <Contact path="/contact" />
    <Policies path="/policies" />
    <Updates path="/updates" />
  </Router>
);

export default IndexPage;
const Styledh2 = styled.h2`
  font-family: "Poppins", sans-serif;
  margin: 2rem;
  text-align: center;
`;
