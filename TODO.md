# Debug TODO

## Critical Fixes
- [x] 1. Fix `js/app.js` — add `window.navigateToItem`, prevent `isLoading` lock, wrap `afterLoadCallback` in try/catch
- [x] 2. Fix `js/components/FeaturedCarousel.js` — correct `maxIndex`, dot count, and wrapping logic
- [x] 3. Fix `js/utils/cartManager.js` — replace `%0A` with `\n` to prevent double URL-encoding
- [x] 4. Fix `js/utils/helper.js` — change `item.type` to `item.category` in `getRankedFeaturedItems()`
- [x] 5. Fix `js/components/Header.js` — add null guard for `navLinks`
- [x] 6. Fix `js/pages/HomePage.js` — add `typeof Swiper !== 'undefined'` guards

## Follow-up
- [ ] Test carousel navigation (desktop + mobile)
- [ ] Test carousel card click → page navigation + anchor scroll
- [ ] Test WhatsApp cart share newlines
- [ ] Test rapid page navigation / back-forward buttons

