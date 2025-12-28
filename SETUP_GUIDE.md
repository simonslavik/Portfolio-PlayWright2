# Quick Start Guide - Portfolio Project

## 🚀 5-Minute Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Credentials

```bash
cp .env.example .env
# Edit .env with your Mastodon test account credentials
```

### 3. Run Tests

```bash
npm test
```

### View Report

```bash
npm run test:report
```

---

## 🎯 Common Commands

```bash
# Run all tests
npm test

# See browser while running
npm run test:headed

# Interactive debugging
npm run test:debug

# Modern UI test runner
npm run test:ui

# View last report
npm run test:report

# Run specific test suite
npm run test:auth          # Authentication
npm run test:content       # Content creation
npm run test:search        # Search functionality
npm run test:interactions  # Like/interactions
```

---

## 🔑 Environment Setup

Create `.env` file with:

```env
EXISTING_EMAIL=your-test-email@mastodon.social
VALID_PASSWORD=your-password
VALID_USERNAME=your-username
```

**Security Notes:**

- Never commit `.env` to Git
- Use a separate test account
- Regenerate credentials periodically

---

## 📊 Test Statistics

**Total Tests:** 28+

- Authentication: 7 tests
- Content Creation: 7 tests
- Search: 6 tests
- Interactions: 7+ tests

---

## Verify Installation

```bash
# Check tests are recognized
npx playwright test --list

# Should show: "Total: 28 tests in 5 files"
```

---

## 🐛 Troubleshooting

**Tests fail with "Invalid credentials"**

- Check `.env` file has correct values
- Verify account isn't locked
- Ensure email is verified on Mastodon

**Element not found errors**

- Run: `npm run test:headed`
- Increase timeout in `playwright.config.js`
- Check Mastodon.social status

**Need help?**

- Read: `README.md` (comprehensive guide)
- Check: `PORTFOLIO_IMPROVEMENTS.md` (what's new)
- Review: `TEST_CASES.md` (test specifications)

---

## 📚 File Structure

```
Portfolio-PlayWright2/
├── tests/                  # Test files (5 suites)
├── pages/                  # Page Object Models
├── utils/                  # Helper functions
├── .github/workflows/      # CI/CD (GitHub Actions)
├── README.md              # Full documentation
├── PORTFOLIO_IMPROVEMENTS.md # What's new
└── SETUP_GUIDE.md        # This file
```

---

## 🎓 Next Steps

1. Run tests locally: `npm test`
2. View reports: `npm run test:report`
3. Try debug mode: `npm run test:debug`
4. Review code: Check `pages/` for POM pattern
5. Customize: Add new tests using existing patterns

---

**Questions?** Check README.md for detailed documentation.
