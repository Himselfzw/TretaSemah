// ============================================
// HELPER UTILITIES
// ============================================

// Format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get element by selector with error handling
function $(selector, parent = document) {
    const element = parent.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
    return element;
}

// Get all elements by selector
function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

// Create element with classes and attributes
function createElement(tag, classes = [], attributes = {}, children = []) {
    const element = document.createElement(tag);
    if (classes.length) element.classList.add(...classes);
    
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });
    
    return element;
}

// Smooth scroll to element
function smoothScrollTo(element, offset = 0) {
    const target = typeof element === 'string' ? $(element) : element;
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Copy text to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!', 'success');
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        showToast('Failed to copy', 'error');
        return false;
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = createElement('div', [`toast`, `toast-${type}`], {}, [message]);
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    return re.test(email);
}

// Validate phone number (Zimbabwe format)
function isValidZimPhone(phone) {
    const re = /^(\+263|0)[7-8][0-9]{8}$/;
    return re.test(phone);
}

// Format phone number for WhatsApp
function formatWhatsAppNumber(phone) {
    // Remove any non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Convert Zimbabwe numbers to international format
    if (cleaned.startsWith('0')) {
        cleaned = '263' + cleaned.substring(1);
    }
    
    return cleaned;
}

// Get URL parameter
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Update URL without reload
function updateUrl(path, title = document.title) {
    history.pushState({}, title, path);
}

// Detect device type
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(ob|in)i/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

// Detect browser
function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.indexOf('Chrome') > -1) return 'chrome';
    if (ua.indexOf('Firefox') > -1) return 'firefox';
    if (ua.indexOf('Safari') > -1) return 'safari';
    if (ua.indexOf('Edge') > -1) return 'edge';
    return 'other';
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Generate random ID
function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Deep clone object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Merge objects deeply
function deepMerge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return deepMerge(target, ...sources);
}

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// IMAGE VIEWER - Full-screen gallery lightbox
// Reusable across all pages for viewing pictures
// ============================================
const ImageViewer = {
    currentIndex: 0,
    images: [],
    overlay: null,
    isOpen: false,

    open(images, startIndex = 0) {
        this.images = images;
        this.currentIndex = Math.max(0, Math.min(startIndex, images.length - 1));
        this.buildOverlay();
        this.showImage(this.currentIndex);
        this.bindEvents();
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    },

    buildOverlay() {
        if (this.overlay) this.overlay.remove();

        this.overlay = document.createElement('div');
        this.overlay.className = 'image-viewer-overlay';
        this.overlay.innerHTML = `
            <div class="image-viewer-backdrop"></div>
            <button class="image-viewer-close" aria-label="Close gallery">
                <i class="fas fa-times"></i>
            </button>
            <button class="image-viewer-nav image-viewer-prev" aria-label="Previous image">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="image-viewer-nav image-viewer-next" aria-label="Next image">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="image-viewer-container">
                <div class="image-viewer-loader">
                    <div class="loader-ring"></div>
                </div>
                <img class="image-viewer-img" src="" alt="" />
            </div>
            <div class="image-viewer-info">
                <div class="image-viewer-counter">1 / 1</div>
                <h3 class="image-viewer-title"></h3>
                <p class="image-viewer-desc"></p>
                <div class="image-viewer-price"></div>
            </div>
        `;
        document.body.appendChild(this.overlay);

        // Animate in
        requestAnimationFrame(() => {
            this.overlay.classList.add('active');
        });
    },

    showImage(index) {
        if (!this.overlay || this.images.length === 0) return;

        const img = this.overlay.querySelector('.image-viewer-img');
        const loader = this.overlay.querySelector('.image-viewer-loader');
        const title = this.overlay.querySelector('.image-viewer-title');
        const desc = this.overlay.querySelector('.image-viewer-desc');
        const price = this.overlay.querySelector('.image-viewer-price');
        const counter = this.overlay.querySelector('.image-viewer-counter');
        const prevBtn = this.overlay.querySelector('.image-viewer-prev');
        const nextBtn = this.overlay.querySelector('.image-viewer-next');

        const data = this.images[index];
        if (!data) return;

        // Show loader, hide image
        loader.style.display = 'flex';
        img.style.opacity = '0';

        // Update text info
        title.textContent = data.title || '';
        desc.textContent = data.description || data.desc || '';
        price.textContent = data.price || '';
        counter.textContent = `${index + 1} / ${this.images.length}`;

        // Update nav buttons
        prevBtn.style.display = this.images.length > 1 ? 'flex' : 'none';
        nextBtn.style.display = this.images.length > 1 ? 'flex' : 'none';

        // Load image
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = data.src || data.image || data;
            img.alt = data.title || 'Gallery image';
            loader.style.display = 'none';
            img.style.opacity = '1';
        };
        tempImg.onerror = () => {
            loader.style.display = 'none';
            img.style.opacity = '1';
            img.src = data.src || data.image || data;
        };
        tempImg.src = data.src || data.image || data;
    },

    next() {
        if (this.images.length <= 1) return;
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(this.currentIndex);
    },

    prev() {
        if (this.images.length <= 1) return;
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(this.currentIndex);
    },

    close() {
        if (!this.overlay) return;
        this.overlay.classList.remove('active');
        setTimeout(() => {
            if (this.overlay) {
                this.overlay.remove();
                this.overlay = null;
            }
            document.body.style.overflow = '';
            this.isOpen = false;
        }, 300);
        this.unbindEvents();
    },

    bindEvents() {
        this._onKeyDown = (e) => {
            if (!this.isOpen) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft') this.prev();
        };

        this._onTouchStart = (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        };

        this._onTouchEnd = (e) => {
            if (!this.touchStartX) return;
            const touchEndX = e.changedTouches[0].screenX;
            const diff = this.touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) this.next();
                else this.prev();
            }
            this.touchStartX = null;
        };

        document.addEventListener('keydown', this._onKeyDown);

        if (this.overlay) {
            const closeBtn = this.overlay.querySelector('.image-viewer-close');
            const prevBtn = this.overlay.querySelector('.image-viewer-prev');
            const nextBtn = this.overlay.querySelector('.image-viewer-next');
            const backdrop = this.overlay.querySelector('.image-viewer-backdrop');

            closeBtn?.addEventListener('click', () => this.close());
            prevBtn?.addEventListener('click', () => this.prev());
            nextBtn?.addEventListener('click', () => this.next());
            backdrop?.addEventListener('click', () => this.close());

            // Touch swipe
            this.overlay.addEventListener('touchstart', this._onTouchStart, { passive: true });
            this.overlay.addEventListener('touchend', this._onTouchEnd, { passive: true });
        }
    },

    unbindEvents() {
        document.removeEventListener('keydown', this._onKeyDown);
    }
};

