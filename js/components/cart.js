// ============================================
// CART COMPONENTS (Button & Modal)
// ============================================

class CartButton extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }
    
    render() {
        this.innerHTML = `
            <button class="cart-btn" id="cartBtn" title="View Cart">
                <i class="fas fa-shopping-cart"></i>
                <div class="cart-badge" id="cartBadge" style="display: none;">0</div>
            </button>
        `;
    }
    
    setupEventListeners() {
        const cartBtn = this.querySelector('#cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                const cartModal = document.getElementById('cartModal');
                if (cartModal && window.cartManager) {
                    cartModal.classList.add('active');
                    window.cartManager.renderCartModal();
                }
            });
        }
    }
}

class CartModal extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }
    
    render() {
        this.innerHTML = `
            <div class="cart-modal" id="cartModal">
                <div class="cart-content">
                    <div class="cart-header">
                        <h3><i class="fas fa-shopping-cart"></i> My Cart</h3>
                        <button id="closeCart" class="modal-close-btn" aria-label="Close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div id="cartItems" class="cart-items-container">
                        <div class="cart-empty">
                            <i class="fas fa-shopping-cart"></i>
                            <p>Your cart is empty</p>
                            <button class="btn-outline" data-page="clothing">Browse Products</button>
                        </div>
                    </div>
                    <div class="cart-total" id="cartTotal" style="display: none;">
                        <div class="total-label">Total</div>
                        <div class="total-price" id="totalPrice">$0</div>
                        <div class="cart-actions">
                            <button class="btn-primary btn-cart-share" id="shareWhatsApp">
                                <i class="fab fa-whatsapp"></i> Order via WhatsApp
                            </button>
                            <button class="btn-outline btn-cart-clear" id="clearCart">
                                <i class="fas fa-trash"></i> Clear Cart
                            </button>
                        </div>
                        <p class="cart-note"><i class="fas fa-info-circle"></i> Complete your order on WhatsApp</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        const closeBtn = this.querySelector('#closeCart');
        const modal = this.querySelector('#cartModal');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
        
        const clearCartBtn = this.querySelector('#clearCart');
        if (clearCartBtn && window.cartManager) {
            clearCartBtn.addEventListener('click', () => {
                window.cartManager.clearCart();
                if (window.cartManager.renderCartModal) {
                    window.cartManager.renderCartModal();
                }
            });
        }
        
        const shareBtn = this.querySelector('#shareWhatsApp');
        if (shareBtn && window.cartManager) {
            shareBtn.addEventListener('click', () => {
                window.cartManager.shareToWhatsApp();
            });
        }
    }
}

customElements.define('cart-button', CartButton);
customElements.define('cart-modal', CartModal);