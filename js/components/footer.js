// ============================================
// FOOTER COMPONENT
// ============================================

class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    
    render() {
        const config = window.SITE_CONFIG;
        this.innerHTML = `
            <footer class="footer">
                <div class="footer-content">
                    <div class="footer-column">
                       <div class="logo" data-page="home">
                        <img src="assets/TS LOGO.png" alt="TS Brands Zim Logo" class="logo-img">TS<span>BRANDS</span>ZIM
                    </div>
                        <p style="color: var(--gray); margin-top: var(--spacing-md);">Design. Capture. Wear.<br>Creative agency based in Zimbabwe.</p>
                        <div class="social-links" style="margin-top: var(--spacing-lg);">
                            <a href="${config.site.instagram}" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="${config.site.facebook}" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://wa.me/${config.site.whatsappNumber}" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                        </div>
                    </div>
                    <div class="footer-column">
                        <h4>Quick Links</h4>
                        <ul class="footer-links">
                            <li><a data-page="home">Home</a></li>
                            <li><a data-page="graphics">Graphics Design</a></li>
                            <li><a data-page="photography">Photography</a></li>
                            <li><a data-page="clothing">Clothing</a></li>
                            <li><a data-page="portfolio">Portfolio</a></li>
                            <li><a data-page="about">About</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4>Contact Info</h4>
                        <ul class="footer-links">
                            <li><i class="fas fa-envelope" style="margin-right: 8px;"></i> ${config.site.email}</li>
                            <li><i class="fas fa-phone" style="margin-right: 8px;"></i> ${config.site.phone}</li>
                            <li><i class="fas fa-map-marker-alt" style="margin-right: 8px;"></i> ${config.site.address}</li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>© ${new Date().getFullYear()} TS Brands Zim. All rights reserved. | Designed in Zimbabwe</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-component', FooterComponent);