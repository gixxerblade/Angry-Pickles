import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { useIdentityContext } from "react-netlify-identity";
const Profile = ({ showModal }) => {
  // Hook to check if user is logged in
  const identity = useIdentityContext();
  const isLoggedIn = identity && identity.isLoggedIn;

  //Optional chaining to access users name to display
  const name = identity?.user?.user_metadata?.full_name;
  return (
    isLoggedIn && (
      <StyledNav>
        {/* Log out button */}
        <StyledBtn onClick={showModal}>Logout</StyledBtn>
        {/* Links to various protected areas */}
        <StyledLink to="/dashboard/customers">Customers</StyledLink>
        <StyledLink to="/dashboard/shipping">Orders & Shipping</StyledLink>
        <StySpan>Welcome, {name}</StySpan>
      </StyledNav>
    )
  );
};

export default Profile;

//Styling

const StyledNav = styled.nav`
  left: 0;
  width: 100%;
  height: 5rem;
  background-color: rgba(189, 210, 166, 1);
  display: flex;
  flex-flow: row wrap;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  justify-content: space-between;
  align-items: center;
  color: #385d3e;
`;
const StySpan = styled.span`
  margin: 1rem;
`;

const StyledBtn = styled.button`
  -webkit-border-radius: 0.5rem;
  -moz-border-radius: 0.5rem;
  border-radius: 0.5rem;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem;
  background-color: #679436;
  border: solid #ffffff 0.3rem;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  margin: 1rem;
  &:hover {
    background: #679436;
    text-decoration: none;
    transform: scale(1.05);
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #385d3e;
  &:hover {
    color: #65922b;
    transform: scale(1.05);
  }
  &:active {
    color: #05668d;
  }
`;
