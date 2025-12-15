// Gmail API Helper for Email Confirmation
// Setup: https://console.cloud.google.com/
// 1. Create a project, enable Gmail API
// 2. Create OAuth 2.0 Desktop credentials
// 3. Download JSON and save as gmail-credentials.json in project root
// 4. Run: node tests/utils/setup-gmail.js (to generate token)

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, '../../gmail-credentials.json');
const TOKEN_PATH = path.join(__dirname, '../../gmail-token.json');

let auth = null;

/**
 * Authenticate with Gmail API
 */
async function authenticate() {
  if (auth) return auth;

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(`❌ Gmail credentials not found: ${CREDENTIALS_PATH}\nRun: node tests/utils/setup-gmail.js`);
  }

  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_id, client_secret, redirect_uris } = credentials.installed;

  auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    auth.setCredentials(token);
  } else {
    throw new Error(`❌ Gmail token not found: ${TOKEN_PATH}\nRun: node tests/utils/setup-gmail.js`);
  }

  return auth;
}

/**
 * Fetch confirmation link from Gmail
 * @param {string} recipientEmail - Email address to search for
 * @param {number} timeout - Max wait time in milliseconds (default 30s)
 * @returns {Promise<string>} - Confirmation URL
 */
async function getConfirmationLink(recipientEmail, timeout = 30000) {
  const startTime = Date.now();
  const gmail = google.gmail({ version: 'v1', auth: await authenticate() });

  while (Date.now() - startTime < timeout) {
    try {
      // Search for emails from noreply (Mastodon confirmation emails)
      const response = await gmail.users.messages.list({
        userId: 'me',
        q: `from:noreply subject:confirm`,
        maxResults: 10
      });

      if (!response.data.messages || response.data.messages.length === 0) {
        console.log('📧 Waiting for confirmation email...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        continue;
      }

      // Get full message content
      for (const message of response.data.messages) {
        const fullMessage = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full'
        });

        const headers = fullMessage.data.payload.headers;
        const subjectHeader = headers.find(h => h.name === 'Subject');
        const subject = subjectHeader ? subjectHeader.value : '';

        // Check if this is a confirmation email
        if (!/confirm|verification|verify/i.test(subject)) continue;

        // Extract body (handle multipart messages)
        let bodyData = '';
        if (fullMessage.data.payload.parts) {
          const htmlPart = fullMessage.data.payload.parts.find(p => p.mimeType === 'text/html');
          if (htmlPart && htmlPart.body.data) {
            bodyData = Buffer.from(htmlPart.body.data, 'base64').toString();
          }
        } else if (fullMessage.data.payload.body.data) {
          bodyData = Buffer.from(fullMessage.data.payload.body.data, 'base64').toString();
        }

        if (!bodyData) continue;

        // Extract confirmation link
        const patterns = [
          /href=['"]([^'"]*(?:confirm|verify)[^'"]*)['"]/i,
          /(https?:\/\/[^\s<>'"]+(?:confirm|verify)[^\s<>'"]*)/i,
          /href=['"]([^'"]*)['"]/i
        ];

        let link = null;
        for (const pattern of patterns) {
          const match = bodyData.match(pattern);
          if (match?.[1]) {
            link = match[1];
            if (/confirm|verify/i.test(link)) break; // Prefer matching links
          }
        }

        if (link) {
          link = decodeURIComponent(link);
          console.log(`✅ Found confirmation link from: ${subject}`);
          console.log(`🔗 Link: ${link}`);
          return link;
        }
      }

      console.log('📧 No confirmation link found yet, waiting...');
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error('❌ Gmail API error:', error.message);
      throw error;
    }
  }

  throw new Error(`Confirmation email not received within ${timeout}ms`);
}

module.exports = {
  authenticate,
  getConfirmationLink
};
