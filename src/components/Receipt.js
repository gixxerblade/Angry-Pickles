import React, { useContext, useEffect, useState } from "react";
import { any } from "prop-types";
import { UserContext } from "../components/UserContext";
import styled from "styled-components";
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";
import ReceiptTable from "./ReceiptTable";
const Receipt = () => {
  const [date, setDate] = useState("");
  useEffect(() => {
    getDate();
  }, []);
  const getDate = () => {
    const newDate = new Date().toDateString();
    setDate(newDate);
  };

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

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <InvoiceBox>
          <StyledHeaderDiv>
            <TopHeaderShape></TopHeaderShape>
            <Img
              fixed={logo.file.childImageSharp.fixed}
              alt="Angry Pickle Logo"
            />
          </StyledHeaderDiv>
          <br />
          <GetDate>{date}</GetDate>

          <h4>Order# {data.id}</h4>
          <h4>Name: {data.shipping.name}</h4>
          <h4 style={{ marginBottom: ".5em" }}>Shipping Address:</h4>
          <p>
            {data.shipping.address.line1}
            <br />
            {data.shipping.address.city}, {data.shipping.address.state}
            <br /> {data.shipping.address.postal_code}
          </p>
          <ReceiptTable />
          <InvoiceBox style={{ marginTop: "1rem", textAlign: "center" }}>
            If you have any questions, contact us at{" "}
            <a href="mailto:sales@angrypickles.com">sales@angrypickles.com</a>{" "}
            or call at <a href="tel:19105453000">+1 910-545-3000</a>.{" "}
          </InvoiceBox>
        </InvoiceBox>
      )}{" "}
    </>
  );
};
export default Receipt;

Receipt.propTypes = {
  data: any,
  loading: Boolean
};

const InvoiceBox = styled.div`
  position: relative;
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Poppins", sans-serif;
  color: #555;
  overflow: hidden;
`;
const StyledHeaderDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const TopHeaderShape = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 35%;
  background-image: linear-gradient(
    90deg,
    rgba(116, 186, 42, 1) 0%,
    rgba(189, 210, 166, 1) 45%,
    rgba(116, 186, 42, 1) 100%
  );
  clip-path: polygon(0 0, 100% 0, 100% 46%, 49% 33%, 0 46%);
  border-bottom: 1px solid black;
`;

const BottmHeaderShape = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 15%;
  background-image: linear-gradient(#c5e6a6, #bdd2a6);
  transform: skewY(3deg);
  transform-origin: top right;
`;
const GetDate = styled.div`
  position: absolute;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  right: 1em;
`;
