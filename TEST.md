# TS Brands Zim - Website Test Report

## Fixes Applied

### 1. Cart Size Selection Bug
**File:** `js/utils/cartManager.js`
**Issue:** `window.addToCart` wrapper didn't pass the `options` parameter, breaking size selection in cart.
**Fix:** Changed `(id, qty) => ...` to `(id, qty, options) => ...`

### 2. About Page Throttle Error
**File:** `js/pages/about.js`
**Issue:** Used bare `throttle()` which is not globally available (only `window.helpers.throttle`).
**Fix:** Changed to `window.helpers.throttle()`.

### 3. Broken Photography Image Paths
**File:** `config/site-config.js`
**Issue:** Local image paths had `?w=800&fit=crop` query params appended, and `treta Mesah` had wrong casing.
**Fix:** Removed query params from local assets and fixed folder casing to `Treta Mesah`.

### 4. Loader Destroyed on App Init
**File:** `js/app.js`, `index.html`
**Issue:** The loader was inside `#app` and got wiped when `renderComponents()` set `app.innerHTML`.
**Fix:** Moved loader outside `#app` in HTML; updated `app.js` to fade it out after init.

### 5. Featured Carousel Initialization
**File:** `js/components/FeaturedCarousel.js`
**Issue:** `slidesPerView` was never initialized on first render, causing incorrect slide sizing.
**Fix:** Added `this.updateSlidesPerView()` call in `initCarousel()`.

### 6. Contact Form Service Pre-select
**File:** `js/pages/ContactUs.js`
**Issue:** Used `window.location.search` but app uses hash-based routing, so query params were ignored.
**Fix:** Added `getHashQueryParam()` helper to parse query strings from the URL hash.

### 7. WhatsApp Message Encoding
**File:** `js/pages/ContactUs.js`
**Issue:** WhatsApp message was not URL-encoded, breaking on special characters.
**Fix:** Used `encodeURIComponent()` and switched from `%0A` to actual newlines before encoding.

## Improvements Applied

### 8. Dynamic Page Titles
**File:** `js/app.js`
**Change:** Added `pageTitles` map and `document.title` updates per page. Added 404 handler.

### 9. Mobile Menu Auto-close
**File:** `js/components/Header.js`
**Change:** Added event listeners to nav links to close mobile menu on click.

### 10. Cart Clear Button Reliability
**File:** `js/components/cart.js`
**Change:** Ensured clear-cart event listener always calls `renderCartModal()` after clearing.

### 11. XSS Prevention Utility
**File:** `js/utils/helper.js`
**Change:** Added `escapeHtml()` utility to `window.helpers`.

### 12. Performance & Accessibility
**File:** `index.html`, `css/style.css`
**Change:** Added `preconnect` hints for fonts/CDNs and a skip-to-content link with styles.

## Test Checklist
- [x] Home page loads without console errors
- [x] All navigation links work (Graphics, Photography, Clothing, Portfolio, About, Contact)
- [x] Cart badge updates when adding items with size selection
- [x] Contact form generates valid WhatsApp URL
- [x] Mobile menu closes after selecting a link
- [x] 404 page shows for unknown routes
- [x] Dynamic page titles update correctly
- [x] Skip-to-content link appears on focus

