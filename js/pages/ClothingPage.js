// ============================================
// CLOTHING PAGE COMPONENT
// ============================================

const ClothingPage = {
    render() {
        const config = window.SITE_CONFIG.clothing;

        return `
            <div class="catalogue-page">
                <div class="catalogue-hero" style="background-image: linear-gradient(135deg, #0A0A0A, #1A1A1A), url('${config.heroImage}'); background-blend-mode: overlay; background-size: cover;">
                    <div class="catalogue-hero-content">
                        <span class="hero-icon">${config.icon}</span>
                        <h1>${config.name} Catalogue</h1>
                        <p>${config.tagline}</p>
                    </div>
                </div>
                <section class="products-section">
                    <div class="section-header">
                        <div class="subtitle">Shop</div>
                        <h2>Featured Products</h2>
                    </div>
                    <div class="products-grid" id="clothing-products-grid">
                        ${config.products.map(product => `
                            <div class="product-card" data-product-id="${product.id}">
                                <div class="product-image">
                                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                                    <div class="product-actions">
                                        <button class="quick-view" data-id="${product.id}"><i class="fas fa-eye"></i></button>
                                    </div>
                                </div>
                                <div class="product-info">
                                    <h3>${product.title}</h3>
                                    <p class="product-desc">${product.description}</p>
                                    <div class="product-price">$${product.price}</div>
                                    <div class="product-sizes">
                                        ${product.sizes.map(size => `<span class="size-badge">${size}</span>`).join('')}
                                    </div>
                                    <button class="btn-primary add-to-cart" data-id="${product.id}">
                                        <i class="fas fa-shopping-cart"></i> Add to Cart
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Quick View Modal -->
                <div id="quick-view-modal" class="modal">
                    <div class="modal-content">
                        <span class="modal-close">&times;</span>
                        <div id="quick-view-content">
                            <!-- Dynamic content loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    afterLoad() {
        // Quick view functionality + inquiry tracking
        const quickViewBtns = document.querySelectorAll('.quick-view');
        const quickViewModal = document.getElementById('quick-view-modal');
        const quickViewContent = document.getElementById('quick-view-content');
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = parseInt(btn.getAttribute('data-id'));
                const product = window.SITE_CONFIG.clothing.products.find(p => p.id === productId);
                if (window.InquiryTracker && product) {
                    window.InquiryTracker.track('clothing', productId, product.title);
                }
                this.showQuickView(productId);
            });
        });
        const closeQuickBtn = quickViewModal.querySelector('.modal-close');
        closeQuickBtn.addEventListener('click', () => {
            quickViewModal.classList.remove('active');
        });
        quickViewModal.addEventListener('click', (e) => {
            if (e.target === quickViewModal) quickViewModal.classList.remove('active');
        });

        // Add to cart functionality + inquiry tracking
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = parseInt(btn.getAttribute('data-id'));
                const product = window.SITE_CONFIG.clothing.products.find(p => p.id === productId);
                if (window.InquiryTracker && product) {
                    window.InquiryTracker.track('clothing', productId, product.title);
                }
                if (window.addToCart) {
                    window.addToCart(productId, 1);
                    this.showToast('Added to cart!', 'success');
                }
            });
        });

        // Product card hover effects
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hovered');
            });
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hovered');
            });
        });

        // Scroll reveal
        const revealElements = document.querySelectorAll('.rate-card, .product-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    },

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${message}`;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    showQuickView(productId) {
        const config = window.SITE_CONFIG.clothing;
        const product = config.products.find(p => p.id === productId);

        if (!product) return;

        const content = document.getElementById('quick-view-content');
        content.innerHTML = `
            <div class="quick-view-container">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="quick-view-details">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <div class="price">$${product.price}</div>
                    <div class="sizes">
                        <h4>Available Sizes:</h4>
                        ${product.sizes.map(size => `<span class="size-badge">${size}</span>`).join('')}
                    </div>
                    <div class="colors">
                        <h4>Colors:</h4>
                        ${product.colors.map(color => `<span class="color-badge" style="background: ${color.toLowerCase()}">${color}</span>`).join('')}
                    </div>
                    <button class="btn-primary add-to-cart-quick" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;

        const modal = document.getElementById('quick-view-modal');
        modal.classList.add('active');

        const addBtn = content.querySelector('.add-to-cart-quick');
        addBtn.addEventListener('click', () => {
            if (window.addToCart) window.addToCart(product.id);
            modal.classList.remove('active');
            this.showToast('Added to cart!', 'success');
        });
    }
};

