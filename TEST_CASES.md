# Mastodon (mastodon.social) - E2E Test Cases Documentation

## Project Overview

Comprehensive end-to-end test suite for Mastodon (mastodon.social), a federated open-source social network. Tests cover user authentication, post (toot) management, interactions, user relationships, and content discovery.

---

## 1. USER REGISTRATION TESTS

### Test File: `UserRegistrationTests.spec.js`

#### Test 1.1: Successful User Registration - Form Submission

- **Test ID:** `Successful User Registration - Form Submission`
- **Description:** User can register with valid credentials on Mastodon
- **Steps:**
  1. Navigate to mastodon.social registration page (`/auth/sign_up`)
  2. Accept Rules by clicking "Accept" link
  3. Fill in Username (unique, 1-30 characters)
  4. Fill in E-mail address
  5. Fill in Password (minimum 8 characters)
  6. Confirm password
  7. Select Date of Birth (Year, Month, Day)
  8. Check "I have read and agree to the terms of service and privacy policy"
  9. Click "Sign up" button
- **Expected Result:**
  - Registration form submitted successfully
  - Success message: "Check your inbox"
  - Confirmation email sent to provided email address
- **Status:** IMPLEMENTED

#### Test 1.2: Email Already Exists - Error Message

- **Test ID:** `Email Already Exists - Error Message`
- **Description:** User cannot register with existing email
- **Steps:**
  1. Navigate to mastodon.social registration page
  2. Accept Rules
  3. Fill in form with existing email address
  4. Click "Sign up"
- **Expected Result:** Error message: "Email has already been taken"
- **Status:** IMPLEMENTED

#### Test 1.3: Invalid Email Format - Error Message

- **Test ID:** `Invalid Email Format - Error Message`
- **Description:** System rejects invalid email format
- **Steps:**
  1. Navigate to mastodon.social registration
  2. Accept Rules
  3. Enter invalid email (e.g., "invalid-email-format")
  4. Fill other required fields
  5. Click "Sign up"
- **Expected Result:** Error message for invalid email format
- **Status:** IMPLEMENTED

#### Test 1.4: Weak Password - Error Message

- **Test ID:** `Weak Password - Error Message`
- **Description:** System enforces password strength requirements
- **Steps:**
  1. Navigate to registration page
  2. Accept Rules
  3. Enter weak password (less than 8 characters, e.g., "pass")
  4. Try to submit form
- **Expected Result:** Error message indicating password is too weak/short
- **Status:** IMPLEMENTED

#### Test 1.5: Invalid Username Length - Error Message

- **Test ID:** `Invalid Username Length - Error Message`
- **Description:** Username must be between 1-30 characters
- **Steps:**
  1. Navigate to registration page
  2. Accept Rules
  3. Enter username > 30 characters
  4. Try to submit form
- **Expected Result:** Error message: "Username is too long"
- **Status:** IMPLEMENTED

#### Test 1.6: Missing Terms Agreement - Button Disabled

- **Test ID:** `Missing Terms Agreement - Button Disabled`
- **Description:** User must agree to terms and privacy policy
- **Steps:**
  1. Fill email, username, password, and DOB correctly
  2. Leave "I have read and agree to the terms" checkbox unchecked
  3. Attempt to click "Sign up" button
- **Expected Result:** Sign up button is disabled or shows error
- **Status:** IMPLEMENTED

---

## 2. USER LOGIN TESTS

### Test File: `UserLoginTests.spec.js`

#### Test 2.1: Successful Login - with Email

- **Test ID:** `Successful Login - with Email`
- **Description:** User logs in with correct email credentials on Mastodon
- **Steps:**
  1. Navigate to mastodon.social login page (`/auth/sign_in`)
  2. Enter valid email address
  3. Enter correct password
  4. Click "Log in" button
- **Expected Result:**
  - Login successful
  - Redirected to home timeline
  - User profile visible in sidebar
- **Status:** IMPLEMENTED

#### Test 2.2: Login - Invalid Email

- **Test ID:** `Login - Invalid Email`
- **Description:** Login fails with non-existent email
- **Steps:**
  1. Navigate to login page
  2. Enter non-existent email (e.g., nonexistent@test.com)
  3. Enter any password
  4. Click "Log in"
- **Expected Result:** Error message: "Invalid email address or password"
- **Status:** IMPLEMENTED

#### Test 2.3: Login - Incorrect Password

- **Test ID:** `Login - Incorrect Password`
- **Description:** Login fails with wrong password
- **Steps:**
  1. Navigate to login page
  2. Enter correct email
  3. Enter incorrect password
  4. Click "Log in"
