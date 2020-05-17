import React from "react";
import { useLocation } from "@reach/router";
import styled from "styled-components";
import { useFetch } from "../Fetcher";
import Spinner from "../Spinner";
import { Link } from "gatsby-plugin-modal-routing";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
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
      <Link
        to="/dashboard/shipping"
        state={{
          noScroll: true,
        }}
      >
        <CloseOutline size="25" />
        &nbsp;<SpanClose>Close</SpanClose>
      </Link>
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
const SpanClose = styled.span`
  font-family: "Poppins", sans-serif;
  text-decoration: none;
`;
