
const stripe = require('stripe')(process.env.GATSBY_STRIPE_SECRET_KEY)

module.exports.handler = async (event, context, callback) => {
  const query = event.queryStringParameters;
  const id = query.id;
  stripe.orders.retrieve(id, (err, order) => {
    let statusCode, body;

    if (err) {
      statusCode = 500;
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
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      statusCode,
      body
    };
    callback(null, response);
  });
};
