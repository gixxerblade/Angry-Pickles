import React, { useContext, useState } from "react";
import { OrderContext } from "./OrderProvider";
import styled from "styled-components";
import Spinner from "../Spinner";
import { navigate } from "gatsby";
const New = () => {
  // Load data from listOrders.js lambda function
  const { data, loading, error } = useContext(OrderContext);

  // id for capturing the order ID when "Create New Shipment" is clicked
  const [id, setId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setId(order.id)
    console.log(id)
  };
  //console.log(data.data);
  const { data: unfulfilledOrder } = data;
  // console.log(newOrder);
  let order;
  // Will only display once promise is resolved
  if (unfulfilledOrder) {
    order = unfulfilledOrder.map((order) => {
      if (order.status_transitions.fulfiled === null) {
        return (
          <InvoiceBox onSubmit={onSubmit}>
            <Container className="container">
              <div className="left">
                <div>{order.shipping.name}</div>
                <div>Order#:&nbsp;{order.id}</div>
                <div>Total: ${order.amount / 100}</div>
                <div>
                  {order.items.map((item) => {
                    let desc = item.description;
                    let qty = item.quantity;
                    let sku = item.parent;
                    if (item.type === "sku") {
                      return (
                        <div>
                          <div>Sku: {sku}</div>
                          <div>Item: {desc}</div>
                          <div>Quantity: {qty}</div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <RightContainer className="right">
                <PageBtn type="button" value="Create New Shipment" />
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
    // Should I have this here?
  } else console.log(error) && navigate("/404");
  return <>{loading ? <ShippingSpinner /> : <div>{order}></div>}</>;
};
export default New;
const ShippingSpinner = styled(Spinner)`
  position: absolute;
  top: 60vh;
  left: 50%;
  transform: translate(-50%, -50vh);
`;
const InvoiceBox = styled.form`
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

  &:hover {
    background-color: #5cbf2a;
  }
  &:active {
    position: relative;
    top: 2px;
    background-color: #2abfa1;
  }
`;
const MailBtn = styled.a`
  width: 90%;
  height: 3rem;
  line-height: 2rem;
  text-align: center;
  background-color: #44c767;
  border-radius: 1rem;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 0.8rem;
  padding: 0.5rem 0.5rem;
  text-decoration: none;
  margin: auto;
  &:hover {
    background-color: #5cbf2a;
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
