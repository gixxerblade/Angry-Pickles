import React, { useContext, useEffect } from "react";
import { OrderContext } from "./OrderProvider";
import styled from "styled-components";
import Spinner from "../Spinner";
const Completed = () => {
  // Load data from listOrders.js lambda function
  const { data, loading } = useContext(OrderContext);
  //console.log(data.data);
  const { data: fulfiledOrder } = data;
  // console.log(newOrder);
  let completed;
  // Will only display once promise is resolved
  if (fulfiledOrder) {
    completed = fulfiledOrder.map((order) => {
      if (order.status_transitions.fulfiled && order.status_transitions.paid) {
        const orderKey = order.url;

        //Need the date
        const dateObj = new Date(order.created * 1000);

        //Date options
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        const fulfilled = order.status
        const date = dateObj.toLocaleString("en", options);
        return (
          <InvoiceBox>
            <Container className="container">
              <div className="left">
                <h3>
                  <strong>{order.shipping.name}</strong>
                </h3>
                <div>
                  <strong>Date ordered: </strong>
                  {date}
                </div>
                <div>
                  <strong>Order#:</strong>&nbsp;{order.id}
                </div>
                <div>
                  <strong>Total:</strong> ${order.amount / 100}
                </div>
                <div>
                  <strong>Order Status:</strong> {fulfilled.toUpperCase()}
                </div>

                <div>
                  <div>
                    <a
                      href={order.metadata.shipping_postage_label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>Label:</strong>&nbsp;&nbsp;{" "}
                      {order.metadata.shipping_tracking_code}
                    </a>
                  </div>
                  <div>
                    <a
                      href={order.metadata.shipping_public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>Track Order:</strong>&nbsp;&nbsp;
                      {order.metadata.shipping_tracking_code}
                    </a>
                  </div>
                  <br />
                  <h3 >Order</h3>
                  <hr style={{borderTop: "3px double #8c8b8b"}} />
                  {order.items.map((item) => {
                    let desc = item.description;
                    let qty = item.quantity;
                    let sku = item.parent;
                    if (item.type === "sku") {
                      return (
                        <div key={orderKey}>
                          <div>
                            <strong>Sku:</strong> {sku}
                          </div>
                          <div>
                            <strong>Item:</strong> {desc}
                          </div>
                          <div>
                            <strong>Quantity:</strong> {qty}
                          </div>
                        <hr/>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <RightContainer className="right">
                <MailBtn
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href={`mailto:${order.email}?subject=Angry Pickle Order #${order.id}&body=${order.shipping.name},`}
                >
                  Contact Customer
                </MailBtn>
              </RightContainer>
            </Container>
          </InvoiceBox>
        );
      }
    });
  }
  //console.log(loading);
  return <>{loading ? <ShippingSpinner /> : <div>{completed}</div>}</>;
};
export default Completed;

const ShippingSpinner = styled(Spinner)`
  position: absolute;
  top: 60vh;
  left: 50%;
  transform: translate(-50%, -50vh);
`;
const InvoiceBox = styled.div`
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
`;
const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
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
  margin: 0.5rem;
  width: 90%;

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
const MailBtn = styled.a`
  width: 90%;
  line-height: 2rem;
  text-align: center;
  background-color: #44c767;
  border-radius: 1rem;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 0.8rem;
  padding: 0.7rem 0.7rem;
  text-decoration: none;
  margin: 0.5rem;
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
const RightContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
