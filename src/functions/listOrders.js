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

/*
 * List all orders paid but not fulfilled.
 */
module.exports.handler = async (event, context, callback) => {
  // const query = event.queryStringParameters.id;
  try {
    const order = await stripe.orders
      .list({ status: "paid", limit: 100 })
      .catch((e) => console.log(e));
    const response = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify({
        data: order,
        message: "List of paid items",
      }),
    };
    // console.log("response: ", response);

    return response;
  } catch (e) {
    errorResponse(e, callback);
  }
};
