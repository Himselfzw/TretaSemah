// ============================================
// REUSABLE MODAL COMPONENT
// ============================================

class ModalComponent extends HTMLElement {
    static get observedAttributes() {
        return ['open', 'title'];
    }
    
    constructor() {
        super();
        this.modalId = this.getAttribute('id') || 'global-modal';
        this.isOpen = false;
    }
    
    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }
    
    render() {
        this.innerHTML = `
            <div class="modal" id="${this.modalId}">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${this.getAttribute('title') || 'Modal'}</h3>
                        <button class="modal-close-btn" aria-label="Close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        const modal = this.querySelector(`#${this.modalId}`);
        const closeBtn = this.querySelector('.modal-close-btn');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.close();
            });
        }
        
        // Listen for escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    open() {
        const modal = this.querySelector(`#${this.modalId}`);
        if (modal) {
            modal.classList.add('active');
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
        }
    }
    
    close() {
        const modal = this.querySelector(`#${this.modalId}`);
        if (modal) {
            modal.classList.remove('active');
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open') {
            if (newValue === 'true') {
                this.open();
            } else {
                this.close();
            }
        }
    }
    
    setContent(html) {
        const body = this.querySelector('.modal-body');
        if (body) {
            body.innerHTML = html;
        }
    }
}

customElements.define('modal-component', ModalComponent);