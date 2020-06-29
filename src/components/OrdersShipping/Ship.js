import React, { useState, useReducer } from "react";
import { useLocation } from "@reach/router";
import styled from "styled-components";
import { useFetch } from "../Fetcher";
import Spinner from "../Spinner";
import { Link, navigate } from "gatsby-plugin-modal-routing";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Usps } from "@styled-icons/fa-brands/Usps";

const packageReducer = (state, action) => {
  switch (action.type) {
    case "setPounds": {
      return { ...state, weight: { ...state.weight, pounds: action.pounds } };
    }
    case "setOunces": {
      return { ...state, weight: { ...state.weight, ounces: action.ounces } };
    }
    case "setLength": {
      return { ...state, size: { ...state.size, length: action.length } };
    }
    case "setWidth": {
      return { ...state, size: { ...state.size, width: action.width } };
    }
    case "setHeight": {
      return { ...state, size: { ...state.size, height: action.height } };
    }
  }
};
const initialPackageState = {
  size: {
    length: 0,
    width: 0,
    height: 0,
  },
  weight: {
    pounds: 0, //TODO: convert function
    ounces: 0,
  },
};
const Ship = () => {
  // Set state when button is clicked to purchase shipping
  const [packageState, dispatchPackageState] = useReducer(
    packageReducer,
    initialPackageState
  );
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

  // Buy shipping function
  const buyShipping = async (id) => {
    //Create an argument to send to createShipment.js function
    const query = `?id=${id}`;
    let response;
    try {
      // fetch serverless function to buy shipping
      response = await fetch(`/.netlify/functions/createShipment${query}`, {
        queryStringParameters: { id: id },
        // TODO: send package dimensions and weight in case it is different than recommended
        //body: JSON.stringify({
        //  packageState,

        // }),
        //method: "POST",

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
    navigate("/dashboard/new", { replace: true });
  };
  const onClick = (e) => {
    e.preventDefault();
    setLoadShipping(true);
    buyShipping(id);
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
            <ContentContainer>
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
              <LabelsContainer>
                <h3 style={{ textAlign: "center" }}>Shipping Dimensions</h3>
                <LabelContainer>
                  <label for="pounds">Pounds</label>
                  <input
                    type="number"
                    name="pounds"
                    min="0"
                    id=""
                    value={packageState.weight.pounds}
                    onChange={(event) => {
                      dispatchPackageState({
                        type: "setPounds",
                        pounds: event.target.value,
                      });
                    }}
                  />
                </LabelContainer>
                <LabelContainer>
                  <label for="ounces">Ounces</label>
                  <input
                    type="number"
                    min="0"
                    max="15"
                    name="ounces"
                    id=""
                    value={packageState.weight.ounces}
                    onChange={(event) => {
                      dispatchPackageState({
                        type: "setOunces",
                        pounds: event.target.value,
                      });
                    }}
                  />
                </LabelContainer>
                <LabelContainer>
                  <label for="length">Length(in.)</label>
                  <input
                    type="number"
                    min="0"
                    name="length"
                    id=""
                    value={packageState.size.length}
                    onChange={(event) => {
                      dispatchPackageState({
                        type: "setLength",
                        pounds: event.target.value,
                      });
                    }}
                  />
                </LabelContainer>
                <LabelContainer>
                  <label for="width">Width(in.)</label>
                  <input
                    type="number"
                    min="0"
                    name="width"
                    id=""
                    value={packageState.size.width}
                    onChange={(event) => {
                      dispatchPackageState({
                        type: "setWidth",
                        pounds: event.target.value,
                      });
                    }}
                  />
                </LabelContainer>
                <LabelContainer>
                  <label for="height">Height(in.)</label>
                  <input
                    type="number"
                    min="0"
                    name="height"
                    id=""
                    value={packageState.size.height}
                    onChange={(event) => {
                      dispatchPackageState({
                        type: "setHeight",
                        pounds: event.target.value,
                      });
                    }}
                  />
                </LabelContainer>
              </LabelsContainer>
            </ContentContainer>
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

const LabelsContainer = styled.div`
  border: solid 1px #ccc
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  margin: 0.5rem;
`;

const LabelContainer = styled.div`
  margin: 0.5rem;
  position: relative;
  padding: 0 0.5rem;
  border: solid 1px #ccc;
  & input {
    border: none;
    font-size: 1rem;
    outline: 0;
    padding: 0.25rem 0 0.625rem;
  }
  & label {
    font-size: 1rem;
    position: absolute;
    right: 0.5rem;
    top: 50%;
  }
  & input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
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
  margin: 0.5rem;
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
