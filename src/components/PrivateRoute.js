import React from "react";
import { navigate } from "gatsby";
import { useIdentityContext } from "react-netlify-identity";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const identity = useIdentityContext();
  const isLoggedIn = identity?.isLoggedIn;

  // IF not logged in navigate user to login page.
  if (!isLoggedIn && location.pathname !== "/dashboard/login") {
    navigate("/dashboard/login", { replace: true });
    return null;
  }
  // IF logged then display the private components (Profile,Customers,Etc...)
  return <Component {...rest} />;
};
export default PrivateRoute
