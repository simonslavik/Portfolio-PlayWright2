# Mastodon (mastodon.social) - E2E Test Cases Documentation

## Project Overview

Comprehensive end-to-end test suite for Mastodon (mastodon.social), a federated open-source social network. Tests cover user authentication, post (toot) management, interactions, user relationships, content discovery, and Mastodon-specific features like privacy levels and content warnings.

---

## 1. USER REGISTRATION & LOGIN FLOWS

### 1.1 User Registration Tests

#### Test Case 1.1.1: Successful User Registration

- **Description:** User can register with valid credentials on Mastodon
- **Steps:**
  1. Navigate to mastodon.social registration page
  2. Accept Rules
  3. Enter valid email (e.g., newuser@test.com)
  4. Enter username (e.g., testuser123) - must be 1-30 characters
  5. Enter password (min 8 characters)
  6. Check "I agree to the terms of service and privacy policy"
  7. Click "Sign up" button
- **Expected Result:**
  - Registration form submitted successfully
  - Confirmation message: "Your account awaits confirmation. Check your email for instructions"
  - Confirmation email received
  - Can confirm email and complete registrationg

#### Test Case 1.1.2: Registration - Email Already Exists

- **Description:** User cannot register with existing email
- **Steps:**
  1. Navigate to mastodon.social registration
  2. Enter existing email (one already registered)
  3. Fill other fields correctly
  4. Click "Sign up"
- **Expected Result:** Error message: "Email has already been taken"

#### Test Case 1.1.3: Registration - Invalid Email Format

- **Description:** System rejects invalid email format
- **Steps:**
  1. Navigate to mastodon.social registration
  2. Enter invalid email (e.g., "notanemail" or "test@")
  3. Fill other fields
  4. Try to submit
- **Expected Result:** Error: "Email is invalid"

#### Test Case 1.1.4: Registration - Weak Password

- **Description:** System enforces password strength requirements
- **Steps:**
  1. Navigate to registration
  2. Enter weak password (less than 8 characters, e.g., "pass")
  3. Try to submit
- **Expected Result:** Error: "Password is too short (minimum is 8 characters)"

#### Test Case 1.1.5: Registration - Invalid Username Length

- **Description:** Username must be between 1-30 characters
- **Steps:**
  1. Navigate to registration
  2. Enter username > 30 characters
  3. Try to submit
- **Expected Result:** Error: "Username is too long (maximum is 30 characters)"

#### Test Case 1.1.6: Registration - Missing Terms Agreement

- **Description:** User must agree to terms and privacy policy
- **Steps:**
  1. Fill email, username, password correctly
  2. Leave "I agree to the terms" checkbox unchecked
  3. Try to click "Sign up"
- **Expected Result:** Sign up button is disabled or error: "You must agree to the terms"

---

### 1.2 User Login Tests

#### Test Case 1.2.1: Successful Login

- **Description:** User logs in with correct credentials on Mastodon
- **Steps:**
  1. Navigate to mastodon.social login page
  2. Enter email or username: existing_user@test.com
  3. Enter password: CorrectPassword123
  4. Click "Log in" button
- **Expected Result:**
  - Login successful
  - Redirected to home timeline
  - User profile visible in sidebar with avatar and display name
  - Home feed shows posts from followed accounts

#### Test Case 1.2.2: Login - Invalid Email

- **Description:** Login fails with non-existent email
- **Steps:**
  1. Enter email: nonexistent@test.com
  2. Enter any password
  3. Click "Log in"
- **Expected Result:** Error: "Invalid email address or password"

#### Test Case 1.2.3: Login - Incorrect Password

- **Description:** Login fails with wrong password
- **Steps:**
  1. Enter correct email
  2. Enter wrong password
  3. Click "Log in"
- **Expected Result:** Error: "Invalid email address or password"

#### Test Case 1.2.4: Login - Empty Credentials

- **Description:** Cannot submit empty login form
- **Steps:**
  1. Leave email and password empty
  2. Click "Log in"
- **Expected Result:** Error: "Email address can't be blank" and "Password can't be blank"

#### Test Case 1.2.6: Logout Functionality

- **Description:** User can log out successfully
- **Steps:**
  1. Login as user
  2. Click account menu (profile icon in sidebar)
  3. Click "Log out"
  4. Confirm logout
- **Expected Result:**
  - User logged out
  - Redirected to login page
  - Session cleared

---

## 2. POST MANAGEMENT (Toots)

### 2.1 Create Toot Tests

#### Test Case 2.1.1: Create Text Toot Successfully

- **Description:** User can create a simple text toot
- **Steps:**
  1. Click "Compose" button or press C
  2. Enter text: "This is my first toot!"
  3. Select visibility: "Public"
  4. Click "Toot!" button
- **Expected Result:**
  - Toot created successfully
  - Toot appears at top of home timeline
  - Timestamp shows current time
  - Toot shows public globe icon

#### Test Case 2.1.2: Create Toot with Image

- **Description:** User can create toot with image attachment
- **Steps:**
  1. Click "Compose"
  2. Click image icon
  3. Upload image file (JPG, PNG)
  4. Add caption text
  5. Click "Toot!"
- **Expected Result:**
  - Toot created with image
  - Image displays correctly in timeline
  - Alt text option available for accessibility

#### Test Case 2.1.3: Create Toot with Multiple Images