- **Expected Result:** Error message: "Invalid email address or password"
- **Status:** IMPLEMENTED

#### Test 2.4: Login - Empty Credentials

- **Test ID:** `Login - Empty Credentials`
- **Description:** Cannot submit empty login form
- **Steps:**
  1. Navigate to login page
  2. Leave email and password empty
  3. Click "Log in"
- **Expected Result:** Error message displayed (email/password required)
- **Status:** IMPLEMENTED

#### Test 2.5: Logout Functionality

- **Test ID:** `Logout Functionality`
- **Description:** User can log out successfully
- **Steps:**
  1. Login as user with valid credentials
  2. Click account menu (profile icon in sidebar)
  3. Click "Log out"
  4. Confirm logout if prompted
- **Expected Result:**
  - User logged out
  - Redirected to login page or home page
  - Session cleared
- **Status:** IMPLEMENTED

---

## 3. CREATE TOOT TESTS

### Test File: `CreateTootTests.spec.js`

#### Test 3.1: Create Text Toot Successfully

- **Test ID:** `2.1.1: Create Text Toot Successfully`
- **Description:** User can create a simple text toot (post)
- **Steps:**
  1. Login to Mastodon
  2. Navigate to home timeline
  3. Click compose textbox "What's on your mind?"
  4. Enter text: "This is my first toot! 🎉"
  5. Click "Post" button
- **Expected Result:**
  - Toot created successfully
  - Toot appears in the home timeline
  - Text displays correctly with emoji
- **Status:** IMPLEMENTED

#### Test 3.2: Create Toot with Mentions

- **Test ID:** `2.1.5: Create Toot with Mentions`
- **Description:** User can mention other accounts in a toot
- **Steps:**
  1. Login and navigate to home timeline
  2. Click compose textbox
  3. Type text with mentions: "Great work @mastodon @pixelfed! Love these platforms!"
  4. Click "Post" button
- **Expected Result:**
  - Toot created with mentions
  - Mention links are highlighted and clickable
  - Mentioned users receive notifications
- **Status:** IMPLEMENTED

#### Test 3.3: Create Toot with Content Warning

- **Test ID:** `2.1.6: Create Toot with Content Warning`
- **Description:** User can add content warning (CW) to sensitive content
- **Steps:**
  1. Login and navigate to home timeline
  2. Click compose textbox
  3. Look for and click content warning/spoiler button (if available)
  4. Enter warning text: "Spoilers for movie X"
  5. Enter toot text: "This movie has an amazing twist ending!"
  6. Click "Post" button
- **Expected Result:**
  - Toot created with content warning
  - Warning text displayed
  - Full content hidden by default (users can click to reveal)
- **Status:** IMPLEMENTED

#### Test 3.4: Create Empty Toot - Error Handling

- **Test ID:** `2.1.9: Create Empty Toot - Error Handling`
- **Description:** Cannot post without content
- **Steps:**
  1. Login and navigate to home timeline
  2. Click "Post" button without entering any text
- **Expected Result:** Error message displayed: "Post can't be blank"
- **Status:** IMPLEMENTED

#### Test 3.5: Toot Character Limit - 500 Characters

- **Test ID:** `2.1.10: Toot Character Limit - 500 Characters`
- **Description:** Mastodon enforces 500 character limit per toot
- **Steps:**
  1. Login and navigate to home timeline
  2. Click compose textbox
  3. Enter text exceeding 500 characters (e.g., repeated text)
- **Expected Result:**
  - Character counter displays remaining characters
  - "Post" button becomes disabled when text exceeds 500 characters
  - Cannot submit the post
- **Status:** IMPLEMENTED

#### Test 3.6: Edit Toot Successfully

- **Test ID:** `2.2.1: Edit Toot Successfully`
- **Description:** User can edit their own toot after creation
- **Steps:**
  1. Login and create a test toot: "Hello World - Testing Edit"
  2. Click "..." (More) menu on the toot
  3. Click "Edit" option
  4. Modify text to: "Hello World - Updated!"
  5. Click "Update" button
- **Expected Result:**
  - Toot updated with new text
  - "Edited" indicator appears on toot with timestamp
  - Edit history accessible
- **Status:** IMPLEMENTED

#### Test 3.7: Delete Own Toot Successfully

- **Test ID:** `2.3.1: Delete Own Toot Successfully`
- **Description:** User can delete their own toot
- **Steps:**
  1. Login and create a test toot: "This toot will be deleted - Testing deletion"
  2. Click "..." (More) menu on the toot
  3. Click "Delete" option
  4. Confirm deletion if modal appears
- **Expected Result:**
  - Toot removed from timeline
  - Toot no longer visible in feed
- **Status:** IMPLEMENTED

