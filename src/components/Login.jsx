import React from "react";
import styled from "styled-components";
// useIdentityContext to check login status
import { useIdentityContext } from "react-netlify-identity";
import { navigate } from "gatsby";
const Login = ({ showModal }) => {
  // Checks to see if user is logged in. If so, navigates to protected areas.
  const identity = useIdentityContext();
  if (identity && identity.isLoggedIn) {
    navigate("/dashboard/", { replace: true });
  }
  return (
    <StyledDiv>
      <StyledH1>Login or Sign Up</StyledH1>
      <StyledFormButton onClick={showModal}>Login</StyledFormButton>
    </StyledDiv>
  );
};

export default Login;

// Styling

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const StyledH1 = styled.h1`
  margin: 1rem;
  text-align: center;
`;
const StyledFormButton = styled.button`
  width: 25%;
  -webkit-border-radius: 1rem;
  -moz-border-radius: 1rem;
  border-radius: 1rem;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem;
  background-color: #679436;
  border: solid #ffffff 0.3rem;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #679436;
    border: solid #99c624 0.5rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    border-radius: 1rem;
    text-decoration: none;
  }
`;
