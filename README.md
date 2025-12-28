# Mastodon E2E Test Suite - Portfolio Project

A comprehensive end-to-end (E2E) test automation suite for the Mastodon social media platform using Playwright and JavaScript. This project demonstrates professional test automation practices including Page Object Model, test organization, and CI/CD integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Test Coverage](#test-coverage)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Page Object Models](#page-object-models)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This test suite automates critical user workflows on Mastodon.social including:
- User authentication (login, registration, logout)
- Content creation (toots, mentions, content warnings)
- Content interaction (likes, reposts, bookmarks)
- Search functionality (by username, hashtag, domain)
- Content management (edit, delete operations)

**Tech Stack:**
- Playwright 1.57.0 - Modern E2E testing framework
- JavaScript/Node.js - Test implementation
- dotenv - Environment variable management
- HTML Reporter - Visual test results

## 📊 Test Coverage

### Authentication Tests (7 tests)
| Test Case | Description | Status |
|-----------|-------------|--------|
| 1.1.1 | Successful login with email | Automated |
| 1.1.2 | Login with invalid email | Automated |
| 1.1.3 | Login with incorrect password | Automated |
| 1.1.4 | Login with empty credentials | Automated |
| 1.2.1 | Successful user registration | Automated |
| 1.2.2 | Email already exists error | Automated |
| 1.3.1 | Logout functionality | Automated |

### Content Creation Tests (7 tests)
| Test Case | Description | Status |
|-----------|-------------|--------|
| 2.1.1 | Create text toot | Automated |
| 2.1.5 | Create toot with mentions | Automated |
| 2.1.6 | Create toot with content warning | Automated |
| 2.1.9 | Empty toot error handling | Automated |
| 2.1.10 | 500 character limit validation | Automated |
| 2.2.1 | Edit toot successfully | Automated |
| 2.3.1 | Delete own toot | Automated |

### Search Tests (6 tests)
| Test Case | Description | Status |
|-----------|-------------|--------|
| 5.1.1 | Search by username | Automated |
| 5.1.2 | Search by hashtag | Automated |
| 5.1.3 | Search by URL/domain | Automated |
| 5.1.4 | Search results tabs | Automated |
| 5.1.5 | No results handling | Automated |
| 5.1.6 | Search history | Automated |

### Interaction Tests (7 tests)
| Test Case | Description | Status |
|-----------|-------------|--------|
| 3.1.1 | Like a toot | Automated |
| 3.1.2 | Unlike a toot | Automated |
| 3.2.1 | Repost a toot | Automated |
| 3.2.2 | Remove repost | Automated |
| 3.3.1 | Bookmark a toot | Automated |
| 3.4.1 | Reply to toot | Automated |

**Total: 27+ automated test cases**

## 📁 Project Structure

```
Portfolio-PlayWright2/
├── tests/
│   ├── UserLoginTests.spec.js           # Authentication tests
│   ├── UserRegistrationTests.spec.js    # Registration tests
│   ├── CreateTootTests.spec.js          # Content creation tests
│   ├── LikeFunctionTootTests.spec.js    # Interaction tests
│   └── SearchFunctionTests.spec.js      # Search functionality tests
├── pages/
│   ├── LoginPage.js                     # Login page object model
│   ├── HomePage.js                      # Home timeline page object
│   └── SearchPage.js                    # Search page object model
├── utils/
│   └── testHelpers.js                   # Reusable helper functions
├── playwright.config.js                 # Playwright configuration
├── auth.json                            # Stored authentication state
├── .env.example                         # Environment variables template
├── package.json                         # Dependencies and scripts
└── README.md                            # This file
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Git
- Mastodon.social account (for testing)

### Step 1: Clone Repository
```bash
git clone https://github.com/simonslavik/Portfolio-PlayWright2.git
cd Portfolio-PlayWright2
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then edit `.env` with your Mastodon credentials:

```env
EXISTING_EMAIL=your-email@example.com
VALID_PASSWORD=YourPassword123!
VALID_USERNAME=your-username
```

**⚠️ Important:** Never commit `.env` to version control!

## 🏃 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode (see browser)
```bash
npm run test:headed
```

### Run Specific Test Suites
```bash
npm run test:auth          # Authentication tests
npm run test:content       # Content creation tests
npm run test:search        # Search functionality tests
npm run test:interactions  # Like/interaction tests
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests in UI Mode
```bash
npm run test:ui
```

### View Test Report
```bash
npm run test:report
```

## 📄 Page Object Models

This project uses the Page Object Model pattern for maintainability:

### LoginPage
```javascript
const loginPage = new LoginPage(page);
await loginPage.login(email, password);
```

### HomePage
```javascript
const homePage = new HomePage(page);
await homePage.createToot('Hello World!');
```

### SearchPage
```javascript
const searchPage = new SearchPage(page);
await searchPage.searchUsername('username');
```

## 🎓 Best Practices Implemented

✅ **Page Object Model** - Separates test logic from UI interaction
✅ **Helper Functions** - Reusable utilities for common actions
✅ **Test Organization** - Logical grouping by feature
✅ **Environment Management** - Secure credential handling
✅ **Error Handling** - Graceful handling of missing elements
✅ **Wait Strategies** - Proper network and DOM waits
✅ **CI/CD Ready** - GitHub Actions integration

## 🔧 Troubleshooting

### Login fails with "Invalid credentials"
- Verify credentials in `.env` file
- Ensure account is verified on Mastodon
- Check for account lockout

### Element not found errors
- Run tests in headed mode: `npm run test:headed`
- Increase timeout in playwright.config.js
- Check if element is behind overlay

### Tests pass locally but fail in CI
- Ensure `.env` is configured in CI/CD environment
- Check auth state is properly saved/loaded
- Review parallel execution timing

## 📚 Resources

- [Playwright Docs](https://playwright.dev)
- [Mastodon API](https://docs.joinmastodon.org/)
- [Test Cases](./TEST_CASES.md)

## 📄 License

ISC - See package.json

---

**Last Updated:** December 2024
**Test Coverage:** 27+ automated test cases
**Author:** Simon Slavik
