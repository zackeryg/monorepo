const got = require('got');

exports.handler = async function(event, context) {
  console.log(event, context);
  const data = await got.get('https://programming-quotes-api.herokuapp.com/Quotes/random')
  console.log(data);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: data.body
  };
}
