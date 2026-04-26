// ============================================
// ABOUT PAGE COMPONENT
// ============================================

const AboutPage = {
    render() {
        const config = window.SITE_CONFIG.about;
        
        return `
            <div class="about-page">
                <div class="catalogue-hero">
                    <div class="catalogue-hero-content">
                        <span class="hero-icon"><img src="assets/TS LOGO.png" alt="TS Brands Zim Logo" class="logo-img1"></span>
                        <h1>About Ts Brands Zim</h1>
                        <p>Creative agency based in Harare, Zimbabwe</p>
                    </div>
                </div>
                
                <section class="story-section">
                    <div class="story-grid">
                        <div class="story-content">
                            <div class="section-header text-left">
                                <div class="subtitle">Our Story</div>
                                <h2>From Passion to Profession</h2>
                            </div>
                            <p>${config.story}</p>
                            <p>${config.mission}</p>
                            <button class="btn-primary" data-nav="contact">Work With Us</button>
                        </div>
                        <div class="story-image">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&fit=crop" alt="Our Team" loading="lazy">
                        </div>
                    </div>
                </section>
                
                <section class="values-section">
                    <div class="section-header">
                        <div class="subtitle">What We Believe</div>
                        <h2>Our Core Values</h2>
                    </div>
                    <div class="values-grid">
                        ${config.values.map(value => `
                            <div class="value-card">
                                <div class="value-icon">
                                    <i class="fas ${value.icon}"></i>
                                </div>
                                <h3>${value.title}</h3>
                                <p>${value.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>
                
                <section class="stats-section">
                    <div class="stats-grid">
                        ${config.stats.map(stat => `
                            <div class="stat-card">
                                <div class="stat-number">
                                    <span class="counter" data-target="${stat.number}">0</span>${stat.suffix}
                                </div>
                                <div class="stat-label">${stat.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </section>
                
                <section class="team-section">
                    <div class="section-header">
                        <div class="subtitle">Meet the Team</div>
                        <h2>The Creative Minds Behind the Magic</h2>
                    </div>
                    <div class="team-grid">
                        ${config.team.map(member => `
                            <div class="team-card">
                                <div class="team-image">
                                    <img src="${member.image}" alt="${member.name}" loading="lazy">
                                    <div class="team-social">
                                        <a href="${window.SITE_CONFIG.site.instagram}" target="_blank" rel="noopener"><i class="fab fa-instagram"></i></a>
                                        <a href="https://linkedin.com" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                                <div class="team-info">
                                    <h3>${member.name}</h3>
                                    <p class="team-role">${member.role}</p>
                                    <p class="team-bio">${member.bio}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
                
                <section class="cta-section">
                    <div class="cta-content">
                        <h2>Ready to Create Something Amazing?</h2>
                        <p>Let's bring your vision to life</p>
                        <button class="btn-primary" data-nav="contact">Start a Project</button>
                    </div>
                </section>
            </div>
        `;
    },
    
    afterLoad() {
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
        
        // Scroll reveal for cards
        const cards = document.querySelectorAll('.value-card, .team-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => observer.observe(card));
        
        // Parallax effect on story section
        const storySection = document.querySelector('.story-section');
        window.addEventListener('scroll', window.helpers.throttle(() => {
            if (storySection) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                const storyImage = storySection.querySelector('.story-image');
                if (storyImage) {
                    storyImage.style.transform = `translateY(${rate * 0.1}px)`;
                }
            }
        }, 10));
    }
};