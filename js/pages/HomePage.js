// ============================================
// HOME PAGE COMPONENT
// ============================================

const HomePage = {
    render() {
        const config = window.SITE_CONFIG;
        const home = config.home;
        
        return `
            <section class="hero-swiper-section">
                <div class="swiper hero-swiper">
                    <div class="swiper-wrapper">
                        ${home.heroSlides.map(slide => `
                            <div class="swiper-slide">
                                <div class="hero-slide" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${slide.image}')">
                                    <div class="hero-overlay"></div>
                                    <div class="hero-content">
                                        <span class="hero-badge">${slide.badge}</span>
                                        <h1>${slide.title}</h1>
                                        <p class="hero-tagline">${slide.subtitle}</p>
                                        <div class="hero-buttons">
                                            <button class="btn-primary" data-page="${slide.ctaLink}">${slide.ctaText} <i class="fas fa-arrow-right"></i></button>
                                            <button class="btn-outline" data-nav="contact">Get Quote</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="swiper-button-next hero-nav"></div>
                    <div class="swiper-button-prev hero-nav"></div>
                    <div class="swiper-pagination hero-pagination"></div>
                </div>
                
                <div class="hero-stats">
                    ${config.about.stats.map(stat => `
                        <div class="stat-item">
                            <h3 class="counter" data-target="${stat.number}">0<span>${stat.suffix}</span></h3>
                            <p>${stat.label}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
            
            <!-- Featured Carousel -->
            <section class="carousel-section">
                <div class="section-header">
                    <div class="subtitle">Trending Now</div>
                    <h2>Most Popular Services & Products</h2>
                    <p class="section-desc">Top picks based on client interest across all our brands</p>
                </div>
                <featured-carousel></featured-carousel>
            </section>
            
            <!-- Services Grid -->
            <section class="services-preview">
                <div class="section-header">
                    <div class="subtitle">What We Do</div>
                    <h2>Our Creative Services</h2>
                </div>
                <div class="services-grid">
                    <div class="service-card" data-page="graphics">
                        <div class="service-icon"></div>
                        <h3>Graphics Design</h3>
                        <p>Brand identities, logos, packaging, and digital assets</p>
                        <span class="service-link">Explore →</span>
                    </div>
                    <div class="service-card" data-page="photography">
                        <div class="service-icon"></div>
                        <h3>Photography</h3>
                        <p>Portraits, events, products, and wedding photography</p>
                        <span class="service-link">Explore →</span>
                    </div>
                    <div class="service-card" data-page="clothing">
                        <div class="service-icon"></div>
                        <h3>Clothing & Merch</h3>
                        <p>Custom apparel, hoodies, t-shirts, and corporate wear</p>
                        <span class="service-link">Explore →</span>
                    </div>
                </div>
            </section>
            
            <!-- Testimonials -->
            <section class="testimonials-section">
                <div class="section-header">
                    <div class="subtitle">Client Love</div>
                    <h2>What Our Clients Say</h2>
                </div>
                <div class="swiper testimonials-swiper">
                    <div class="swiper-wrapper">
                        ${home.testimonials.map(testimonial => `
                            <div class="swiper-slide">
                                <div class="testimonial-card">
                                    <div class="testimonial-content">
                                        <i class="fas fa-quote-left"></i>
                                        <p>"${testimonial.text}"</p>
                                        <div class="testimonial-author">
                                            <div class="author-info">
                                                <strong>${testimonial.name}</strong>
                                                <span>${testimonial.company}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </section>
            
            <!-- CTA Section -->
            <section class="cta-section">
                <div class="cta-content">
                    <h2>Ready to Bring Your Vision to Life?</h2>
                    <p>Let's create something amazing together</p>
                    <div class="cta-buttons">
                        <button class="btn-primary" data-nav="contact">Start Your Project</button>
                        <button class="btn-outline" data-page="portfolio">View Portfolio</button>
                    </div>
                </div>
            </section>
        `;
    },
    
    afterLoad() {
        // Initialize Swipers only if library loaded
        if (typeof Swiper !== 'undefined') {
            new Swiper('.hero-swiper', {
                loop: false,
                autoplay: { delay: 5000, disableOnInteraction: false },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                pagination: { el: '.swiper-pagination', clickable: true },
                effect: 'fade',
                fadeEffect: { crossFade: true }
            });
            
            new Swiper('.testimonials-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: false,
                autoplay: { delay: 6000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                breakpoints: {
                    768: { slidesPerView: 2, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 30 }
                }
            });
        } else {
            console.warn('Swiper library not loaded');
        }
        
        // Animate counters
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 20);
        });
        
        // Animate elements on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.service-card, .featured-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }
};