- **Description:** User can attach up to 4 images per toot
- **Steps:**
  1. Click "Compose"
  2. Upload 4 image files
  3. Add text
  4. Click "Toot!"
- **Expected Result:**
  - All 4 images uploaded and displayed
  - Image gallery grid displayed
  - Toot successfully created

#### Test Case 2.1.4: Create Toot with Hashtags

- **Description:** Toot with hashtags is properly tagged
- **Steps:**
  1. Click "Compose"
  2. Enter text: "Great day! #photography #nature"
  3. Click "Toot!"
- **Expected Result:**
  - Hashtags are clickable/highlighted
  - Can search and follow hashtags
  - Toot appears in hashtag timelines

#### Test Case 2.1.5: Create Toot with Mentions

- **Description:** Mentions are recognized and tagged
- **Steps:**
  1. Click "Compose"
  2. Type: "Great work @username!" or use autocomplete
  3. Click "Toot!"
- **Expected Result:**
  - Mention is highlighted/linked
  - Mentioned user receives notification
  - Mention clickable to view profile

#### Test Case 2.1.6: Create Toot with Content Warning

- **Description:** User can add content warning (CW) to sensitive content
- **Steps:**
  1. Click "Compose"
  2. Click "CW" button
  3. Enter warning text: "Spoilers for movie X"
  4. Enter toot text (hidden behind warning)
  5. Click "Toot!"
- **Expected Result:**
  - Content warning displayed
  - Text hidden by default
  - Users can click to reveal content

#### Test Case 2.1.7: Create Toot with Privacy Levels

- **Description:** User can select different privacy levels
- **Steps:**
  1. Click "Compose"
  2. Click privacy dropdown
  3. Select "Followers only"
  4. Type text
  5. Click "Toot!"
- **Expected Result:**
  - Toot created with correct privacy
  - Icon shows privacy level (lock icon for followers-only)
  - Only followers can see toot

#### Test Case 2.1.8: Privacy Options - All Levels

- **Description:** Test all 4 privacy levels
- **Privacy Levels:**
  - Public (globe icon) - visible to everyone
  - Unlisted (people icon) - not in public timelines
  - Followers only (lock icon) - only followers
  - Direct (envelope icon) - only mentioned users
- **Expected Result:** Each level properly restricts visibility

#### Test Case 2.1.9: Create Empty Toot

- **Description:** Cannot post without content
- **Steps:**
  1. Click "Compose"
  2. Leave text blank, no images
  3. Try to click "Toot!"
- **Expected Result:** Error: "Toot can't be blank" or button disabled

#### Test Case 2.1.10: Toot Character Limit

- **Description:** Mastodon supports 500 character limit (configurable)
- **Steps:**
  1. Click "Compose"
  2. Enter text > 500 characters
- **Expected Result:**
  - Character counter shows remaining characters (goes negative/red)
  - "Toot!" button disabled or shows warning

#### Test Case 2.1.11: Draft Toot

- **Description:** User can save draft toot
- **Steps:**
  1. Click "Compose"
  2. Type text
  3. Close compose without posting
  4. Return to compose
- **Expected Result:**
  - Draft is saved
  - Can resume editing draft
  - Drafts list available

---

### 2.2 Edit Toot Tests

#### Test Case 2.2.1: Edit Toot Successfully

- **Description:** User can edit their own toot
- **Steps:**
  1. Click "..." menu on a toot
  2. Click "Edit"
  3. Modify text from "Hello" to "Hello World"
  4. Click "Save changes"
- **Expected Result:**
  - Toot updated with new text
  - "Edited" label appears on toot with timestamp
  - Edit history accessible (hover/click "Edited")

#### Test Case 2.2.2: Edit Toot - Change Privacy

- **Description:** User can change privacy level of existing toot
- **Steps:**
  1. Click "..." on toot
  2. Click "Edit"
  3. Change privacy from "Public" to "Followers only"
  4. Click "Save changes"
- **Expected Result:**
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

### 3.2 Boost (Retweet) Tests

#### Test Case 3.2.1: Boost a Toot

- **Description:** User can boost a toot (share to followers)
- **Steps:**
  1. View a toot
  2. Click boost icon (arrow/share icon)
- **Expected Result:**
  - Boost icon highlighted/colored (usually green)
  - Boost count incremented
  - Booster's followers see toot in their feed
  - Toot author receives notification

#### Test Case 3.2.2: Unboost a Toot

- **Description:** User can remove their boost
- **Steps:**
  1. Click boost icon on boosted toot
- **Expected Result:**
  - Boost icon returns to unfilled state
  - Boost count decremented
  - Toot removed from followers' feeds

#### Test Case 3.2.3: View Toot Boosts

- **Description:** User can see who boosted a toot
- **Steps:**
  1. Click on boost count
  2. List opens showing users who boosted
- **Expected Result:**
  - List of accounts that boosted
  - Can navigate to their profiles

#### Test Case 3.2.4: Boost Notification

- **Description:** Toot author receives boost notification
- **Steps:**
  1. User A boosts User B's toot
  2. Check User B's notifications
- **Expected Result:** Notification: "User A boosted your toot"

#### Test Case 3.2.5: Cannot Boost Own Toot

- **Description:** User cannot boost their own toot
- **Steps:**
  1. View own toot
  2. Try to click boost button
- **Expected Result:** Button disabled or message shown

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
