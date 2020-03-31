const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY);

module.exports.handler = async (event, context, callback) => {
  const query = event.queryStringParameters;
  const id = query.id;

  stripe.orders.retrieve(id, (err, order) => {
    let statusCode, body;
    if (err) {
      statusCode = !200;
      body = JSON.stringify({
        error: err.message
      });
    } else {
      statusCode = 200;
      body = JSON.stringify({
        data: order
      });
    }
    const response = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      queryStringParameters: { id: id },
      statusCode,
      body
    };
    console.log("Order Data: ", order);
    console.log("ID: ", id);
    console.log("Error: ", err);
    callback(null, response);
  });
};
