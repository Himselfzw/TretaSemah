// ============================================
// CONTACT PAGE COMPONENT
// ============================================

const ContactPage = {
    render() {
        const config = window.SITE_CONFIG;
        
        return `
            <div class="contact-page">
                <div class="catalogue-hero">
                    <div class="catalogue-hero-content">
                        <span class="hero-icon">📞</span>
                        <h1>Let's Connect</h1>
                        <p>Ready to bring your vision to life? Reach out to us today.</p>
                    </div>
                </div>
                
                <section>
                    <div class="contact-wrapper">
                        <div class="contact-info">
                            <h3>We'd Love to Hear From You</h3>
                            <p>Whether you have a project in mind or just want to say hello, we're here to help.</p>
                            
                            <div class="contact-details">
                                <div class="contact-detail">
                                    <i class="fas fa-envelope"></i>
                                    <div>
                                        <strong>Email Us</strong>
                                        <p>${config.site.email}</p>
                                    </div>
                                </div>
                                <div class="contact-detail">
                                    <i class="fas fa-phone-alt"></i>
                                    <div>
                                        <strong>Call Us</strong>
                                        <p>${config.site.phone}</p>
                                    </div>
                                </div>
                                <div class="contact-detail">
                                    <i class="fab fa-whatsapp"></i>
                                    <div>
                                        <strong>WhatsApp</strong>
                                        <p>${config.site.whatsappNumber}</p>
                                    </div>
                                </div>
                                <div class="contact-detail">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <div>
                                        <strong>Visit Us</strong>
                                        <p>${config.site.address}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="business-hours">
                                <h4><i class="fas fa-clock"></i> Business Hours</h4>
                                <p>${config.contact.businessHours}</p>
                            </div>
                            
                            <div class="social-links">
                                <h4>Follow Us</h4>
                                <div class="social-icons">
                                    <a href="${config.site.instagram}" target="_blank" aria-label="Instagram">
                                        <i class="fab fa-instagram"></i>
                                    </a>
                                    <a href="${config.site.facebook}" target="_blank" aria-label="Facebook">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="https://wa.me/${config.site.whatsappNumber}" target="_blank" aria-label="WhatsApp">
                                        <i class="fab fa-whatsapp"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <form class="contact-form" id="contactForm">
                            <h3>Send Us a Message</h3>
                            <div class="form-group">
                                <input type="text" id="contactName" placeholder="Your Name" required>
                            </div>
                            <div class="form-group">
                                <input type="email" id="contactEmail" placeholder="Email Address" required>
                            </div>
                            <div class="form-group">
                                <input type="tel" id="contactPhone" placeholder="Phone Number (optional)">
                            </div>
                            <div class="form-group">
                                <select id="contactService" required>
                                    <option value="">Select a Service</option>
                                    <option value="Graphics Design">Graphics Design</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Clothing">Clothing & Merch</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <textarea id="contactMessage" rows="5" placeholder="Tell us about your project..." required></textarea>
                            </div>
                            <button type="submit" class="btn-primary" style="width: 100%;">
                                Send Message <i class="fas fa-paper-plane"></i>
                            </button>
                            <p id="formFeedback" class="form-feedback"></p>
                        </form>
                    </div>
                </section>
                
                <section class="map-section">
                    <div class="section-header">
                        <div class="subtitle">Find Us</div>
                        <h2>Our Location</h2>
                    </div>
                    <div class="map-container">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121910.7616912222!2d31.029966!3d-17.825166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a5b5c7c8d6f3%3A0x5c8b7e2d8e9f4a3!2sHarare%2C%20Zimbabwe!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s" 
                            width="100%" 
                            height="400" 
                            style="border:0; border-radius: 24px;" 
                            allowfullscreen="" 
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </section>
            </div>
        `;
    },
    
    afterLoad() {
        const form = document.getElementById('contactForm');
        const feedback = document.getElementById('formFeedback');
        
        if (form) {
        // Pre-select service from URL param (supports both search and hash query)
        const getHashQueryParam = (param) => {
            const hash = window.location.hash;
            const queryIndex = hash.indexOf('?');
            if (queryIndex === -1) return null;
            const params = new URLSearchParams(hash.slice(queryIndex + 1));
            return params.get(param);
        };
        const serviceFromUrl = getHashQueryParam('service');
        if (serviceFromUrl) {
            const serviceSelect = document.getElementById('contactService');
            const options = Array.from(serviceSelect.options).map(o => o.value);
            if (options.includes(serviceFromUrl)) {
                serviceSelect.value = serviceFromUrl;
            }
        }
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            const service = document.getElementById('contactService').value;
            const message = document.getElementById('contactMessage').value;
            
            // Validate
            if (!name || !email || !service || !message) {
                this.showFeedback('Please fill in all required fields', 'error');
                return;
            }
            
            if (!window.helpers.isValidEmail(email)) {
                this.showFeedback('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Create WhatsApp message
            const whatsappMessage = `*NEW INQUIRY - TS BRANDS ZIM*\n\n` +
                `*Name:* ${name}\n` +
                `*Email:* ${email}\n` +
                `*Phone:* ${phone || 'Not provided'}\n` +
                `*Service:* ${service}\n\n` +
                `*Message:*\n${message}\n\n` +
                `_Sent from TS Brands Zim Website_`;
            
            // Open WhatsApp
            const whatsappUrl = `https://wa.me/${window.SITE_CONFIG.site.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            
            // Track service inquiry
            if (window.InquiryTracker && service) {
                const serviceMap = {
                    'Graphics Design': 'graphics',
                    'Photography': 'photography',
                    'Clothing': 'clothing',
                    'Other': 'general'
                };
                const serviceKey = serviceMap[service] || 'general';
                window.InquiryTracker.track(serviceKey, Date.now(), `${service} - ${name}`);
            }

            // Show success message
            this.showFeedback('Message sent! We\'ll respond within 24 hours.', 'success');
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Optional: Store in localStorage for offline
            const inquiry = { name, email, phone, service, message, date: new Date().toISOString() };
            const inquiries = JSON.parse(localStorage.getItem('ts_brands_inquiries') || '[]');
            inquiries.push(inquiry);
            localStorage.setItem('ts_brands_inquiries', JSON.stringify(inquiries));
        });
        }
        
        // Animate contact details on scroll
        const contactDetails = document.querySelectorAll('.contact-detail, .business-hours, .social-links');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        contactDetails.forEach(detail => observer.observe(detail));
    },
    
    showFeedback(message, type) {
        const feedback = document.getElementById('formFeedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.className = `form-feedback ${type}`;
            setTimeout(() => {
                feedback.textContent = '';
                feedback.className = 'form-feedback';
            }, 5000);
        }
    }
};