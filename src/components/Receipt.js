import React, { useContext } from "react";
import { any } from "prop-types";
import { UserContext } from "../components/UserContext";

const Receipt = () => {
  const { data, loading } = useContext(UserContext);
  return <>{loading ? <h2>Loading...</h2> : <h2>{data}</h2>} </>;
};
export default Receipt;

Receipt.propTypes = {
  data: any,
  loading: any
};
