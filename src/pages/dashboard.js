import React, { useEffect } from "react";
import { Link, navigate, replace } from "gatsby";
import { Router } from "@reach/router";
import Layout from "../components/Layout";
import Profile from "../components/Profile";
import styled from "styled-components";
import Customers from "../components/Customers";
import Shipping from "../components/Shipping";
import Login from "../components/Login";
const Dashboard = ({ location }) => {
  useEffect(() => {
    if (location.pathname.match(/^\/dashboard\/?$/)) {
      navigate("/dashboard/login", { replace: true });
    }
  }, []);
  return (
    <Layout>
      <Profile />
      <h1>TODO: Create a Dashboard</h1>
      <Router>
        <Customers path="/dashboard/customers" />
        <Shipping path="/dashboard/shipping" />
        <Login path="/dashboard/login" />
      </Router>
    </Layout>
  );
};
export default Dashboard;