#### Test 3.8: Delete Toot - Confirmation Required

- **Test ID:** `2.3.2: Delete Toot - Confirmation Required`
- **Description:** Deletion requires user confirmation to prevent accidents
- **Steps:**
  1. Login and create a test toot
  2. Click "..." menu on the toot
  3. Click "Delete" option
  4. Click "Cancel" to abort deletion
- **Expected Result:**
  - Toot remains in timeline after clicking Cancel
  - Toot still visible in feed
- **Status:** IMPLEMENTED

#### Test 3.9: Cannot Delete Other User's Toot

- **Test ID:** `2.3.3: Cannot Delete Other User's Toot`
- **Description:** Users cannot delete toots from other accounts
- **Steps:**
  1. Login as user
  2. Navigate to another user's profile
  3. Try to access more menu ("...") on their toot
- **Expected Result:**
  - More menu not available or delete option not visible
  - Cannot delete other user's content
- **Status:** IMPLEMENTED

---

## 4. LIKE/FAVORITE TOOT TESTS

### Test File: `LikeFunctionTootTests.spec.js`

#### Test 4.1: Favorite and Unfavorite Toot

- **Test ID:** `3.1.1: Favorite and Unfavorite Toot`
- **Description:** User can favorite (like) and unfavorite toots
- **Steps:**
  1. Login to Mastodon
  2. Create a test toot for favoriting
  3. Click heart/star icon to favorite the toot
  4. Verify favorite was registered
  5. Click heart/star icon again to unfavorite
- **Expected Result:**
  - Heart/star icon highlights when favorited
  - Favorite count increases/decreases
  - Toot can be unfavorited by clicking icon again
- **Status:** IMPLEMENTED

#### Test 4.2: View Toot Favorites

- **Test ID:** `3.1.3: View Toot Favorites`
- **Description:** User can view list of people who favorited a toot
- **Steps:**
  1. Login and navigate to home timeline
  2. Find a toot with favorites
  3. Click on the favorite count/link
- **Expected Result:**
  - List of users who favorited the toot is displayed
  - Can view their profiles from favorites list
- **Status:** IMPLEMENTED

---

## 5. SEARCH FUNCTION TESTS

### Test File: `SearchFunctionTests.spec.js`

#### Test 5.1: Search by Username

- **Test ID:** `Test Case 5.1.1: Search by Username`
- **Description:** User can search for other users by username
- **Steps:**
  1. Login to Mastodon
  2. Click search box
  3. Enter a username (e.g., "@mastodon")
  4. View search results
- **Expected Result:**
  - Search results show matching users
  - User profiles displayed with avatar and name
  - Can click on result to view profile
- **Status:** IMPLEMENTED

#### Test 5.2: Search by Hashtag

- **Test ID:** `Test Case 5.1.2: Search by Hashtag`
- **Description:** User can search for content by hashtag
- **Steps:**
  1. Login to Mastodon
  2. Click search box
  3. Enter a hashtag (e.g., "#mastodon")
  4. View search results
- **Expected Result:**
  - Search results show posts with the hashtag
  - Hashtag timeline displayed
  - Can follow hashtag from results
- **Status:** IMPLEMENTED

#### Test 5.3: Search by URL/Domain

- **Test ID:** `Test Case 5.1.3: Search by URL/Domain`
- **Description:** User can search by URL or domain
- **Steps:**
  1. Login to Mastodon
  2. Click search box
  3. Enter a URL (e.g., "example.com")
  4. View search results
- **Expected Result:**
  - Search results show posts from that domain
  - Results are properly filtered
- **Status:** IMPLEMENTED

#### Test 5.4: Search Results - Tabs (Posts, People, Hashtags)

- **Test ID:** `Test Case 5.1.4: Search Results - Tabs (Posts, People, Hashtags)`
- **Description:** Search results are organized in tabs by content type
- **Steps:**
  1. Login and perform a search
  2. Observe tabs: "Posts", "People", "Hashtags"
  3. Click on each tab to filter results
- **Expected Result:**
  - Results are categorized by type
  - Each tab shows relevant results
  - Can switch between tabs
- **Status:** IMPLEMENTED

#### Test 5.5: Search - No Results

- **Test ID:** `Test Case 5.1.5: Search - No Results`
- **Description:** System handles searches with no matching results
- **Steps:**
  1. Login to Mastodon
  2. Search for non-existent or very unique query
  3. Observe results
- **Expected Result:**
  - "No results" message displayed
  - User can modify search query
- **Status:** IMPLEMENTED

#### Test 5.6: Search History

