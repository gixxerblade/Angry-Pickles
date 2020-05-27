const EasyPost = require("@easypost/api");
const apiKey = process.env.GATSBY_EASYPOST_APIKEY;
const api = new EasyPost(apiKey);
const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY);

const errorResponse = (err, callback) => {
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
};

module.exports.handler = async (event, context, callback) => {
  // Send over the order id & selected_shipping_method in the event body from Ship.js
  const requestBody = JSON.parse(event.body);
  console.log(requestBody);
  // Destructure body.order.id
  const { id } = requestBody.order;

  // Part of the onClick event to purchase shipping from Easypost
  // API doc here => https://www.easypost.com/stripe-relay
  // and https://www.easypost.com/docs/api/node#shipments

  // The Stripe Order id is automatically sent to EasyPost as a Shipment reference
  // At least according to Easypost
  try {
    //Retrieve Stripe order data
    const order = await stripe.orders.retrieve(id).catch((e) => console.log(e));

    //The Stripe Order.id is automatically sent to EasyPost as a Shipment reference
    const shipments = await api.Shipment.retrieve(id);

    //Stripe order should already have a "selected_shipping_method" otherwise default to lowest rate
    const selectEasypostRateForStripeOrder = async (order, shipment) => {
      order.selected_shipping_method &&
      order.selected_shipping_method.startsWith("rate_")
        ? await api.Rate.new(shipment)
        : await shipment.lowest_rate("USPS");
    };
    // Above function
    const selectedRate = await selectEasypostRateForStripeOrder(
      order,
      shipments
    );
    // Buy this rate
    shipments.buy(selectedRate);

    //Update the Stripe order status and tracking information
    await stripe.orders.update(id, {
      status: "fulfilled",
      metadata: { shipping_tracking_code: shipments.tracking_code },
    });
    const response = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify({
        shipment: shipments,
        message: `Tracking code: ${shipment.tracking_code}, Shipping label: ${shipment.postage_label.label_url}`,
      }),
    };
    callback(null, response);
  } catch (e) {
    console.log(`Unable to fulfill Order ${order.id}: `, e.message);
    errorResponse(e, callback);
  }
};
