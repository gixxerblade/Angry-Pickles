import React, { useContext, useState } from "react";

import { CartContext } from "./CartProvider";
import Spinner from "./Spinner";
import StripeCheckout from "react-stripe-checkout";
import icon from "../images/ap_logo.png";
import { navigate } from "gatsby";

const Checkout = () => {
  const { cart, count, total } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const onToken = async (token, addresses) => {
    const items = cart.map(([sku, quantity]) => ({
      type: "sku",
      parent: sku.id,
      quantity,
    }));
    try {
      const response = await fetch("/.netlify/functions/orderCreate", {
        method: "POST",
        body: JSON.stringify({
          token,
          order: {
            currency: "usd",
            items,
            shipping: {
              name: addresses.shipping_name,
              address: {
                line1: addresses.shipping_address_line1,
                line2: addresses.shipping_address_line2 || "",
                city: addresses.shipping_address_city,
                state: addresses.shipping_address_state,
                postal_code: addresses.shipping_address_zip,
                country: addresses.shipping_address_country_code,
              },
            },
          },
        }),
      });
      const { data } = await response.json();

      // Empties local storage
      localStorage.setItem("cart", "{}");
      // Redirect to order summary page
      navigate(`/order?id=${data.id}`);
      setLoading(true);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <StripeCheckout
      token={onToken}
      stripeKey="pk_test_UkXkeSoYvBrRwirxwzNfZYhj00m81HqFNP"
      name="Angry Pickles" // the pop-in header title
      description={`${count} Items`} // the pop-in header subtitle
      image={icon} // the pop-in header image (default none)
      panelLabel="Pay" // prepended to the amount in the bottom pay button
      amount={total} // cents
      currency="USD"
      locale="en"
      shippingAddress
      billingAddress
      zipCode
      allowRememberMe
    >
      <button>Checkout for ${total / 100}</button>
      {loading && <Spinner />}
    </StripeCheckout>
  );
};
export default Checkout;
