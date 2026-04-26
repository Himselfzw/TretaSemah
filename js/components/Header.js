// ============================================
// HEADER COMPONENT
// ============================================

class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupMobileMenu();
    }
    
    render() {
        this.innerHTML = `
            <header class="header" id="header">
                <div class="nav-container">
                    <div class="logo" data-page="home">
                        <img src="assets/TS LOGO.png" alt="TS Brands Zim Logo" class="logo-img">TS<span>BRANDS</span>ZIM
                    </div>
                    <div class="nav-links" id="navLinks">
                        <a data-page="home">Home</a>
                        <a data-page="graphics">Graphics Design</a>
                        <a data-page="photography">Photography</a>
                        <a data-page="clothing">Clothing</a>
                        <a data-page="portfolio">Portfolio</a>
                        <a data-page="about">About</a>
                        <a data-page="contact" class="nav-cta">Contact Us</a>
                    </div>
                    <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </header>
        `;
    }
    
    setupMobileMenu() {
        const menuBtn = this.querySelector('#mobileMenuBtn');
        const navLinks = this.querySelector('#navLinks');
        const header = this.querySelector('#header');
        
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuBtn.classList.toggle('active');
            });
        }
        
        // Close mobile menu when a nav link is clicked
        if (navLinks) {
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuBtn?.classList.remove('active');
                });
            });
        }
        
        // Scroll effect
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }
}

customElements.define('header-component', HeaderComponent);