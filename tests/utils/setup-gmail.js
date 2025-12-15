#!/usr/bin/env node

/**
 * Gmail OAuth Setup Script
 * Run this once to generate gmail-token.json
 * Usage: node tests/utils/setup-gmail.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const open = require('open');
const http = require('http');
const url = require('url');

const CREDENTIALS_PATH = path.join(__dirname, '../../gmail-credentials.json');
const TOKEN_PATH = path.join(__dirname, '../../gmail-token.json');

async function authenticate() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`❌ Missing: ${CREDENTIALS_PATH}`);
    console.error('Follow the steps in GMAIL_SETUP.md first');
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_id, client_secret, redirect_uris } = credentials.installed;

  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Generate auth URL
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly']
  });

  console.log('\n📱 Opening browser for Gmail authorization...\n');
  await open(authUrl);

  // Start local server to catch callback
  const server = http.createServer(async (req, res) => {
    const queryUrl = url.parse(req.url, true);
    const code = queryUrl.query.code;

    if (code) {
      try {
        const { tokens } = await oauth2Client.getToken(code);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <h1>✅ Success!</h1>
          <p>Gmail authorization complete. You can close this window.</p>
          <p>Your access token has been saved to: <strong>gmail-token.json</strong></p>
        `);

        console.log('✅ Gmail token saved to: gmail-token.json');
        console.log('✅ You can now run your tests!\n');

        server.close();
        process.exit(0);
      } catch (error) {
        console.error('❌ Error:', error.message);
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<h1>❌ Error</h1><p>${error.message}</p>`);
        server.close();
        process.exit(1);
      }
    } else {
      res.writeHead(400);
      res.end('No authorization code');
      server.close();
      process.exit(1);
    }
  });

  server.listen(3000, () => {
    console.log('⏳ Waiting for authorization...');
    console.log('📌 If browser doesn\'t open, visit: http://localhost:3000');
  });
}

authenticate().catch(error => {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
});
