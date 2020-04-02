const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY);

/*
 * Retrieve an order by order id.
 */
module.exports.handler = async (event, context, callback) => {
  const query = event.queryStringParameters.id;
  /*   
const id = query.id;
 */
  return stripe.orders.retrieve(`${query}`, (err, order) => {
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
      statusCode,
      body
    };
    console.log("Type ID: ", typeof query);
    console.log("ID: ", `${query}`);
    console.log(
      "event.queryStringParameters.id: ",
      event.queryStringParameters.id
    );
    console.log("Error: ", err);
     callback(null, response);
  });
};
