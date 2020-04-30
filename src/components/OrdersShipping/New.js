import React, { useState, useContext, useEffect } from "react";
import { OrderContext } from "./OrderProvider";

const New = () => {
  const { data, loading, error } = useContext(OrderContext);

  console.log(data, error);
  //console.log(data.data.map(list=>{return list}));
  //const orders = data.data.map(list=>{return list})
  //const item = orders.map(items=>{return(
  //  <li key={items.id}>items</li>)})
  return (
    <div>
      <ul>
        {data.data.map((list) => {
          return <li key={list.id}>{list.id}</li>;
        })}
      </ul>
    </div>
  );
};
export default New;
