const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY);

const errorResponse = (err, callback) => {
  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    statusCode: 500,
    body: JSON.stringify({
      error: err
    })
  };

  if (typeof callback === "function") {
    callback(null, response);
  }
};

/*
 * Retrieve an order by order id.
 */
module.exports.handler = async (event, context, callback) => {
  const query = event.queryStringParameters.id;
  try {
    const order = await stripe.orders
      .retrieve(query)
      .catch(e => console.log(e));
    const response = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      statusCode: 200,
      body: JSON.stringify({
        data: order,
        message: "Order placed successfully!"
      })
    };
    console.log("Type ID: ", typeof query);
    console.log("ID: ", `${query}`);
    return response;
  } catch (e) {
    errorResponse(e, callback);
  }
};
