// ============================================
// ANIMATION UTILITIES
// ============================================

class AnimationManager {
    constructor() {
        this.observers = [];
        this.init();
    }
    
    init() {
        this.initScrollReveal();
        this.initParallax();
        this.initCounterAnimation();
        this.initHoverEffects();
    }
    
    // Scroll Reveal Animation
    initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll, .rate-card, .portfolio-item, .product-card, .service-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: unobserve after animation
                    if (entry.target.classList.contains('observe-once')) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px 0px'
        });
        
        revealElements.forEach(el => observer.observe(el));
        this.observers.push(observer);
    }
    
    // Parallax Effect
    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }, 10));
    }
    
    // Counter Animation
    initCounterAnimation() {
        const counters = document.querySelectorAll('.counter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(counterElement) {
        const target = parseInt(counterElement.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counterElement.textContent = target;
                clearInterval(timer);
            } else {
                counterElement.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Hover Effects
    initHoverEffects() {
        const hoverElements = document.querySelectorAll('.hover-lift, .hover-glow, .hover-scale');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                if (el.classList.contains('hover-lift')) {
                    el.style.transform = 'translateY(-8px)';
                }
                if (el.classList.contains('hover-glow')) {
                    el.style.boxShadow = 'var(--shadow-glow)';
                }
                if (el.classList.contains('hover-scale')) {
                    el.style.transform = 'scale(1.05)';
                }
            });
            
            el.addEventListener('mouseleave', (e) => {
                if (el.classList.contains('hover-lift')) {
                    el.style.transform = 'translateY(0)';
                }
                if (el.classList.contains('hover-glow')) {
                    el.style.boxShadow = 'none';
                }
                if (el.classList.contains('hover-scale')) {
                    el.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // Page Transition Animation
    pageTransitionIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 10);
    }
    
    pageTransitionOut(element) {
        return new Promise((resolve) => {
            element.style.transition = 'all 0.3s ease';
            element.style.opacity = '0';
            element.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                resolve();
            }, 300);
        });
    }
    
    // Animate on scroll (AOS)
    animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.getAttribute('data-aos');
                    const duration = entry.target.getAttribute('data-aos-duration') || '600';
                    const delay = entry.target.getAttribute('data-aos-delay') || '0';
                    
                    entry.target.style.animation = `${animation} ${duration}ms ease ${delay}ms forwards`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => observer.observe(el));
    }
    
    // Typing animation
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Fade in elements sequentially
    fadeInSequential(elements, delay = 100) {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }
    
    // Particle background effect
    createParticleBackground(container, count = 50) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            container.appendChild(particle);
        }
    }
    
    // Shimmer effect on load
    addShimmerEffect(element) {
        element.classList.add('shimmer-loading');
        setTimeout(() => {
            element.classList.remove('shimmer-loading');
        }, 1000);
    }
    
    // Cleanup observers
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
    }
}

// Initialize animations globally
let animationManager = null;

function initAnimations() {
    if (!animationManager) {
        animationManager = new AnimationManager();
    }
    return animationManager;
}

// Export for global use
window.initAnimations = initAnimations;
window.AnimationManager = AnimationManager;