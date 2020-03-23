import React from "react";
import { Router } from "@reach/router";
import Home from "./home";
import About from "./about";
import Contact from "./contact";
import Policies from "./policies";
import Updates from "./updates";
import Order from "./order";
const IndexPage = () => (
  <Router>
    <Home path="/" />
    <About path="/about" />
    <Contact path="/contact" />
    <Policies path="/policies" />
    <Updates path="/updates" />
    <Order path="/order" />
  </Router>
);

export default IndexPage;
