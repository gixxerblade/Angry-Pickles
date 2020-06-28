// Function to purchase shipping from Easypost
// API doc here => https://www.easypost.com/stripe-relay
// Originally written in Ruby but converted to node
// and https://www.easypost.com/docs/api/node#shipments

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
      message: err.message,
    }),
  };

  if (typeof callback === "function") {
    callback(null, response);
  }
};

module.exports.handler = async (event, context, callback) => {
  // Send over the order id & selected_shipping_method in the event query string from Ship.js
  const id = event.queryStringParameters.id;
  //const requestBody = JSON.parse(event.body);
  //console.log(requestBody)
  // The Stripe Order id is automatically sent to EasyPost as a Shipment reference
  // according to Easypost => https://www.easypost.com/stripe-relay#easypost_stripe_relay-rb-1
  try {
    //Retrieve Stripe order data
    const order = await stripe.orders.retrieve(id);

    //The Stripe Order.id is automatically sent to EasyPost as a Shipment reference
    // According to https://www.easypost.com/stripe-relay
    const shipments = await api.Shipment.retrieve(id);
    //Stripe order should already have a "selected_shipping_method" otherwise default to lowest rate
    let selectedRate;
    order.selected_shipping_method &&
    order.selected_shipping_method.startsWith("rate_")
      ? (selectedRate = await order.selected_shipping_method)
      : (selectedRate = await shipments.lowest_rate(["USPS"]));
    console.log("RATE::: ", selectedRate);
    // Buy this rate
    await shipments.buy(selectedRate);
    await shipments.convertLabelFormat("PDF");
    console.log("TRACKER URL::: ", shipments.tracker.public_url);
    //Update the Stripe order status and tracking information
    await stripe.orders.update(id, {
      status: "fulfilled",
      metadata: {
        shipping_id: shipments.id,
        shipping_tracking_code: shipments.tracking_code,
        shipping_public_url: shipments.tracker.public_url,
        shipping_postage_label: shipments.postage_label.label_pdf_url,
      },
    });
    const response = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify({
        data: order,
        tracking_code: shipments.tracking_code,
        shipping_label: shipments.postage_label.label_pdf_url,
        message: "Postage successfully purchased",
      }),
    };
    response.ok && callback(null, response);
    return response;
  } catch (e) {
    console.log(`Unable to fulfill Order ${id}: `, e.message);
    errorResponse(e, callback);
  } finally {
    console.log("Completed transaction");
  }
};
