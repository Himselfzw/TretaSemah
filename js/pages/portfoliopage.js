// ============================================
// PORTFOLIO PAGE COMPONENT (Combined)
// ============================================

const PortfolioPage = {
    render() {
        // Combine all portfolio items from all categories
        const graphicsItems = window.SITE_CONFIG.graphics.portfolio.map(item => ({
            ...item,
            category: 'Graphics',
            type: 'graphics'
        }));
        
        const photoItems = window.SITE_CONFIG.photography.portfolio.map(item => ({
            ...item,
            category: 'Photography',
            type: 'photography'
        }));
        
        const clothingItems = window.SITE_CONFIG.clothing.products.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: `$${item.price}`,
            image: item.image,
            category: 'Clothing',
            type: 'clothing'
        }));
        
        const allItems = [...graphicsItems, ...photoItems, ...clothingItems];
        
        // Get unique categories
        const categories = ['All', ...new Set(allItems.map(item => item.category))];
        
        return `
            <div class="catalogue-page">
                <div class="catalogue-hero">
                    <div class="catalogue-hero-content">
                        <span class="hero-icon">✨</span>
                        <h1>Our Creative Portfolio</h1>
                        <p>A showcase of our best work across design, photography, and apparel</p>
                    </div>
                </div>
                
                <section>
                    <div class="portfolio-filters" id="portfolio-filters">
                        ${categories.map(cat => `
                            <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-filter="${cat}">${cat}</button>
                        `).join('')}
                    </div>
                    
                    <div class="portfolio-grid" id="combined-portfolio-grid">
                        ${allItems.map(item => `
                            <div class="portfolio-item" data-category="${item.category}" data-type="${item.type}">
                                <div class="portfolio-image">
                                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                                    <div class="portfolio-overlay">
                                        <span class="item-type-badge">${item.type}</span>
                                        <button class="view-details" data-id="${item.id}" data-type="${item.type}">
                                            <i class="fas fa-eye"></i> View Details
                                        </button>
                                    </div>
                                </div>
                                <div class="portfolio-info">
                                    <h3>${item.title}</h3>
                                    <p>${item.description}</p>
                                    <div class="portfolio-price">${item.price}</div>
                                    <div class="portfolio-category">${item.category}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
                
                <section class="cta-section">
                    <div class="cta-content">
                        <h2>Have a Project in Mind?</h2>
                        <p>Let's create something amazing together</p>
                        <button class="btn-primary" data-nav="contact">Start Your Project</button>
                    </div>
                </section>
            </div>
        `;
    },
    
    afterLoad() {
        // Portfolio filtering
        const filterBtns = document.querySelectorAll('#portfolio-filters .filter-btn');
        const portfolioItems = document.querySelectorAll('#combined-portfolio-grid .portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                portfolioItems.forEach(item => {
                    if (filter === 'All' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.add('show'), 10);
                    } else {
                        item.classList.remove('show');
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });
        
        // View details - open image viewer + inquiry tracking
        const viewButtons = document.querySelectorAll('.view-details');
        const portfolioImages = Array.from(document.querySelectorAll('#combined-portfolio-grid .portfolio-item')).map(item => ({
            src: item.querySelector('img')?.src || '',
            title: item.querySelector('h3')?.textContent || '',
            description: item.querySelector('p')?.textContent || '',
            price: item.querySelector('.portfolio-price')?.textContent || ''
        }));

        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.getAttribute('data-id'));
                const type = btn.getAttribute('data-type');
                const item = btn.closest('.portfolio-item');
                const title = item.querySelector('h3')?.textContent || '';
                if (window.InquiryTracker) {
                    window.InquiryTracker.track(type, id, title);
                }
                const index = Array.from(document.querySelectorAll('#combined-portfolio-grid .portfolio-item')).indexOf(item);
                if (window.ImageViewer && portfolioImages.length > 0) {
                    window.ImageViewer.open(portfolioImages, index);
                }
            });
        });
        
        // Scroll reveal
        const revealElements = document.querySelectorAll('.portfolio-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => observer.observe(el));
    },
    
    showProjectDetails(id, type) {
        let project = null;
        
        if (type === 'graphics') {
            project = window.SITE_CONFIG.graphics.portfolio.find(p => p.id === id);
        } else if (type === 'photography') {
            project = window.SITE_CONFIG.photography.portfolio.find(p => p.id === id);
        } else if (type === 'clothing') {
            project = window.SITE_CONFIG.clothing.products.find(p => p.id === id);
        }
        
        if (!project) return;
        
        // Create and show modal with project details
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="project-modal-content">
                <button class="project-modal-close">&times;</button>
                <div class="project-modal-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-modal-info">
                    <h2>${project.title}</h2>
                    <p class="project-description">${project.description}</p>
                    <div class="project-price">${project.price}</div>
                    <button class="btn-primary" data-nav="contact">Inquire About This Project</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        const closeBtn = modal.querySelector('.project-modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
    }
};