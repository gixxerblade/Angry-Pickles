import React from "react";
import { Router } from "@reach/router";
import Home from "./home";
import About from "./about";
import Contact from "./contact";
import Policies from "./policies";
import Updates from "./updates";
import Order from "./order";
import Splash from "./splash";
import "@stripe/stripe-js";
import Thanks from "./thanks";
const IndexPage = () => (
  <Router>
    <Splash path="/" />
    <Home path="/home" />
    <About path="/about" />
    <Contact path="/contact" />
    <Policies path="/policies" />
    <Updates path="/updates" />
    <Order path="/order" />
    <Thanks path="/thanks" />
  </Router>
);

export default IndexPage;
