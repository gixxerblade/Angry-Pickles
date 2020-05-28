import React, { useState } from "react";
import { useLocation } from "@reach/router";
import styled from "styled-components";
import { useFetch } from "../Fetcher";
import Spinner from "../Spinner";
import { Link, navigate } from "gatsby-plugin-modal-routing";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Usps } from "@styled-icons/fa-brands/Usps";
const Ship = () => {
  // Set state when button is clicked to purchase shipping

  // Location information to send to useFetch custom hook to retrieve order information
  const location = useLocation();
  const id = location.state.id;
  const query = `?id=${location.state.id}`;
  // Retrieve Stripe order serverless function
  const { data, loading } = useFetch(`/.netlify/functions/retrieve${query}`, {
    queryStringParameters: { id: id },
  });
  // Shows selected shipping method (Always "USPS: Priority (2 day delivery)")
  const shippingMethod =
    data.shipping_methods && data.shipping_methods[0].description;

  const [loadShipping, setLoadShipping] = useState(false);
  const [shipmentData, setShipmentData] = useState({});
  const [shipError, setShipError] = useState(null);
  const fetchData = async (id) => {
    //Create an argument to send to createShipment.js function
    const query = `?id=${id}`;
    let response;
    try {
      response = await fetch(`/.netlify/functions/createShipment${query}`, {
        queryStringParameters: { id: id },
        method: "GET",
      });
      const data = await response.json();
      setShipmentData(data);
      setLoadShipping(false);
      console.log(data);
    } catch (e) {
      setShipError(e);
      console.log(`"Unable to fulfill ${id}: ${e.message}, ${shipError}`);
    }
  };
  const goBack = () => {
    navigate(-1, { replace: true });
  };
  const onClick = (e) => {
    e.preventDefault();
    setLoadShipping(true);
    fetchData(id);
  };

  // Table of ordered items
  const orderedItems =
    data.items &&
    data.items.map((item) => {
      if (item.type === "sku") {
        return (
          <tr key={item.id}>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
            <td>${item.amount / 100}</td>
          </tr>
        );
      }
    });

  return (
    <>
      <br />
      <Link
        to="/dashboard/shipping"
        state={{
          noScroll: true,
        }}
        style={{ margin: "1rem" }}
      >
        <CloseOutline size="25" />
        &nbsp;<SpanClose>Cancel & Go Back</SpanClose>
      </Link>
      <>
        {loading ? (
          <ShippingSpinner />
        ) : (
          <InvoiceBox>
            <Container>
              <h2>Shipping information for order: #{data.id}</h2>
              <h4>Ship To:</h4>
              <address>
                <span>{data.shipping.name}</span>
                <br />
                <span>{data.shipping.address.line1}</span>
                <br />
                <span>
                  {data.shipping.address.city}, {data.shipping.address.state}
                  &nbsp;
                  {data.shipping.address.postal_code}
                </span>
                <br />
              </address>
              <h4>
                <Usps size="35" style={{ color: "#004B87" }} />
                &nbsp;
                {shippingMethod}
              </h4>
              <h4>Items Ordered:</h4>
              <Div>
                <Table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>{orderedItems}</tbody>
                </Table>
              </Div>
              {loadShipping ? (
                <Spinner />
              ) : (
                <p>
                  USPS Tracking #: &nbsp;&nbsp;
                  <a
                    title="Click to print label (opens in another window)"
                    href={shipmentData.shipping_label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shipmentData.tracking_code}
                  </a>
                </p>
              )}
            </Container>
            {shipmentData?.tracking_code ? (
              <PageBtn type="button" value="Go Back" onClick={goBack} />
            ) : (
              <PageBtn
                type="button"
                value="Purchase Shipping"
                onClick={onClick}
              />
            )}
          </InvoiceBox>
        )}
      </>
    </>
  );
};

export default Ship;
const PageBtn = styled.input`
  background-color: #44c767;
  border-radius: 1rem;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 0.8rem;
  padding: 1rem 1rem;
  text-decoration: none;
  margin-left: 1rem;
  width: 15rem;
  word-wrap: break-word;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    word-wrap: break-word;
  }
  &:hover {
    background-color: #5cbf2a;
    font-weight: 600;
  }
  &:active {
    position: relative;
    top: 2px;
    background-color: #2abfa1;
  }
`;
const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
`;
const InvoiceBox = styled.div`
  word-wrap: break-word;
  position: relative;
  max-width: 100%;
  margin: 1rem;
  padding: 2rem;
  border: 1px solid #eee;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  line-height: 1.5rem;
  font-family: "Poppins", sans-serif;
  color: #555;
  overflow: hidden;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 95%;
  }
`;

const ShippingSpinner = styled(Spinner)`
  position: absolute;
  top: 60vh;
  left: 50%;
  transform: translate(-50%, -50vh);
`;
const SpanClose = styled.span`
  font-family: "Poppins", sans-serif;
  text-decoration: none;
`;
const Table = styled.table`
  width: 50%;
  margin: 0;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`;
const Div = styled.div`
  margin: 1rem;
`;