- **Test ID:** `Test Case 5.1.6: Search History`
- **Description:** Previous searches are saved in search history
- **Steps:**
  1. Login and perform several searches
  2. Click on search box without typing
  3. View search history suggestions
- **Expected Result:**
  - Previous searches shown in dropdown
  - Can quickly re-run previous searches
  - History can be cleared
- **Status:** IMPLEMENTED

---

## Test Execution Summary

### Test File Organization

| Test File                       | Test Suite              | Test Count   | Status             |
| ------------------------------- | ----------------------- | ------------ | ------------------ |
| `UserRegistrationTests.spec.js` | User Registration Tests | 6            | ✅ Passing         |
| `UserLoginTests.spec.js`        | User Login Tests        | 5            | ✅ Passing         |
| `CreateTootTests.spec.js`       | Create Toot Tests       | 9            | ✅ Passing         |
| `LikeFunctionTootTests.spec.js` | Like/Unlike Toot Tests  | 2            | ✅ Passing         |
| `SearchFunctionTests.spec.js`   | Search Function Tests   | 6            | ✅ Passing         |
| **TOTAL**                       | **5 Test Suites**       | **28 Tests** | **✅ All Passing** |

### Running Tests

**Run all tests:**

```bash
npx playwright test
```

**Run specific test file:**

```bash
npx playwright test tests/CreateTootTests.spec.js
```

**Run with UI mode:**

```bash
npx playwright test --ui
```

**View test report:**

```bash
npx playwright show-report
```

### Configuration

- **Browser:** Chromium
- **Test Timeout:** 60 seconds per test
- **Workers:** 1 (sequential execution)
- **Parallelization:** Disabled to avoid conflicts between test suites
- **Retries:** 0 (local), 2 (CI only)

---

## Notes

- Tests use real Mastodon.social instance for end-to-end testing
- Authentication state is saved between tests using `auth.json`
- Test data is generated dynamically (usernames, emails with timestamps)
- Sequential execution ensures no state conflicts between test suites
  - Toot privacy updated
  - Privacy icon changes
  - Visibility appropriately restricted

#### Test Case 2.2.3: Edit Toot - Add Image

- **Description:** User can add image to existing text toot
- **Steps:**
  1. Click "..." on text toot
  2. Click "Edit"
  3. Upload an image
  4. Click "Save changes"
- **Expected Result:**
  - Toot now displays with image
  - Toot updated successfully

#### Test Case 2.2.4: Cannot Edit Other User's Toot

- **Description:** User cannot edit toots from other users
- **Steps:**
  1. View another user's toot
  2. Look for edit button
- **Expected Result:** No edit option visible (only own toots show "...")

#### Test Case 2.2.5: Edit Toot - Validation

- **Description:** Edit toot validation (empty text)
- **Steps:**
  1. Click "Edit"
  2. Clear all text
  3. Try to save
- **Expected Result:** Error: "Toot can't be blank"

---

### 2.3 Delete Toot Tests

#### Test Case 2.3.1: Delete Own Toot Successfully

- **Description:** User can delete their own toot
- **Steps:**
  1. Click "..." menu on own toot
  2. Click "Delete"
  3. Confirm deletion
- **Expected Result:**
  - Toot removed from timeline
  - Toot removed from profile
  - Success message shown

#### Test Case 2.3.2: Delete Toot - Confirmation Required

- **Description:** Confirm action before deletion
- **Steps:**
  1. Click "..."
  2. Click "Delete"
  3. Modal appears asking "Delete toot?"
  4. Click "Cancel"
- **Expected Result:** Toot remains, not deleted

#### Test Case 2.3.3: Cannot Delete Other User's Toot

- **Description:** User cannot delete others' toots
- **Steps:**
  1. View another user's toot
  2. Look for delete option
- **Expected Result:** "..." menu not visible or delete option not shown

#### Test Case 2.3.4: Delete Toot - Removes Associated Data

- **Description:** Deleting toot removes likes, replies, boosts
- **Steps:**
  1. Create toot with 5 replies and 10 favorites
  2. Delete the toot
  3. Check if replies still exist
- **Expected Result:**
  - Toot deleted
  - Replies orphaned or deleted
  - Favorites/boosts removed

---

## 3. FAVORITES & BOOST FUNCTIONALITY

### 3.1 Favorite (Like) Tests

#### Test Case 3.1.1: Favorite a Toot

