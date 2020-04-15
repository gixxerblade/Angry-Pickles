import React, { useContext } from "react";
import { OpenContext } from "./openContext";
import { Link } from "gatsby";
import styled from "styled-components";

const links = {
  Home: "/home",
  About: "/about",
  "Shop Policies": "/policies",
  Updates: "/updates",
  Contact: "/contact",
};

const MobileNavbar = () => {
  const urls = links;
  const [opened] = useContext(OpenContext);

  const linkList = Object.entries(urls).map(([key, value]) => {
    return (
      <StyledLi key={key}>
        <StyledNavbarLink to={value}>{key}</StyledNavbarLink>
      </StyledLi>
    );
  });
  return (
    <>
      <StyledNavbarUl opened={opened}>{linkList}</StyledNavbarUl>
    </>
  );
};

export default MobileNavbar;

const StyledLi = styled.li`
  text-decoration: none;
  font-size: 2rem;
  &:hover {
    transition: 0.2s linear;
    transform: scale(1.1);
  }
`;
const StyledNavbarUl = styled.ul`
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;
  position: fixed;
  width: 100%;
  height: 81vh;
  margin: 0;
  left: 0;
  top: 11rem;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  text-decoration: none;
  z-index: 1;
  transition: .2s linear;
  transform: ${({ opened }) => (opened ? "translateX(0)" : "translateX(100%)")};
`;
const StyledNavbarLink = styled(Link)`
  text-decoration: none;
  color: #ebf2fa;
  cursor: pointer;
  &:hover {
    color: #679436;
  }
`;
