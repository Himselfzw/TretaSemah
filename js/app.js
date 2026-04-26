// ============================================
// TS BRANDS ZIM - MAIN APPLICATION
// ============================================

class TsBrandsApp {
    constructor() {
        this.currentPage = 'home';
        this.isLoading = false;
        this.init();
    }

    async init() {
        // Render all components
        this.renderComponents();
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup global event listeners
        this.setupEventListeners();
        
        // Load initial page from URL hash or default to home
        const hashPage = window.location.hash.replace('#', '') || 'home';
        await this.loadPage(hashPage);
        
        // Initialize animations
        if (window.initAnimations) window.initAnimations();
        
        // Hide loader after everything is ready
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }
        }, 300);
    }

    renderComponents() {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = `
            <header-component></header-component>
            <main id="main-content">
                <div id="page-container"></div>
            </main>
            <cart-button></cart-button>
            <cart-modal></cart-modal>
            <footer-component></footer-component>
            <div id="modal-root"></div>
            <button id="back-to-top" class="back-to-top"><i class="fas fa-arrow-up"></i></button>
        `;
    }

    setupNavigation() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('[data-page]');
            if (navLink) {
                e.preventDefault();
                const page = navLink.getAttribute('data-page');
                if (page) this.loadPage(page);
            }
            
            const navLinkHref = e.target.closest('[data-nav]');
            if (navLinkHref) {
                e.preventDefault();
                const page = navLinkHref.getAttribute('data-nav');
                if (page) this.loadPage(page);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const page = window.location.hash.replace('#', '') || 'home';
            this.loadPage(page, false);
        });
    }

    async loadPage(pageId, pushState = true) {
        if (this.isLoading) return;
        this.isLoading = true;
        
        // Show loading state
        this.showPageLoader(true);
        
        // Update URL
        if (pushState) {
            history.pushState({ page: pageId }, '', `#${pageId}`);
        }
        
        // Update active nav links
        document.querySelectorAll('[data-page]').forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Load page content
        const pageContainer = document.getElementById('page-container');
        if (!pageContainer) {
            this.isLoading = false;
            this.showPageLoader(false);
            return;
        }
        
        let html = '';
        let afterLoadCallback = null;
        
        const pageTitles = {
            home: 'TS Brands Zim | Design. Capture. Wear.',
            graphics: 'Graphics Design | TS Brands Zim',
            photography: 'Photography | TS Brands Zim',
            clothing: 'Clothing & Merch | TS Brands Zim',
            portfolio: 'Portfolio | TS Brands Zim',
            about: 'About Us | TS Brands Zim',
            contact: 'Contact | TS Brands Zim'
        };
        
        try {
            switch(pageId) {
                case 'home':
                    html = HomePage.render();
                    afterLoadCallback = HomePage.afterLoad;
                    break;
                case 'graphics':
                    html = GraphicsPage.render();
                    afterLoadCallback = GraphicsPage.afterLoad;
                    break;
                case 'photography':
                    html = PhotographyPage.render();
                    afterLoadCallback = PhotographyPage.afterLoad;
                    break;
                case 'clothing':
                    html = ClothingPage.render();
                    afterLoadCallback = ClothingPage.afterLoad;
                    break;
                case 'portfolio':
                    html = PortfolioPage.render();
                    afterLoadCallback = PortfolioPage.afterLoad;
                    break;
                case 'about':
                    html = AboutPage.render();
                    afterLoadCallback = AboutPage.afterLoad;
                    break;
                case 'contact':
                    html = ContactPage.render();
                    afterLoadCallback = ContactPage.afterLoad;
                    break;
                default:
                    html = this.render404();
                    pageId = '404';
            }
        } catch (err) {
            console.error('Page render error:', err);
            html = this.render404();
            pageId = '404';
        }
        
        document.title = pageTitles[pageId] || pageTitles.home;
        
        pageContainer.innerHTML = html;
        this.currentPage = pageId;
        
        // Execute after-load callbacks
        if (afterLoadCallback) {
            try {
                afterLoadCallback();
            } catch (err) {
                console.error('afterLoad error:', err);
            }
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Hide loader
        setTimeout(() => {
            this.showPageLoader(false);
            this.isLoading = false;
        }, 300);
    }

    render404() {
        return `
            <div class="catalogue-page">
                <div class="catalogue-hero" style="min-height: 60vh; display: flex; align-items: center; justify-content: center;">
                    <div class="catalogue-hero-content" style="text-align: center;">
                        <span class="hero-icon" style="font-size: 80px;">🔍</span>
                        <h1>Page Not Found</h1>
                        <p style="margin-bottom: var(--spacing-xl);">The page you're looking for doesn't exist or has been moved.</p>
                        <button class="btn-primary" data-page="home">Back to Home</button>
                    </div>
                </div>
            </div>
        `;
    }

    showPageLoader(show) {
        const loader = document.getElementById('page-loader');
        if (show) {
            if (!loader) {
                const div = document.createElement('div');
                div.id = 'page-loader';
                div.className = 'page-loader-overlay';
                div.innerHTML = '<div class="loader-spinner"></div>';
                document.body.appendChild(div);
            } else {
                loader.style.display = 'flex';
            }
        } else if (loader) {
            loader.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Back to top button
        const backBtn = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backBtn.classList.add('show');
            } else {
                backBtn.classList.remove('show');
            }
        });
        
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '#/') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
}

// Start the app
const app = new TsBrandsApp();
window.app = app;

// Global navigation helper for carousel and deep links
window.navigateToItem = function(page, anchorId) {
    if (!page) return;
    window.app.loadPage(page).then(() => {
        if (anchorId) {
            setTimeout(() => {
                const el = document.getElementById(anchorId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 350);
        }
    });
};
