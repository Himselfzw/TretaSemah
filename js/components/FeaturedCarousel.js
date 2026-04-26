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
        return window.SITE_CONFIG?.home?.featuredCarousel || [];
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
                <button class="carousel-btn carousel-prev" aria-label="Previous">
                    <i class="fas fa-chevron-left"></i>
                </button>
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
                                        View Details <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-btn carousel-next" aria-label="Next">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="carousel-dots"></div>
            </div>
        `;
    }

    initCarousel() {
        this.track = this.querySelector('.carousel-track');
        this.slides = this.querySelectorAll('.carousel-slide');
        this.prevBtn = this.querySelector('.carousel-prev');
        this.nextBtn = this.querySelector('.carousel-next');
        this.dotsContainer = this.querySelector('.carousel-dots');
        this.container = this.querySelector('.carousel-container');
        this.currentIndex = 0;
        this.slidesPerView = 1;

        if (this.slides.length === 0) return;

        this.updateSlidesPerView();
        this.renderDots();
        this.updateCarousel();
        this.startAutoSpin();
    }

    attachEventListeners() {
        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => {
            this.stopAutoSpin();
            this.goToPrev();
            this.startAutoSpin();
        });
        this.nextBtn?.addEventListener('click', () => {
            this.stopAutoSpin();
            this.goToNext();
            this.startAutoSpin();
        });

        // Dot navigation
        this.dotsContainer?.addEventListener('click', (e) => {
            if (e.target.dataset.dot !== undefined) {
                this.stopAutoSpin();
                this.goToIndex(parseInt(e.target.dataset.dot));
                this.startAutoSpin();
            }
        });

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
        this.querySelectorAll('.featured-card').forEach(card => {
            card.addEventListener('click', (e) => {
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

    renderDots() {
        const maxIndex = this.getMaxIndex();
        const numDots = maxIndex + 1;
        this.dotsContainer.innerHTML = Array.from({ length: numDots }, (_, i) =>
            `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-dot="${i}" aria-label="Go to slide ${i + 1}"></button>`
        ).join('');
        this.dots = this.querySelectorAll('.carousel-dot');
    }

    updateSlidesPerView() {
        const width = window.innerWidth;
        if (width > 1024) this.slidesPerView = 3;
        else if (width > 640) this.slidesPerView = 2;
        else this.slidesPerView = 1;
        // Re-render dots since maxIndex changed
        this.renderDots();
        this.updateCarousel();
    }

    updateCarousel() {
        if (!this.track || this.slides.length === 0) return;

        const maxIndex = this.getMaxIndex();
        if (this.currentIndex > maxIndex) this.currentIndex = maxIndex;

        const slideWidthPct = 100 / this.slidesPerView;
        this.track.style.transform = `translateX(-${this.currentIndex * slideWidthPct}%)`;

        this.dots?.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });

        if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0;
        if (this.nextBtn) this.nextBtn.disabled = this.currentIndex >= maxIndex;
    }

    goToNext() {
        const maxIndex = this.getMaxIndex();
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updateCarousel();
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

