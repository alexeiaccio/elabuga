/* eslint-disable */
const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const TOKEN_PATH = 'token.json'
const SHEET_ID = process.env.SHEET_ID

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', code => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), error => {
        if (error) console.error(error)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

function authorize(callback) {
  const { CLIENT_SECRET, CLIENT_ID, REDIRECT_URIS } = process.env
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URIS
  )

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

function writeToRange(auth, range, values) {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: SHEET_ID,
      range,
      includeValuesInResponse: true,
      insertDataOption: 'INSERT_ROWS',
      valueInputOption: 'USER_ENTERED',
      responseDateTimeRenderOption: 'FORMATTED_STRING',
      responseValueRenderOption: 'FORMATTED_VALUE',
      resource: {
        values,
      },
    },
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result.data)
      }
    }
  )
}

const writeSheet = (range, values) =>
  authorize(auth => writeToRange(auth, range, values))

exports.handler = async event => {
  const newValues = [
    [
      new Date().toISOString(),
      event.queryStringParameters.name,
      event.queryStringParameters.email,
      event.queryStringParameters.msg,
    ],
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
