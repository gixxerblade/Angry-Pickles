import React from "react";
import { useLocation } from "@reach/router";
import styled from "styled-components";
import { useFetch } from "../Fetcher";
import Spinner from "../Spinner";

const Ship = () => {
  const location = useLocation();
  const query = `?id=${location.state.id}`;
  const id = location.state.id;
  //console.log(location.state.id);
  const { data, loading } = useFetch(`/.netlify/functions/retrieve${query}`, {
    queryStringParameters: { id: id },
  });

  return (
    <>
      <h1>TODO: Placeholder for shipping items</h1>
      {loading ? <ShippingSpinner /> : <h2>{data.id}</h2>}
    </>
  );
};

export default Ship;

const ShippingSpinner = styled(Spinner)`
  position: absolute;
  top: 60vh;
  left: 50%;
  transform: translate(-50%, -50vh);
`;
