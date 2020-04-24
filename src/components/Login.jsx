import React from "react";
import styled from "styled-components";
const Login = () => {
  return (
    <StyledDiv>
      <StyledH1>Login or Sign Up</StyledH1>
      <StyledFormButton>Login</StyledFormButton>
    </StyledDiv>
  );
};

export default Login;

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
