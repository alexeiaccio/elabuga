const writeSheet = require('./googleSheet')

exports.handler = async event => {
  const newValues = [
    new Date().toISOString(),
    event.queryStringParameters.name,
    event.queryStringParameters.email,
    event.queryStringParameters.msg,
  ]

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Write!',
      input: event,
    }),
  }

  writeSheet('Income!A:D', newValues)
  return response
}
