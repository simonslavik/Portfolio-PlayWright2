# Gmail API Setup for Email Confirmation Testing

This guide helps you set up Gmail API for automated email verification in your Playwright tests.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a Project** → **New Project**
3. Name: `Playwright Testing` (or your choice)
4. Click **Create**

## Step 2: Enable Gmail API

1. In Google Cloud Console, search for **Gmail API**
2. Click **Gmail API** → **Enable**
3. Wait for it to enable (may take a few seconds)

## Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials** (left sidebar)
2. Click **+ Create Credentials** → **OAuth client ID**
3. Choose **Application type**: Desktop application
4. Click **Create**
5. A dialog shows your credentials. Click **Download JSON** (or the download icon)
6. Save the file as `gmail-credentials.json` in your project root:
   ```
   /Users/simonslavik/Desktop/PortfolioProject-PlayWright2/gmail-credentials.json
   ```

## Step 4: Generate Access Token

Run this command to generate an access token:

```bash
node tests/utils/setup-gmail.js
```

This will:

1. Open your browser
2. Ask you to sign in with your Gmail account
3. Ask for permission to access Gmail
4. Generate a `gmail-token.json` file automatically

**Important**: Use the Gmail account where you receive Mastodon confirmation emails (simonslavik007@gmail.com)

## Step 5: Verify Setup

Check that these files exist in your project root:

- ✅ `gmail-credentials.json`
- ✅ `gmail-token.json`

## Step 6: Add to .gitignore

Make sure these files are NOT committed to Git:

```bash
echo "gmail-credentials.json" >> .gitignore
echo "gmail-token.json" >> .gitignore
```

## Done!

Your Playwright tests can now automatically:

1. Search Gmail for confirmation emails
2. Extract confirmation links
3. Navigate to them and complete verification

All fully automated! 🎉
