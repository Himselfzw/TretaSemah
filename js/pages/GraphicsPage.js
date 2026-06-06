// ============================================
// GRAPHICS DESIGN PAGE COMPONENT
// ============================================

const GraphicsPage = {
    render() {
        const config = window.SITE_CONFIG.graphics;
        
        return `
            <div class="catalogue-page">
                <div class="catalogue-hero" style="background-image: linear-gradient(135deg, #0A0A0A, #1A1A1A), url('${config.heroImage}'); background-blend-mode: overlay; background-size: contain;">
                    <div class="catalogue-hero-content">
                        <span class="hero-icon"><span class="hero-icon"><img src="assets/TS LOGO.png" alt="TS Brands Zim Logo" class="logo-img1"></span></span>
                        <p>${config.tagline}</p>
                    </div>
                </div>
                
                <section class="portfolio-section">
                    <div class="section-header">
                        <div class="subtitle">Our Work</div>
                        <h2>Graphics Portfolio</h2>
                    </div>
                    <div class="portfolio-filters" id="portfolio-filters">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="Branding">Branding</button>
                        <button class="filter-btn" data-filter="Digital">Digital</button>
                        <button class="filter-btn" data-filter="Packaging">Packaging</button>
                        <button class="filter-btn" data-filter="Print">Print</button>
                    </div>
                    <div class="portfolio-grid" id="graphics-portfolio-grid">
                        ${config.portfolio.map(item => `
                            <div class="portfolio-item" data-category="${item.category}" id="graphics-item-${item.id}">
                                <div class="portfolio-image">
                                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                                    <div class="portfolio-overlay">
                                        <button class="view-project" data-id="${item.id}">View Project</button>
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
                        <h3>Need a Custom Design?</h3>
                        <p>Let's discuss your project and create something unique</p>
                        <button class="btn-primary" data-nav="contact">Start a Project →</button>
                    </div>
                </section>
            </div>
        `;
    },
    
    afterLoad() {
        // Portfolio filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
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
        
        // View Project - open image viewer + track inquiry
        const viewButtons = document.querySelectorAll('.view-project');
        const graphicsImages = Array.from(document.querySelectorAll('#graphics-portfolio-grid .portfolio-item')).map(item => ({
            src: item.querySelector('img')?.src || '',
            title: item.querySelector('h3')?.textContent || '',
            description: item.querySelector('p')?.textContent || '',
            price: item.querySelector('.portfolio-price')?.textContent || ''
        }));

        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.portfolio-item');
                const id = parseInt(btn.getAttribute('data-id'));
                const title = item.querySelector('h3')?.textContent || '';
                if (window.InquiryTracker) {
                    window.InquiryTracker.track('graphics', id, title);
                }
                const index = Array.from(document.querySelectorAll('#graphics-portfolio-grid .portfolio-item')).indexOf(item);
                if (window.ImageViewer && graphicsImages.length > 0) {
                    window.ImageViewer.open(graphicsImages, index);
                }
            });
        });

        // Image load animation
        const images = document.querySelectorAll('.portfolio-image img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.closest('.portfolio-item').classList.add('image-loaded');
            });
        });
        
        // Scroll reveal animation
        const revealElements = document.querySelectorAll('.rate-card, .portfolio-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });
        
        revealElements.forEach(el => observer.observe(el));
    }
};