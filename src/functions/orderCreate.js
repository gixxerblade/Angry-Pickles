const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY);

/** Respond with status code 500 and error message */
function errorResponse(err, callback) {
  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 500,
    body: JSON.stringify({
      error: err,
    }),
  };

  if (typeof callback === "function") {
    callback(null, response);
  }
}

/**
 * Captures payment token and creates order.
 */
module.exports.handler = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const { id, email } = requestBody.token;
  const { currency, items, shipping } = requestBody.order;

  // Create order
  try {
    const order = await stripe.orders.create({
      currency,
      items,
      shipping,
      email,
    });
    // Update order
    const shippingMethod = order.shipping_methods.find(
      (shippingMethod) =>
        shippingMethod.description === "USPS: Priority (2 day delivery)"
    );
    const updatedOrder = await stripe.orders.update(order.id, {
      selected_shipping_method: shippingMethod.id,
    });

    // Charge order
    const paid = await stripe.orders.pay(updatedOrder.id, {
      source: id,
    });

    console.log("paid:", paid);
    const response = {
      headers: {
        "Access-Control-Allow-Origin": "https://www.angrypickles.com/",
      },
      statusCode: 200,
      body: JSON.stringify({
        data: order,
        message: "Order placed successfully!",
      }),
    };

    callback(null, response);
  } catch (e) {
    errorResponse(e, callback);
  }
};
