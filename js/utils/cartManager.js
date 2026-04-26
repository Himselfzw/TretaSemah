// ============================================
// CART MANAGER - WhatsApp-Based Ordering
// ============================================

class CartManager {
    constructor() {
        this.cart = [];
        this.loadCart();
    }
    
    loadCart() {
        const saved = localStorage.getItem('ts_brands_cart');
        if (saved) {
            this.cart = JSON.parse(saved);
        }
        this.updateBadge();
    }
    
    saveCart() {
        localStorage.setItem('ts_brands_cart', JSON.stringify(this.cart));
        this.updateBadge();
    }
    
    addItem(productId, quantity = 1, options = {}) {
        const product = window.SITE_CONFIG.clothing.products.find(p => p.id === productId);
        if (!product) return false;

        const existingIndex = this.cart.findIndex(item => item.id === productId);
        if (existingIndex > -1) {
            this.cart[existingIndex].quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity,
                options: options
            });
        }

        this.saveCart();
        this.showNotification(`${product.title} added to cart!`);
        return true;
    }
    
    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }
    
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }
    
    getTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    getItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    clearCart() {
        this.cart = [];
        this.saveCart();
    }
    
    updateBadge() {
        const badge = document.getElementById('cartBadge');
        if (badge) {
            const count = this.getItemCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
    
    showNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-success';
        toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    shareToWhatsApp() {
        const config = window.SITE_CONFIG;
        let message = `🛍️ *NEW ORDER - TS BRANDS ZIM*\n\n`;
        message += `*Order Details:*\n`;

        this.cart.forEach(item => {
            message += `• ${item.quantity}x ${item.title} - $${item.price * item.quantity}\n`;
        });

        message += `\n*Total: $${this.getTotal()}*\n\n`;
        message += `_Order sent via TS Brands Zim Website_\n`;
        message += `Please confirm availability and provide payment details.`;

        const whatsappUrl = `https://wa.me/${config.site.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    
    renderCartModal() {
        const modal = document.getElementById('cartModal');
        const itemsContainer = document.getElementById('cartItems');
        const totalContainer = document.getElementById('cartTotal');
        
        if (!modal) return;
        
        if (this.cart.length === 0) {
            itemsContainer.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <button class="btn-outline" data-page="clothing">Browse Products</button>
                </div>
            `;
            totalContainer.style.display = 'none';
        } else {
            itemsContainer.innerHTML = this.cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <div class="price">$${item.price}</div>
                        <div class="qty-controls">
                            <button class="qty-btn minus" data-id="${item.id}">−</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                </div>
            `).join('');
            
            totalContainer.querySelector('#totalPrice').textContent = `$${this.getTotal()}`;
            totalContainer.style.display = 'block';
            
            // Attach event listeners
            itemsContainer.querySelectorAll('.minus').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.dataset.id);
                    const item = this.cart.find(i => i.id === id);
                    if (item && item.quantity > 1) {
                        this.updateQuantity(id, item.quantity - 1);
                        this.renderCartModal();
                    } else {
                        this.removeItem(id);
                        this.renderCartModal();
                    }
                });
            });
            
            itemsContainer.querySelectorAll('.plus').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.dataset.id);
                    const item = this.cart.find(i => i.id === id);
                    if (item) {
                        this.updateQuantity(id, item.quantity + 1);
                        this.renderCartModal();
                    }
                });
            });
            
            itemsContainer.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.dataset.id);
                    this.removeItem(id);
                    this.renderCartModal();
                });
            });
        }
    }
}

// Initialize cart globally
window.cartManager = new CartManager();
window.addToCart = (id, qty, options) => window.cartManager.addItem(id, qty, options);
window.updateCartBadge = () => window.cartManager.updateBadge();
window.renderCart = () => window.cartManager.renderCartModal();
window.getTotal = () => window.cartManager.getTotal();
window.getCart = () => window.cartManager.cart;