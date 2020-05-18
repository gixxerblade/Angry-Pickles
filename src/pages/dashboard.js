import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { Router } from "@reach/router";
import Layout from "../components/Layout";
import Profile from "../components/Profile";
import Customers from "../components/Customers";
import Shipping from "../components/Shipping";
import Login from "../components/Login";
import Ship from "../components/OrdersShipping/Ship";
import IdentityModal from "react-netlify-identity-widget";
import "react-netlify-identity-widget/styles.css";
import PrivateRoute from "../components/PrivateRoute";
import "@reach/tabs/styles.css";
import Completed from "../components/OrdersShipping/Completed";
import New from "../components/OrdersShipping/New";
import OrderShipping from "../components/OrdersShipping/OrderShippingTab";
const Dashboard = ({ location }) => {
  // useState to change visibility of the login modal
  const [isVisible, setVisibility] = useState(false);

  // Prop passed to Login component so when user clicks login the modal appears
  const showModal = () => setVisibility(true);

  //useEffect to check if the location path name matches
  useEffect(() => {
    if (location.pathname.match(/^\/dashboard\/?$/)) {
      navigate("/dashboard/login", { replace: true });
    }
  }, []);
  return (
    <Layout>
      <Profile showModal={showModal} />
      <Router>
        {/* PrivateRoute to prevent unauthenticated users from accessing protected areas */}
        <PrivateRoute path="/dashboard/customers" component={Customers} />
        <PrivateRoute path="/dashboard/shipping" component={Shipping}>
          <OrderShipping path="ordershipping">
            <New path="new" />
            <Completed path="completed" />
          </OrderShipping>
        </PrivateRoute>
        <PrivateRoute path="/dashboard/ship" component={Ship} />
        <Login path="/dashboard/login" showModal={showModal} />
      </Router>
      {/* IdentityModal is the built-in Netlify Modal for logging in and new users */}
      <IdentityModal
        showDialog={isVisible}
        onCloseDialog={() => setVisibility(false)}
        onLogin={() => setVisibility(false)}
      />
    </Layout>
  );
};
export default Dashboard;
