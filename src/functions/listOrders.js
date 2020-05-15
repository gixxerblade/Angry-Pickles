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
  const { identity, user } = context.clientContext;
  if (!user) {
    return callback(null, { statusCode: 401, body: "Unauthorized" });
  }
  try {
    const order = await stripe.orders
      .list({ status: "paid", limit: 100 })
      .catch((e) => console.log(e));
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "List of paid items",
        data: order,
      }),
    };

    return response;
  } catch (e) {
    errorResponse(e, callback);
  }
};
