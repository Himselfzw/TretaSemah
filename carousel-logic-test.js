/**
 * Featured Carousel Logic Test
 * Simulates the carousel navigation logic to verify correctness
 */

console.log('=== FEATURED CAROUSEL LOGIC TEST ===\n');

// Simulate the CURRENT carousel logic (as written in FeaturedCarousel.js)
function simulateCurrentLogic() {
    const slides = 9; // 9 featured items
    const scenarios = [
        { name: 'Desktop (1024px+)', width: 1200, slidesPerView: 3 },
        { name: 'Tablet (641-1024px)', width: 800, slidesPerView: 2 },
        { name: 'Mobile (<=640px)', width: 400, slidesPerView: 1 }
    ];

    let allPassed = true;

    scenarios.forEach(({ name, width, slidesPerView }) => {
        console.log(`\n--- ${name} | ${slidesPerView} slides/view ---`);
        
        // Current buggy maxIndex calculation
        const currentMaxIndex = slides - 1;
        const correctMaxIndex = Math.max(0, slides - slidesPerView);
        
        console.log(`  Total slides: ${slides}`);
        console.log(`  slidesPerView: ${slidesPerView}`);
        console.log(`  Correct maxIndex: ${correctMaxIndex} (shows last full set)`);
        console.log(`  Current code maxIndex: ${currentMaxIndex} (BUG: allows scrolling past content)`);
        
        // Simulate clicking next until the end
        let currentIndex = 0;
        let steps = 0;
        const visitedIndices = [0];
        
        // Simulate goToNext() loop
        do {
            // Current buggy logic
            if (currentIndex < currentMaxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            visitedIndices.push(currentIndex);
            steps++;
        } while (currentIndex !== 0 && steps < 20);
        
        console.log(`  Navigation path: [${visitedIndices.join(' → ')}]`);
        
        // Check if we ever show empty space
        const emptySpaceIndices = visitedIndices.filter(i => i > correctMaxIndex);
        if (emptySpaceIndices.length > 0) {
            console.log(`  ❌ EMPTY SPACE BUG: At indices ${[...new Set(emptySpaceIndices)].join(', ')}, only ${slidesPerView - 1} or fewer slides visible`);
            allPassed = false;
        } else {
            console.log(`  ✅ No empty space issues`);
        }
        
        // Check if next button would ever disable
        const wouldDisable = visitedIndices.some(i => i === currentMaxIndex);
        console.log(`  Next button disable check: ${wouldDisable ? 'Would disable at index ' + currentMaxIndex : 'Never disables with current logic'}`);
    });

    return allPassed;
}

// Test the documented fix: slidesPerView initialization
function testSlidesPerViewInit() {
    console.log('\n=== TEST: slidesPerView Initialization Fix ===');
    
    // Read the actual source file
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'js', 'components', 'FeaturedCarousel.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    const hasInitCall = content.includes('this.updateSlidesPerView()') && 
                        content.includes('initCarousel()');
    
    const initCarouselHasCall = /initCarousel\s*\([^)]*\)\s*\{[\s\S]*?this\.updateSlidesPerView\(\)/.test(content);
    
    console.log(`  File: ${filePath}`);
    console.log(`  Contains updateSlidesPerView(): ${hasInitCall ? '✅ YES' : '❌ NO'}`);
    console.log(`  Called inside initCarousel(): ${initCarouselHasCall ? '✅ YES - FIX VERIFIED' : '❌ NO - FIX MISSING'}`);
    
    return initCarouselHasCall;
}

// Test resize handler
function testResizeHandler() {
    console.log('\n=== TEST: Resize Handler ===');
    
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'js', 'components', 'FeaturedCarousel.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    const hasResize = content.includes("'resize'") && content.includes('debounce');
    const hasDisconnect = content.includes('disconnectedCallback');
    
    console.log(`  Resize listener with debounce: ${hasResize ? '✅ YES' : '❌ NO'}`);
    console.log(`  disconnectedCallback cleanup: ${hasDisconnect ? '✅ YES' : '❌ NO'}`);
    
    return hasResize && hasDisconnect;
}

// Run all tests
const fixVerified = testSlidesPerViewInit();
const resizeOk = testResizeHandler();
const logicOk = simulateCurrentLogic();

console.log('\n' + '='.repeat(50));
console.log('SUMMARY');
console.log('='.repeat(50));
console.log(`Documented Fix (slidesPerView init): ${fixVerified ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Resize Handler:                      ${resizeOk ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Navigation Logic (no empty space):   ${logicOk ? '✅ PASS' : '❌ FAIL'}`);
console.log('='.repeat(50));

if (fixVerified && resizeOk && logicOk) {
    console.log('\n✅ ALL TESTS PASSED - Carousel is fully fixed!');
    process.exit(0);
} else if (fixVerified && resizeOk) {
    console.log('\n⚠️  PARTIAL: Documented fix is in place, but navigation logic has bugs.');
    console.log('   The carousel will show empty space when scrolling on desktop/tablet.');
    process.exit(1);
} else {
    console.log('\n❌ FAILED: Critical fixes are missing.');
    process.exit(1);
}

