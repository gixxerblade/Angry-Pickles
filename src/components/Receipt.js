import React, { useContext } from "react";
import { any } from "prop-types";
import { UserContext } from "../components/UserContext";
import styled from "styled-components"
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";

const Receipt = () => {
  const logo = useStaticQuery(graphql`
    query logo {
      file(relativePath: { eq: "ap_logo.png" }) {
        childImageSharp {
          fixed(background: "white", width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const { data, loading } = useContext(UserContext);
  // console.log("Order Data: ", data.id); // returns undefined

  return <>
  {loading ?  <h2>Loading...</h2> : 
  <InvoiceBox>
  <Img fixed={logo.file.childImageSharp.fixed} alt="Angry Pickle Logo"/>
  <br/>
    <strong>Order ID:</strong> {data.id} <br/>
    <strong>Name:</strong> {data.shipping.name}
</InvoiceBox>} </>;
};
export default Receipt;

Receipt.propTypes = {
  data: any.isRequired,
  loading: Boolean.isRequired
};


const InvoiceBox = styled.div `
max-width: 800px;
margin: auto;
padding: 30px;
border: 1px solid #eee;
box-shadow: 0 0 10px rgba(0, 0, 0, .15);
font-size: 16px;
line-height: 24px;
font-family: "Poppins", sans-serif;
color: #555;
`
