// ============================================
// TS BRANDS ZIM - MASTER CONFIGURATION
// EDIT THIS FILE TO UPDATE ALL CONTENT
// ============================================

const SITE_CONFIG = {
    // Global Site Settings
    site: {
        name: "TS BRANDS ZIM",
        tagline: "Design. Capture. Wear.",
        description: "Premium creative agency",
        whatsappNumber: "263778636520",
        email: "hello@tsbrandszim.com",
        phone: "+263 77 123 4567",
        address: "Harare, Zimbabwe",
        instagram: "https://instagram.com/tsbrandszim",
        facebook: "https://facebook.com/tsbrandszim",
        YouTube: "https://youtube.com/tsbrandszim"
    },

    // ========== GRAPHICS DESIGN SECTION ==========
    graphics: {
        name: "TS GraphicsZim",
        icon: "",
        tagline: "Design.Print.Brand",
heroImage: "assets/banners/ts walll.png",
        heroVideo: null, // optional video background
        
        // Banner content
        banner: {
            title: "<span class='highlight'>Shaping Visuals, Maximizing Visibility</span>",
            subtitle: "Professional logos, visual identities & marketing materials",
            ctaText: "View Graphics",
            ctaLink: "graphics",
            secondaryCtaText: "Get Quote",
            secondaryCtaLink: "contact"
        },
        
       
        
        // Portfolio items
        portfolio: [
            { id: 1, title: "Brand Identity Package", category: "Branding", price: "$800", image: "assets/Treta Mesah/32.png", description: "Complete visual identity for a luxury brand" },
            { id: 2, title: "Social Media Campaign", category: "Digital", price: "$300", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&fit=crop", description: "20+ custom designs for social media" },
            { id: 3, title: "Packaging Design", category: "Packaging", price: "$500", image: "https://images.unsplash.com/photo-1532123675048-773bd75df1b4?w=800&fit=crop", description: "Premium product packaging suite" },
            { id: 4, title: "Restaurant Menu", category: "Print", price: "$200", image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&fit=crop", description: "Full menu design with illustrations" },
            { id: 5, title: "Business Card Set", category: "Print", price: "$150", image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&fit=crop", description: "Premium business card collection" },
            { id: 6, title: "E-commerce Branding", category: "Branding", price: "$1,200", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&fit=crop", description: "Complete online store identity" }
        ]
    },

    // ========== PHOTOGRAPHY SECTION ==========
    photography: {
        name: "Treta Semah Media",
        icon: "",
        tagline: "",
        heroImage: "assets/Treta Mesah/32.png",
        
        banner: {
            title: "<span class='highlight'>Capture and Create Prospects</span>",
            subtitle: "Studio portraits, events, product shoots & weddings",
            ctaText: "View Photography",
            ctaLink: "photography",
            secondaryCtaText: "Book Session",
            secondaryCtaLink: "contact"
        },
        
       
        
        portfolio: [
            { id: 1, title: "Editorial Portrait", category: "Portrait", price: "$200", image: "assets/Treta Mesah/32.png", description: "Studio portrait series for magazine" },
            { id: 2, title: "Wedding Coverage", category: "Wedding", price: "$1,200", image: "assets/Treta Mesah/37.png", description: "Full day wedding photography" },
            { id: 3, title: "Product Shoot", category: "Commercial", price: "$350", image: "assets/Treta Mesah/36.png", description: "E-commerce product photography" },
            { id: 4, title: "Fashion Editorial", category: "Fashion", price: "$600", image: "assets/Treta Mesah/35.png", description: "Magazine style fashion shoot" },
            { id: 5, title: "Corporate Headshots", category: "Corporate", price: "$300", image: "assets/Treta Mesah/31.jpg", description: "Professional team portraits" },
            { id: 6, title: "Event Documentation", category: "Event", price: "$500", image: "assets/Treta Mesah/30.jpg", description: "Full event coverage" }
        ]
    },

    // ========== CLOTHING SECTION ==========
    clothing: {
        name: "TS Clothing",
        icon: "",
        tagline: "Dress Like a Prospect",
        heroImage: "assets/TS Clothing/2.jpg",
        
        banner: {
            title: "<span class='highlight'>Custom Apparel</span><br>For Your Brand",
            subtitle: "Premium t-shirts, hoodies, caps & corporate kits",
            ctaText: "Shop Clothing",
            ctaLink: "clothing",
            secondaryCtaText: "Custom Order",
            secondaryCtaLink: "contact"
        },

        products: [
            { id: 1, title: "Signature Hoodie", category: "Hoodies", price: 65, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&fit=crop", description: "Premium cotton, embroidered logo", sizes: ["S", "M", "L", "XL"], colors: ["Black", "White", "Gray"], tags: ["Signature"] },
            { id: 2, title: "Branded T-Shirt", category: "T-Shirts", price: 30, image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&fit=crop", description: "Screen printed, 100% cotton", sizes: ["S", "M", "L", "XL"], colors: ["Black", "White", "Navy"], tags: ["Style"] },
            { id: 3, title: "Streetwear Cap", category: "Accessories", price: 25, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&fit=crop", description: "Custom embroidered cap", sizes: ["One Size"], colors: ["Black", "Navy", "Olive"], tags: ["Style"] },
            { id: 4, title: "Corporate Kit", category: "Bundles", price: 80, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&fit=crop", description: "Shirt + Cap + Notebook bundle", sizes: ["M", "L", "XL"], colors: ["Black"], tags: ["Style"] },
            { id: 5, title: "Premium Sweatshirt", category: "Hoodies", price: 75, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&fit=crop", description: "Heavyweight fleece sweatshirt", sizes: ["S", "M", "L", "XL"], colors: ["Gray", "Black", "Cream"], tags: ["Premium"] },
            { id: 6, title: "Performance Tee", category: "T-Shirts", price: 35, image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&fit=crop", description: "Moisture-wicking athletic fit", sizes: ["S", "M", "L", "XL"], colors: ["Black", "Red", "Blue"], tags: ["Style"] }
        ]
    },

    // ========== PORTFOLIO (All Categories Combined) ==========
    portfolio: {
        featured: [1, 2, 3], // IDs of featured items to show on home
        categories: ["All", "Branding", "Digital", "Print", "Portrait", "Wedding", "Fashion", "Hoodies", "T-Shirts", "Accessories"]
    },

    // ========== ABOUT PAGE ==========
    about: {
        story: "Ts Brands Zim was founded with a simple mission: to bring world-class creative services to Zimbabwe and beyond. What started as a small design studio has grown into a full-service creative agency specializing in graphics design, photography, and custom clothing.",
        mission: "To empower businesses and individuals with bold, authentic creative solutions that stand out in a crowded marketplace.",
        values: [
            { icon: "fa-heart", title: "Creativity First", description: "We push boundaries and think differently" },
            { icon: "fa-handshake", title: "Client Partnership", description: "Your success is our success" },
            { icon: "fa-gem", title: "Quality Obsession", description: "No shortcuts, only excellence" },
            { icon: "fa-globe-africa", title: "Punctuality", description: "Respecting your Schedule, Guaranteeing On-Time Delivery" }
        ],
        team: [
             ],
        stats: [
            { number: 150, suffix: "+", label: "Projects Completed" },
            { number: 80, suffix: "+", label: "Happy Clients" },
            { number: 7, suffix: "+", label: "Years of Excellence" },
            { number: 24, suffix: "hr", label: "Customer Support" }
        ]
    },

    // ========== HOME PAGE FEATURED CONTENT ==========
    home: {
        heroSlides: [
            { category: "graphics", badge: "TS GraphicsZim", title: "<span class='highlight'>Design.Print.Brand</span>", subtitle: "Shaping Visuals, Maximizing Visibility", ctaText: "View Graphics", ctaLink: "graphics", image: "assets/TS Graphics/1.png" },
            { category: "photography", badge: "Treta Semah Media", title: "<span class='highlight'>Capture and Create Prospects</span>", subtitle: "Outdoor Shoots, Indoor Shoots, Product shoots & Events", ctaText: "View Photography", ctaLink: "photography", image: "assets/Treta Mesah/33.jpg" },
            { category: "clothing", badge: "TS Clothing", title: "<span class='highlight'>Dress Like a Prospect</span>", subtitle: "Streetwear,Formal wear, Infant Clothes, Corporate Kids", ctaText: "Shop Clothing", ctaLink: "clothing", image: "assets/TS Clothing/34.jpg" }
        ],
        // Left intentionally empty: Featured items are generated dynamically
        // by InquiryTracker.getRankedFeaturedItems() from:
        // - SITE_CONFIG.graphics.portfolio (top 3)
        // - SITE_CONFIG.photography.portfolio (top 3)
        // - SITE_CONFIG.clothing.products (top 3)
        featuredCarousel: [],

        testimonials: [
            { name: "John Moyo", company: "TechHub ZW", text: "TS Brands transformed our brand identity completely. The team is professional and creative!", rating: 5, image: "https://randomuser.me/api/portraits/men/4.jpg" },
            { name: "Lisa Ndlovu", company: "AfroChic", text: "Best photography experience ever. They captured our vision perfectly!", rating: 5, image: "https://randomuser.me/api/portraits/women/5.jpg" },
            { name: "David Chikwanha", company: "StreetWear Zim", text: "The custom hoodies are incredible quality. Our customers love them!", rating: 5, image: "https://randomuser.me/api/portraits/men/6.jpg" }
        ]
    },

    // ========== CONTACT PAGE ==========
    contact: {
        formFields: [
            { name: "name", type: "text", placeholder: "Your Name", required: true },
            { name: "email", type: "email", placeholder: "Email Address", required: true },
            { name: "phone", type: "tel", placeholder: "Phone Number (optional)", required: false },
            { name: "service", type: "select", placeholder: "Service Interested In", options: ["Graphics Design", "Photography", "Clothing", "Other"], required: true },
            { name: "message", type: "textarea", placeholder: "Tell us about your project", required: true }
        ],
        businessHours: "Monday - Friday: 6:30am - 8pm<br>Saturday: 10am - 7pm<br>Sunday: Closed"
    }
};

// Make config globally available
window.SITE_CONFIG = SITE_CONFIG;