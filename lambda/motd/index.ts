const got = require('got');

exports.handler = async function(event, context) {
  console.log(event, context);
  const { data } = await got.get('https://quotes.rest/quote/random')
  console.log(data);
  return data;
}