// ============================================
// INQUIRY TRACKER - Popularity-based ranking
// Tracks user interest across all three services
// ============================================
const InquiryTracker = {
    STORAGE_KEY: 'ts_brands_inquiries',

    getData() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
        } catch {
            return {};
        }
    },

    saveData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },

    track(service, itemId, itemTitle) {
        const data = this.getData();
        if (!data[service]) data[service] = {};
        const key = String(itemId);
        if (!data[service][key]) {
            data[service][key] = { count: 0, title: itemTitle, firstSeen: Date.now() };
        }
        data[service][key].count++;
        data[service][key].lastInquired = Date.now();
        this.saveData(data);

        // Dispatch event so carousel can react live
        window.dispatchEvent(new CustomEvent('inquiryTracked', {
            detail: { service, itemId, itemTitle, count: data[service][key].count }
        }));
    },

    getTopItems(service, limit = 3) {
        const data = this.getData();
        const items = data[service] || {};
        return Object.entries(items)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, limit)
            .map(([id, info]) => ({ id: parseInt(id), ...info }));
    },

    getAllTopItems() {
        const services = ['graphics', 'photography', 'clothing'];
        const result = [];
        services.forEach(service => {
            const top = this.getTopItems(service, 3);
            result.push(...top.map(t => ({ ...t, service })));
        });
        return result;
    },

    getRankedFeaturedItems() {
        // Top 3 most inquired items per category, based on user interactions.
        const services = [
            { key: 'graphics', name: 'Graphics Design', items: window.SITE_CONFIG?.graphics?.portfolio || [] },
            { key: 'photography', name: 'Photography', items: window.SITE_CONFIG?.photography?.portfolio || [] },
            { key: 'clothing', name: 'Clothing', items: window.SITE_CONFIG?.clothing?.products || [] }
        ];

        // If there are no inquiry records yet, return deterministic defaults (first 3 per category)
        const rawData = this.getData();
        const hasAnyInquiries = services.some(s => rawData?.[s.key] && Object.keys(rawData[s.key]).length > 0);

        const buildFallback = (service) => {
            const items = service.items || [];
            return items.slice(0, 3).map((it, idx) => ({
                id: `${service.key}-${it.id}-${idx}`,
                title: it.title,
                description: it.description || '',
                price: typeof it.price === 'number' ? `$${it.price}` : (it.price || ''),
                image: it.image,
                category: service.key,
                categoryName: service.name,
                itemId: it.id,
                anchorId: `${service.key}-item-${it.id}`
            }));
        };

        if (!hasAnyInquiries) {
            return services.flatMap(buildFallback);
        }

        const result = [];
        services.forEach(service => {
            // Use ranked IDs, then map to full objects from config
            const top = this.getTopItems(service.key, 3);
            const byId = new Map((service.items || []).map(i => [i.id, i]));

            // If for some reason there are missing IDs, fallback-fill from config to keep 3 items.
            const filled = [];
            top.forEach(t => {
                const item = byId.get(t.id);
                if (item) {
                    filled.push({
                        id: `${service.key}-${item.id}`,
                        title: item.title,
                        description: item.description || '',
                        price: typeof item.price === 'number' ? `$${item.price}` : (item.price || ''),
                        image: item.image,
                        category: service.key,
                        categoryName: service.name,
                        itemId: item.id,
                        anchorId: `${service.key}-item-${item.id}`
                    });
                }
            });

            const usedIds = new Set(filled.map(f => f.itemId));
            const remaining = (service.items || []).filter(i => !usedIds.has(i.id));
            remaining.slice(0, Math.max(0, 3 - filled.length)).forEach((item, idx) => {
                filled.push({
                    id: `${service.key}-${item.id}-fb-${idx}`,
                    title: item.title,
                    description: item.description || '',
                    price: typeof item.price === 'number' ? `$${item.price}` : (item.price || ''),
                    image: item.image,
                    category: service.key,
                    categoryName: service.name,
                    itemId: item.id,
                    anchorId: `${service.key}-item-${item.id}`
                });
            });

            result.push(...filled.slice(0, 3));
        });

        return result;
    },


    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
};

// Export for global use
window.helpers = {
    formatCurrency,
    debounce,
    throttle,
    $,
    $$,
    createElement,
    smoothScrollTo,
    copyToClipboard,
    showToast,
    isValidEmail,
    isValidZimPhone,
    formatWhatsAppNumber,
    getUrlParam,
    updateUrl,
    getDeviceType,
    getBrowser,
    lazyLoadImages,
    generateId,
    deepClone,
    deepMerge,
    escapeHtml
};
window.InquiryTracker = InquiryTracker;
window.ImageViewer = ImageViewer;
