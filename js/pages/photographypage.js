// ============================================
// PHOTOGRAPHY PAGE COMPONENT
// ============================================

const PhotographyPage = {
    render() {
        const config = window.SITE_CONFIG.photography;
        
        return `
            <div class="catalogue-page">
                <div class="catalogue-hero" style="background-image: linear-gradient(135deg, #423737, #b7a8a8), url('${config.heroImage}'); background-blend-mode: overlay; background-size: cover;">
                    <div class="catalogue-hero-content">
                       <img src="assets/banners/treta semah media.png" alt="TS Logo" class="logo-img2">
                    </div>
                </div>
                
                
                
                <section class="portfolio-section">
                    <div class="section-header">
                        <div class="subtitle">Gallery</div>
                        <h2>Our Photography Portfolio</h2>
                    </div>
                    <div class="portfolio-filters" id="photography-filters">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="Portrait">Portrait</button>
                        <button class="filter-btn" data-filter="Wedding">Wedding</button>
                        <button class="filter-btn" data-filter="Commercial">Commercial</button>
                        <button class="filter-btn" data-filter="Fashion">Fashion</button>
                        <button class="filter-btn" data-filter="Event">Event</button>
                    </div>
                    <div class="portfolio-grid" id="photography-portfolio-grid">
                        ${config.portfolio.map(item => `
                            <div class="portfolio-item" data-category="${item.category}" id="photography-item-${item.id}">
                                <div class="portfolio-image">
                                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                                    <div class="portfolio-overlay">
                                        <button class="view-project" data-id="${item.id}">
                                            <i class="fas fa-search-plus"></i> View Gallery
                                        </button>
                                    </div>
                                </div>
                                <div class="portfolio-info">
                                    <h3>${item.title}</h3>
                                    <p>${item.description}</p>
                                    <div class="portfolio-price">${item.price}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
                
                <section class="cta-banner">
                    <div class="cta-banner-content">
                        <h3>Ready to Capture Your Moments?</h3>
                        <p>Book your photography session today</p>
                        <button class="btn-primary" data-nav="contact">Book a Session →</button>
                    </div>
                </section>
            </div>
        `;
    },
    
    afterLoad() {
        // Portfolio filtering
        const filterBtns = document.querySelectorAll('#photography-filters .filter-btn');
        const portfolioItems = document.querySelectorAll('#photography-portfolio-grid .portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.add('show'), 10);
                    } else {
                        item.classList.remove('show');
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });
        
        // View Gallery - open image viewer with all photos + inquiry tracking
        const viewButtons = document.querySelectorAll('.view-project');
        const photoImages = Array.from(document.querySelectorAll('#photography-portfolio-grid .portfolio-item')).map(item => ({
            src: item.querySelector('img')?.src || '',
            title: item.querySelector('h3')?.textContent || '',
            description: item.querySelector('p')?.textContent || '',
            price: item.querySelector('.portfolio-price')?.textContent || ''
        }));

        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = btn.closest('.portfolio-item');
                const id = parseInt(btn.getAttribute('data-id'));
                const title = item.querySelector('h3')?.textContent || '';
                if (window.InquiryTracker) {
                    window.InquiryTracker.track('photography', id, title);
                }
                const index = Array.from(document.querySelectorAll('#photography-portfolio-grid .portfolio-item')).indexOf(item);
                if (window.ImageViewer && photoImages.length > 0) {
                    window.ImageViewer.open(photoImages, index);
                }
            });
        });
        
        // Scroll reveal
        const revealElements = document.querySelectorAll('.rate-card, .portfolio-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => observer.observe(el));
    },
    

};