import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
const links = {
  Home: "/",
  About: "/about",
  "Shop Policies": "/policies",
  Updates: "/updates",
  Contact: "/contact"
};

const Navbar = () => {
  const urls = links;
  const linkList = Object.entries(urls).map(([key, value]) => {
    return (
      <StyledLi key={key.id}>
        <StyledNavbarLink to={value}>{key}</StyledNavbarLink>
      </StyledLi>
    );
  });
  return (
      <StyledNavbarUl>{linkList}</StyledNavbarUl>
  );
};
export default Navbar;

const StyledLi = styled.li`
  text-decoration: none;
  &:hover {
    transition: 0.2s linear;
    transform: scale(1.1);
  }
`;

const StyledNavbarUl = styled.ul`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  list-style: none;
  text-decoration: none;
`;
const StyledNavbarLink = styled(Link)`
  text-decoration: none;
  color: #ebf2fa;
  cursor: pointer;
  &:hover {
    color: #679436;
  }
`;
