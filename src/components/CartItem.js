import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CartContext } from "./CartProvider";
import { Trash } from "@styled-icons/boxicons-solid/Trash";
import { PlusCircle, MinusCircle } from "@styled-icons/boxicons-solid";
const CartItem = ({ sku, quantity }) => {
  const { add, remove } = useContext(CartContext);
  return (
    <div key={sku.id} style={{ display: "flex", margin: "1rem 1rem" }}>
      <img
        style={{
          width: 100,
          maxHeight: 100,
          objectFit: "contain",
          marginRight: "0.5rem",
        }}
        src={sku.image || sku.product.images[0]}
        alt={sku.product.name}
      />
      <div style={{ flexBasis: "100%" }}>
        <div style={{ fontWeight: "bold" }}>{sku.product.name}</div>
        <div>
          ${sku.price / 100} &times; {quantity}
        </div>
        <div>
          <strong>${(sku.price / 100) * quantity}</strong>
        </div>
      </div>
      <IconDiv>
        <StyledQuantityDiv>
          <span
            onClick={() => {
              add(sku.id);
            }}
          >
            <PlusCircle size="30" />
          </span>
          <span
            onClick={() => {
              quantity > 1 ? add(sku.id, (quantity = -1)) : remove(sku.id);
            }}
          >
            <MinusCircle size="30" />
          </span>
        </StyledQuantityDiv>
        <span
          style={{}}
          onClick={() => {
            remove(sku.id);
          }}
        >
          <Trash size="30" />
        </span>
      </IconDiv>
    </div>
  );
};

CartItem.propTypes = {
  sku: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartItem;
const StyledQuantityDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const IconDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 4rem;
  height: 6rem;
`;
