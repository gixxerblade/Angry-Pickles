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
import Dashboard from "./dashboard";
import Customers from "../components/Customers";
import Shipping from "../components/Shipping";
const IndexPage = () => (
  <Router>
    <Splash path="/" />
    <Home path="/home" />
    <About path="/about" />
    <Contact path="/contact" />
    <Policies path="/policies" />
    <Updates path="/updates" />
    <Order path="/order" />
    <Dashboard path="/dashboard/*" />
    <Thanks path="/thanks" />
  </Router>
);

export default IndexPage;