- **Description:** User can favorite a toot (Mastodon's version of liking)
- **Steps:**
  1. View a toot
  2. Click star icon
- **Expected Result:**
  - Star icon filled/highlighted (yellow)
  - Favorite count incremented by 1
  - Toot author receives notification

#### Test Case 3.1.2: Unfavorite a Toot

- **Description:** User can remove their favorite
- **Steps:**
  1. Click star icon on favorited toot
  2. Click star icon again to unfavorite
- **Expected Result:**
  - Star icon returns to unfilled state
  - Favorite count decremented by 1
  - Notification sent to author

#### Test Case 3.1.3: View Toot Favorites

- **Description:** User can see who favorited a toot
- **Steps:**
  1. Click on favorite count on toot
  2. List opens showing users who favorited
- **Expected Result:**
  - List of accounts that favorited
  - Profile pictures and usernames shown
  - Can click to visit profiles

#### Test Case 3.1.4: Favorite Notification

- **Description:** Toot author receives favorite notification
- **Steps:**
  1. User A favorites User B's toot
  2. Check User B's notifications
- **Expected Result:** Notification: "User A favorited your toot"

#### Test Case 3.1.5: Cannot Favorite Own Toot

- **Description:** User cannot favorite their own toot (validation)
- **Steps:**
  1. View own toot
  2. Look at favorite button
- **Expected Result:** Star button may be disabled or shows "Can't favorite own toot"

### 3.3 Reply Tests

#### Test Case 3.3.1: Reply to Toot

- **Description:** User can reply to a toot
- **Steps:**
  1. Click reply icon on toot
  2. Compose window opens showing original toot
  3. Type: "Great toot!"
  4. Click "Toot!"
- **Expected Result:**
  - Reply created and posted
  - Reply appears under original toot
  - Reply author tagged with original author mention
  - Original author receives reply notification

#### Test Case 3.3.2: Reply with Privacy

- **Description:** Replies inherit privacy but can be adjusted
- **Steps:**
  1. Click reply on followers-only toot
  2. Compose opens
  3. Change privacy to public
  4. Post reply
- **Expected Result:**
  - Reply posted with selected privacy
  - Can reply to private toots only as follower

#### Test Case 3.3.3: View Reply Thread

- **Description:** User can view conversation thread
- **Steps:**
  1. Click "Show thread" or click on toot
- **Expected Result:**
  - Full conversation visible
  - Original toot at top
  - Replies nested in order
  - Can reply in thread context

#### Test Case 3.3.4: Edit Reply

- **Description:** User can edit their own reply
- **Steps:**
  1. Click "..." on own reply
  2. Click "Edit"
  3. Modify text
  4. Click "Save changes"
- **Expected Result:**
  - Reply updated
  - "Edited" label shown

#### Test Case 3.3.5: Delete Reply

- **Description:** User can delete their own reply
- **Steps:**
  1. Click "..." on own reply
  2. Click "Delete"
  3. Confirm
- **Expected Result:**
  - Reply removed from thread
  - Original toot remains

#### Test Case 3.3.6: Empty Reply

- **Description:** Cannot post empty reply
- **Steps:**
  1. Click reply
  2. Leave text blank
  3. Try to post
- **Expected Result:** Error: "Toot can't be blank"

---

## 4. FOLLOW/UNFOLLOW FUNCTIONALITY

### 4.1 Follow Tests

#### Test Case 4.1.1: Follow a User

- **Description:** User can follow another user on Mastodon
- **Steps:**
  1. Navigate to another user's profile
  2. Click "Follow" button
- **Expected Result:**
  - Button changes to "Unfollow"
  - Following count increases
  - Follower count on target user increases
  - Followed user may receive follow notification

#### Test Case 4.1.2: Unfollow a User

- **Description:** User can unfollow another user
- **Steps:**
  1. Click "Unfollow" button on followed user's profile
  2. Confirm unfollow
- **Expected Result:**
  - Button changes back to "Follow"
  - Following count decrements
  - Their toots no longer appear in home feed

#### Test Case 4.1.3: View Followers List

- **Description:** User can see list of followers
- **Steps:**
  1. Click "X followers" on profile header
  2. Modal/page opens with follower list
- **Expected Result:**
  - List of all followers with avatars
  - Usernames and display names shown
  - Can click to visit follower profiles
  - Follow/Unfollow button on each follower

#### Test Case 4.1.4: View Following List

- **Description:** User can see list of accounts they follow
- **Steps:**
  1. Click "Following X" on profile
  2. List opens
- **Expected Result:**
  - List of all followed accounts
  - Can unfollow from list
  - Click to visit profiles

#### Test Case 4.1.5: Cannot Follow Self

- **Description:** User cannot follow their own account
- **Steps:**
  1. View own profile
  2. Look for follow button
- **Expected Result:** No follow button visible or disabled

#### Test Case 4.1.6: Follow Notification

- **Description:** User may receive follow notification
- **Steps:**
  1. User A follows User B
  2. Check User B's notifications (if notifications enabled)
- **Expected Result:** Notification: "User A followed you" (if enabled)

#### Test Case 4.1.7: Request Follow (Private Account)

- **Description:** Following private account requires approval
- **Steps:**
  1. Navigate to private account (if applicable)
  2. Click "Follow"
- **Expected Result:**
  - Button shows "Requested"
  - Account owner can approve/deny
  - Pending follow request in notifications

#### Test Case 4.1.8: Approve/Deny Follow Request

- **Description:** Account owner can approve or deny follow requests
- **Steps:**
  1. Receive follow request notification
  2. Click "Approve" or "Deny"
- **Expected Result:**
  - Request accepted/denied
  3. Follower can/cannot see content

#### Test Case 4.1.9: Mute User

- **Description:** User can mute another user
- **Steps:**
  1. Click "..." on user's profile or toot
  2. Select "Mute @username"
  3. Confirm (choose mute duration if applicable)
- **Expected Result:**
  - User's toots hidden from feed
  - Can unmute later in settings
  - Still following but no content shown

#### Test Case 4.1.10: Block User

- **Description:** User can block another user
- **Steps:**
  1. Click "..." on user's profile
  2. Click "Block @username"
  3. Confirm
- **Expected Result:**
  - User blocked
  - Cannot see their toots
  - Cannot interact with blocked user's content
  - Button shows "Unblock"
  - Can unblock anytime

---

## 5. SEARCH & TIMELINE FILTERING

### 5.1 Search Functionality

#### Test Case 5.1.1: Search by Username

- **Description:** User can search for other users/accounts
- **Steps:**
  1. Click search bar at top
  2. Type: "@john" or just "john"
  3. View search results
- **Expected Result:**
  - List of accounts matching "john"
  - Avatars, display names, usernames, follower counts shown
  - Can click to visit profile

#### Test Case 5.1.2: Search by Hashtag

- **Description:** User can search for toots by hashtag
- **Steps:**
  1. Click search bar
  2. Type: "#photography"
  3. View results
- **Expected Result:**
  - All toots with #photography tag shown
  - Results sorted by recent/trending
  - Hashtag timeline shows all uses

#### Test Case 5.1.3: Search by URL/Domain

- **Description:** User can search for toots from specific instances/domains
- **Steps:**
  1. Click search bar
  2. Type: "domain.com" or URL
- **Expected Result:**
  - Toots from that domain/instance displayed
  - Can view federation information

#### Test Case 5.1.4: Search Results - Tabs

- **Description:** Search results have multiple tabs
- **Steps:**
  1. Perform search
  2. View tabs: "Posts", "People", "Hashtags"
- **Expected Result:**
  - Posts tab shows matching toots
  - People tab shows matching accounts
  - Hashtags tab shows matching tags

#### Test Case 5.1.5: Search - No Results

- **Description:** Handle search with no matches
- **Steps:**
  1. Search for: "xyzabc123nonexistent"
- **Expected Result:** Message: "No results found"

#### Test Case 5.1.6: Search History

- **Description:** App saves recent searches
- **Steps:**
  1. Click search bar
  2. View recent searches (if available)
- **Expected Result:**
  - Recent searches listed
  - Can click to re-search
  - Can clear history

#### Test Case 5.1.7: Trending Hashtags

- **Description:** User can see trending hashtags
- **Steps:**
  1. Navigate to Explore/Discover page
  2. View trending section
- **Expected Result:**
  - Top trending hashtags shown
  - With toot count for each
  - Can click to view posts with tag
  - Trends may be local to instance

#### Test Case 5.1.8: Hashtag Subscription

- **Description:** User can follow hashtags
- **Steps:**
  1. Click on a hashtag
  2. Click "Subscribe" or "Follow hashtag"
- **Expected Result:**
  - Hashtag followed
  - Toots with tag appear in timeline
  - Can unsubscribe anytime

### 5.2 Timeline Filtering Tests

#### Test Case 5.2.1: Home Timeline (Default)

- **Description:** Home timeline shows toots from followed accounts
- **Steps:**
  1. View home timeline
  2. Verify content is from followed accounts
- **Expected Result:**
  - Toots from followed accounts displayed
  - Sorted by newest first

#### Test Case 5.2.2: Local Timeline

- **Description:** View toots from local instance only
- **Steps:**
  1. Navigate to Local timeline
- **Expected Result:**
  - Public toots from mastodon.social users only
  - Federated content not shown
  - Shows instance-specific activity

#### Test Case 5.2.3: Federated Timeline

- **Description:** View all public toots from federated instances
- **Steps:**
  1. Navigate to Federated timeline
- **Expected Result:**
  - Public toots from all connected instances
  - Includes content from other Mastodon servers
  - Much higher volume of content

#### Test Case 5.2.4: Filter Reblogs

- **Description:** Option to hide boosts/reblogs in feed
- **Steps:**
  1. Click filter/settings on timeline
  2. Toggle "Show reblogs"
- **Expected Result:**
  - Reblogs hidden/shown based on setting
  - Only original toots displayed (if disabled)

#### Test Case 5.2.5: Filter Replies

- **Description:** Option to hide replies in feed
- **Steps:**
  1. Click timeline settings
  2. Toggle "Show replies"
- **Expected Result:**
  - Replies hidden or shown
  - Setting persists

#### Test Case 5.2.6: Mute Conversations

- **Description:** User can mute specific conversation threads
- **Steps:**
  1. Click "..." on toot
  2. Select "Mute conversation"
- **Expected Result:**
  - Conversation muted
  - No more notifications from thread
  - Can unmute if needed

#### Test Case 5.2.7: Bookmark Toot

- **Description:** User can bookmark toots for later
- **Steps:**
  1. Click bookmark icon on toot
- **Expected Result:**
  - Toot bookmarked
  - Icon fills/changes
  - Toot appears in bookmarks collection

#### Test Case 5.2.8: View Bookmarks

- **Description:** User can view all bookmarked toots
- **Steps:**
  1. Navigate to profile → Bookmarks
  2. View collection
- **Expected Result:**
  - All bookmarked toots displayed
  - Can sort/filter
  - Can unbookmark from here

#### Test Case 5.2.9: Timeline Refresh

- **Description:** User can refresh timeline manually
- **Steps:**
  1. Click refresh icon (arrow icon)
  2. Or press keyboard shortcut (if available)
- **Expected Result:**
  - Timeline reloads
  - New content appears at top

#### Test Case 5.2.10: Pin Toot

- **Description:** User can pin toot to profile
- **Steps:**
  1. Click "..." on own toot
  2. Click "Pin on profile"
- **Expected Result:**
  - Toot pinned to top of profile
  - Shows "Pinned toot" label
  - Max 5 pinned toots typically

---

## 6. CROSS-CUTTING TEST CASES

### 6.1 Notification Tests

#### Test Case 6.1.1: View All Notifications

- **Description:** User can view notification center
- **Steps:**
  1. Click notification bell icon
  2. View list of all notifications
- **Expected Result:**
  - All notifications listed
  - Unread marked differently
  - Can mark as read

#### Test Case 6.1.2: Clear Notifications

- **Description:** User can clear old notifications
- **Steps:**
  1. Open notifications
  2. Click "Clear all" or select older ones
- **Expected Result:** Selected notifications removed

#### Test Case 6.1.3: Notification Types

- **Description:** Different notification types received
- **Expected Types:**
  - Someone followed you
  - Someone liked your post
  - Someone commented on your post
  - Someone replied to your comment
  - Someone mentioned you

---

### 6.2 Performance & Load Tests

#### Test Case 6.2.1: Feed Load Time

- **Description:** Feed loads within acceptable time
- **Steps:**
  1. Load feed page
  2. Measure load time
- **Expected Result:** Page loads in < 2 seconds

#### Test Case 6.2.2: Infinite Scroll Performance

- **Description:** Performance doesn't degrade with infinite scroll
- **Steps:**
  1. Scroll through 100+ posts
  2. Check performance
- **Expected Result:** No lag or slowdown

#### Test Case 6.2.3: Image Load Optimization

- **Description:** Images load efficiently
- **Steps:**
  1. View post with image
  2. Check network tab
- **Expected Result:** Images optimized, not > 500KB

---

### 6.3 Accessibility Tests

#### Test Case 6.3.1: Keyboard Navigation

- **Description:** All features accessible via keyboard
- **Steps:**
  1. Navigate using Tab, Enter, Space
  2. Test all major functions
- **Expected Result:** All clickable elements reachable

#### Test Case 6.3.2: Screen Reader Support

- **Description:** Content readable by screen readers
- **Steps:**
  1. Use screen reader
  2. Navigate page
- **Expected Result:** All content announced properly

#### Test Case 6.3.3: Color Contrast

- **Description:** Text meets WCAG contrast standards
- **Steps:**
  1. Check text color contrast ratio
- **Expected Result:** AA standard (4.5:1) met

---

## Test Automation Strategy

### Website Details

- **URL:** https://mastodon.social
- **Type:** Federated open-source social network
- **Framework:** Playwright (JavaScript/TypeScript)
- **Test Organization:** Page Object Model (POM)
- **Data:** Test fixtures with real/dummy accounts
- **CI/CD:** GitHub Actions
- **Browsers:** Chrome, Firefox, Safari

### Important Notes for Mastodon Testing

- **No Bot Protection:** Mastodon.social allows automated testing
- **Account Creation:** Can create test accounts programmatically
- **Delays:** May need waits for federation to sync across instances
- **API Available:** GraphQL API available for setup/teardown
- **Real Server:** Tests against live Mastodon instance (use test accounts)

### Folder Structure

```
tests/
├── fixtures/
│   ├── auth.fixture.js          (Login/Register helpers)
│   ├── test-accounts.fixture.js (Test user credentials)
│   ├── toots.fixture.js         (Toot/post data)
│   └── api-setup.fixture.js     (API-based account creation)
├── pages/
│   ├── auth.page.js             (Login/Register)
│   ├── home.page.js             (Home timeline)
│   ├── profile.page.js          (User profiles)
│   ├── compose.page.js          (Compose toot modal)
│   ├── search.page.js           (Search functionality)
│   ├── timeline.page.js         (Timeline interactions)
│   └── notifications.page.js    (Notifications)
├── specs/
│   ├── 1-auth.spec.js           (Registration & Login - 6 tests)
│   ├── 2-toots.spec.js          (Create/Edit/Delete - 11 tests)
│   ├── 3-interactions.spec.js   (Favorites/Boosts/Replies - 15 tests)
│   ├── 4-relationships.spec.js  (Follow/Unfollow/Block - 10 tests)
│   ├── 5-search.spec.js         (Search & Timelines - 18 tests)
│   ├── 6-notifications.spec.js  (Notification tests - 3 tests)
│   └── 7-integration.spec.js    (Full user journeys - mixed)
├── utils/
│   ├── helpers.js               (Common helpers)
│   ├── constants.js             (URLs, timeouts, selectors)
│   ├── api-client.js            (Mastodon API interactions)
│   └── data-generators.js       (Generate test data)
└── config/
    ├── playwright.config.js
    ├── test-data.json
    └── README.md
```

### Selectors Reference for Mastodon

```javascript
// Common selectors to watch for
const selectors = {
  // Auth
  emailInput: 'input[type="email"]',
  passwordInput: 'input[type="password"]',
  loginButton: 'button[type="submit"]',

  // Compose
  composeButton: 'button[aria-label="Compose new toot"]',
  tootInput: '[role="textbox"]',
  publishButton: 'button:has-text("Toot!")',

  // Timeline
  toot: "article[data-id]",
  favoriteButton: 'button[aria-label*="favourite"]',
  boostButton: 'button[aria-label*="boost"]',
  replyButton: 'button[aria-label*="reply"]',

  // Profile
  followButton: 'button:has-text("Follow")',
  profileHeader: "header",
};
```

---

## Success Criteria

✅ 60+ test cases covering Mastodon features
✅ Cross-browser testing (Chrome, Firefox, Safari)
✅ Tests run in < 10 minutes
✅ Detailed HTML reports generated
✅ Screenshots/videos on failure
✅ Proper waits for federation syncing
✅ CI/CD pipeline automated with GitHub Actions
✅ Test data cleanup (delete test accounts/toots)
✅ Mastodon-specific features tested (privacy levels, content warnings, etc.)
✅ Accessibility compliance (WCAG AA)

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/specs/1-auth.spec.js

# Run with UI mode
npx playwright test --ui

# Run in debug mode
npx playwright test --debug

# Run specific test by name
npx playwright test -g "Successful User Registration"

# Run on specific browser
npx playwright test --project=chromium

# Generate HTML report
npx playwright test && npx playwright show-report

# Run tests with video recording
npx playwright test --headed
```

## Important Setup Notes

1. **Test Accounts:** Create accounts on mastodon.social with distinct prefixes (test_user_1, test_user_2, etc.)
2. **Email:** Use disposable/test email addresses or email forwarding
3. **Rate Limiting:** Mastodon may rate limit rapid requests - add strategic waits
4. **Federation Sync:** Allow 1-2 seconds for federation timing
5. **Cleanup:** Consider API-based cleanup of test data after test runs
6. **Environment Variables:** Store credentials in .env file (never commit)

## Challenges & Solutions

| Challenge                           | Solution                                      |
| ----------------------------------- | --------------------------------------------- |
| Account lockout after failed logins | Use different accounts for each test          |
| Federation delays                   | Add explicit waits after follow/boost         |
| Rate limiting                       | Implement exponential backoff                 |
| Dynamic IDs/selectors               | Use accessible names and data attributes      |
| Private accounts                    | Have mix of public and private test accounts  |
| Notification delays                 | Poll or use longer timeouts for notifications |
