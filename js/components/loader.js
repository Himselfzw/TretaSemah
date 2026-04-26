// ============================================
// LOADER COMPONENT
// ============================================

class LoaderComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    
    render() {
        this.innerHTML = `
            <div class="loader-overlay" id="globalLoader" style="display: none;">
                <div class="loader-container">
                    <div class="loader-ring"></div>
                    <div class="loader-text">Loading...</div>
                </div>
            </div>
        `;
    }
    
    show() {
        const loader = this.querySelector('#globalLoader');
        if (loader) {
            loader.style.display = 'flex';
        }
    }
    
    hide() {
        const loader = this.querySelector('#globalLoader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
}

customElements.define('loader-component', LoaderComponent);