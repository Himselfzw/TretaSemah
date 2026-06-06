// Featured Carousel Component - Responsive with Auto-Spin
// Displays 9 curated items (3 per category) with color-coded badges
class FeaturedCarousel extends HTMLElement {
    connectedCallback() {
        this.render();
        this.initCarousel();
        this.attachEventListeners();
        this._resizeHandler = this.debounce(() => this.updateSlidesPerView(), 250);
        window.addEventListener('resize', this._resizeHandler);
    }

    disconnectedCallback() {
        this.stopAutoSpin();
        window.removeEventListener('resize', this._resizeHandler);
    }

    getFeaturedItems() {
        // Prefer dynamic ranking (top 3 items per category) based on inquiries/clicks.
        if (window.InquiryTracker && typeof window.InquiryTracker.getRankedFeaturedItems === 'function') {
            const ranked = window.InquiryTracker.getRankedFeaturedItems();
            if (Array.isArray(ranked) && ranked.length) return ranked;
        }

        // Fallback: keep working even if ranking isn't ready.
        return (window.SITE_CONFIG?.home?.featuredCarousel || []).slice(0, 9);
    }


    getCategoryColor(category) {
        const colors = {
            graphics: '#FF2E2E',
            photography: '#8B5CF6',
            clothing: '#10B981'
        };
        return colors[category] || '#FF2E2E';
    }

    render() {
        const items = this.getFeaturedItems();
        this.innerHTML = `
            <div class="carousel-container">
                <div class="carousel-track" role="list">
                    ${items.map((item, index) => `
                        <div class="carousel-slide" role="listitem" data-index="${index}">
                            <div class="featured-card" data-category="${item.category}" data-anchor="${item.anchorId}" data-item-id="${item.itemId}">
                                <div class="card-image">
                                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                                    <span class="card-category" style="background: ${this.getCategoryColor(item.category)}">${item.categoryName}</span>
                                </div>
                                <div class="card-info">
                                    <h4>${item.title}</h4>
                                    <p>${item.description}</p>
                                    <div class="price">${item.price}</div>
                                    <button class="btn-view-item" data-category="${item.category}" data-anchor="${item.anchorId}">
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    initCarousel() {
        this.track = this.querySelector('.carousel-track');
        this.slides = this.querySelectorAll('.carousel-slide');
        this.container = this.querySelector('.carousel-container');
        this.currentIndex = 0;
        this.slidesPerView = 1;

        if (this.slides.length === 0) return;

        this.updateSlidesPerView();
        this.updateCarousel();
        this.startAutoSpin();
    }

    attachEventListeners() {
        // Pause on hover, resume on leave
        if (this.container) {
            this.container.addEventListener('mouseenter', () => this.stopAutoSpin());
            this.container.addEventListener('mouseleave', () => this.startAutoSpin());
        }

        // Touch swipe support
        let touchStartX = 0;
        this.container?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        this.container?.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                this.stopAutoSpin();
                if (diff > 0) this.goToNext();
                else this.goToPrev();
                this.startAutoSpin();
            }
        }, { passive: true });

        // Card click - navigate to page and scroll to item
        // Also supports 15s pause when clicking the middle of the picture.
        this.querySelectorAll('.featured-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // If user clicked the image area near the middle, pause for 15s.
                // We treat “middle” as the central box (40%..60% both axes).
                const img = e.target && e.target.tagName === 'IMG' ? e.target : card.querySelector('img');
                if (img) {
                    const rect = img.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const inMiddle = (x >= rect.width * 0.4 && x <= rect.width * 0.6 && y >= rect.height * 0.4 && y <= rect.height * 0.6);
                    if (inMiddle) {
                        this.stopAutoSpin();
                        this._centerPauseTimer && clearTimeout(this._centerPauseTimer);
                        this._centerPauseTimer = setTimeout(() => {
                            this.startAutoSpin();
                        }, 15000);
                        return; // avoid navigation on center-click
                    }
                }

                e.preventDefault();
                const category = card.dataset.category;
                const anchorId = card.dataset.anchor;
                if (category && anchorId && window.navigateToItem) {
                    window.navigateToItem(category, anchorId);
                }
            });
            card.style.cursor = 'pointer';
        });
    }


    getMaxIndex() {
        return Math.max(0, this.slides.length - this.slidesPerView);
    }

    // Dots navigation removed (intentionally no-op).

    updateSlidesPerView() {
        const width = window.innerWidth;
        if (width > 1024) this.slidesPerView = 3;
        else if (width > 640) this.slidesPerView = 2;
        else this.slidesPerView = 1;
        this.updateCarousel();
    }

    updateCarousel() {
        if (!this.track || this.slides.length === 0) return;

        const maxIndex = this.getMaxIndex();
        if (this.currentIndex > maxIndex) this.currentIndex = maxIndex;

        const slideWidthPct = 100 / this.slidesPerView;
        this.track.style.transform = `translateX(-${this.currentIndex * slideWidthPct}%)`;
    }

    goToNext() {
        const maxIndex = this.getMaxIndex();

        // Move right at edges (wrap to start) and hide buttons accordingly.
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }

        this.updateCarousel();

        // Clear any pending center-click pause timer.
        this._centerPauseTimer && clearTimeout(this._centerPauseTimer);
        this._centerPauseTimer = null;
    }


    goToPrev() {
        const maxIndex = this.getMaxIndex();
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = maxIndex;
        }
        this.updateCarousel();
    }

    goToIndex(index) {
        const maxIndex = this.getMaxIndex();
        if (index >= 0 && index <= maxIndex) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }

    startAutoSpin() {
        this.stopAutoSpin();
        if (this.slides.length <= this.slidesPerView) return;
        this.autoSpinInterval = setInterval(() => {
            this.goToNext();
        }, 4000);
    }

    stopAutoSpin() {
        if (this.autoSpinInterval) {
            clearInterval(this.autoSpinInterval);
            this.autoSpinInterval = null;
        }
    }

    debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
}

customElements.define('featured-carousel', FeaturedCarousel);

