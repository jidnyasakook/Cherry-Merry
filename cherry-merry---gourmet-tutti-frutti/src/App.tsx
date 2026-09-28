/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  ArrowRight,
  Check,
  X,
  Star,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  CheckCheck,
  Heart,
  Flame,
  ShieldCheck,
  Leaf,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
  Info
} from 'lucide-react';

// Import high-fidelity generated images
import heroImg from './assets/images/hero_tutti_frutti_luxury_1790614343705.jpg';
import redLineImg from './assets/images/product_red_line_1790614358944.jpg';
import greenLineImg from './assets/images/product_green_line_1790614371244.jpg';
import yellowLineImg from './assets/images/product_yellow_line_1790614383667.jpg';
import craftProcessImg from './assets/images/artisanal_craft_process_1790614394771.jpg';

// Type definitions
interface CartItem {
  id: string;
  name: string;
  line: string;
  price: number;
  image: string;
  quantity: number;
  accentColor: string;
}

interface Product {
  id: string;
  name: string;
  line: string;
  tagline: string;
  desc: string;
  price: number;
  weight: string;
  image: string;
  accentColor: string;
  accentBg: string;
  accentGlow: string;
  borderColor: string;
  flavorNotes: string[];
  ingredients: string;
  pairings: string;
}

export default function App() {
  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  // Active Review in Slider
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  // Selected Product for Quick Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Portfolio Code Modal State (for Computer Applications presentation)
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css' | 'js'>('html');
  const [copiedCode, setCopiedCode] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Dynamic Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Products Data
  const products: Product[] = [
    {
      id: 'red-line',
      name: 'Ruby Red Line',
      line: 'Red Line',
      tagline: 'Bold. Juicy. Timeless.',
      desc: 'Translucent ruby fruit gems infused with tart wild cherry essence and botanical beetroot extract. Imparts a luxurious jewel finish to holiday panettone, rich plum cakes, and gourmet cookies.',
      price: 45,
      weight: '100g artisanal jar',
      image: redLineImg,
      accentColor: '#ef233c',
      accentBg: 'rgba(239, 35, 60, 0.12)',
      accentGlow: 'rgba(239, 35, 60, 0.35)',
      borderColor: 'rgba(239, 35, 60, 0.4)',
      flavorNotes: ['Tart Wild Cherry', 'Pomegranate Glaze', 'Pure Cane Honey'],
      ingredients: 'Hand-diced Raw Green Papaya (Carica papaya), Pure Cane Sugar, Natural Beetroot Extract, Wild Cherry Botanical Essence, Citric Acid.',
      pairings: 'Classic Milanese Panettone, Rich Christmas Fruit Cake, Sourdough Hot Cross Buns, Dark Chocolate Florentines.'
    },
    {
      id: 'green-line',
      name: 'Zesty Green Line',
      line: 'Green Line',
      tagline: 'Zesty. Bright. Uplifting.',
      desc: 'Vibrant emerald fruit morsels imbued with crisp kaffir lime zest and botanical chlorophyll. Delivers a refreshing citrus spark to artisanal ice creams, pistachio tea cakes, and buttery brioche.',
      price: 45,
      weight: '100g artisanal jar',
      image: greenLineImg,
      accentColor: '#10b981',
      accentBg: 'rgba(16, 185, 129, 0.12)',
      accentGlow: 'rgba(16, 185, 129, 0.35)',
      borderColor: 'rgba(16, 185, 129, 0.4)',
      flavorNotes: ['Cold-Pressed Key Lime', 'Crisp Mint Leaf', 'Sweet Papaya Core'],
      ingredients: 'Hand-diced Raw Green Papaya, Pure Cane Sugar, Cold-Pressed Lime Peel Extract, Natural Spinach Chlorophyll, Spearmint Oil, Citric Acid.',
      pairings: 'Pistachio Sponge Cakes, Sicilian Cassata Gelato, Cardamom Brioche Rolls, Lemon Thyme Shortbreads.'
    },
    {
      id: 'yellow-line',
      name: 'Sunny Yellow Line',
      line: 'Yellow Line',
      tagline: 'Sunny. Sweet. Golden.',
      desc: 'Radiant golden amber cubes steeped with Alphonso mango nectar and sun-dried wild saffron essence. Brings sweet tropical warmth to sourdough inclusions, tea cookies, and festive mithai.',
      price: 45,
      weight: '100g artisanal jar',
      image: yellowLineImg,
      accentColor: '#f59e0b',
      accentBg: 'rgba(245, 158, 11, 0.12)',
      accentGlow: 'rgba(245, 158, 11, 0.35)',
      borderColor: 'rgba(245, 158, 11, 0.4)',
      flavorNotes: ['Alphonso Mango Nectar', 'Kashmiri Saffron', 'Golden Honey Cane'],
      ingredients: 'Hand-diced Raw Green Papaya, Pure Cane Sugar, Alphonso Mango Pulp, Pure Kashmiri Saffron Extract, Turmeric Essence, Citric Acid.',
      pairings: 'Royal Falooda, Shahi Cassata, Mango Almond Tartlets, Festive Mawa Cakes, Tropical Sourdough Bread.'
    }
  ];

  // Customer Reviews
  const reviews = [
    {
      id: 1,
      quote: "Cherry Merry’s Red Line completely solved our batter bleeding problem in Italian panettone. The crisp bite and natural cherry note are unmatched.",
      author: "Chef Ananya Sen",
      role: "Head Pastry Chef · Atelier Pâtisserie, Mumbai",
      rating: 5,
      avatarColor: "#ef233c",
      initials: "AS"
    },
    {
      id: 2,
      quote: "The Zesty Green gems give our citrus sourdough tea cakes an astonishing natural aroma. You can immediately taste the real cold-pressed lime zest.",
      author: "Vikramaditya Rathore",
      role: "Founder · The Sourdough Studio, Bengaluru",
      rating: 5,
      avatarColor: "#10b981",
      initials: "VR"
    },
    {
      id: 3,
      quote: "Switching from commercial synthetic tutti frutti to Cherry Merry doubled our repeat wholesale cake orders. Clients rave about the clean, non-rubbery snap.",
      author: "Meera Khurana",
      role: "Master Confectioner · Sweet Heritage, Delhi",
      rating: 5,
      avatarColor: "#f59e0b",
      initials: "MK"
    },
    {
      id: 4,
      quote: "The Golden Yellow line holds its integrity even at sub-zero temperatures in our Cassata gelato without turning into rock-hard ice crystals.",
      author: "Rohan Kulkarni",
      role: "Artisanal Gelatiere · Cuore di Gelato, Pune",
      rating: 5,
      avatarColor: "#f59e0b",
      initials: "RK"
    },
    {
      id: 5,
      quote: "The colors look like polished jewels on top of holiday fruitcakes and shortbread. At ₹45 a pack, it is pure accessible luxury for passionate home bakers.",
      author: "Tara D'Souza",
      role: "Food Stylist & Home Baker · Panaji, Goa",
      rating: 5,
      avatarColor: "#ef233c",
      initials: "TD"
    }
  ];

  // Slider Autoplay Effect
  useEffect(() => {
    if (isSliderPaused) return;
    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isSliderPaused, reviews.length]);

  // Cart Operations
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          line: product.line,
          price: product.price,
          image: product.image,
          quantity: 1,
          accentColor: product.accentColor
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeCartItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 199;
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckoutSuccess(true);
  };

  const confirmCheckout = () => {
    setShowCheckoutSuccess(false);
    setCart([]);
    setIsCartOpen(false);
  };

  // Copy Code Snippet
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  // Vanilla Source Snippets for Portfolio Inspection
  const vanillaHtmlSnippet = `<!-- CHERRY MERRY GOURMET TUTTI FRUTTI — PORTFOLIO HTML STRUCTURE -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cherry Merry | Premium Gourmet Tutti Frutti</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Sticky Header with Cart Counter -->
  <header class="navbar" id="mainNavbar">
    <div class="nav-container">
      <a href="#hero" class="brand-logo">
        <span class="logo-gem"></span>
        <span class="logo-text">CHERRY MERRY</span>
      </a>
      <nav class="nav-menu" id="navMenu">
        <a href="#story" class="nav-link">Our Story</a>
        <a href="#difference" class="nav-link">The Difference</a>
        <a href="#products" class="nav-link">Products</a>
        <a href="#reviews" class="nav-link">Reviews</a>
      </nav>
      <div class="nav-actions">
        <button class="cart-trigger-btn" id="cartTriggerBtn">
          <span class="cart-counter" id="cartCounter">0</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-section" id="hero">
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">Pure Ingredients. <br><span>Vibrant Margins.</span></h1>
        <p class="hero-subtitle">Premium Quality Crafted to Perfection...</p>
        <a href="#products" class="btn btn-primary">Shop the Collection</a>
      </div>
      <div class="hero-visual">
        <img src="images/hero_tutti_frutti.jpg" alt="Artisanal Tutti Frutti">
      </div>
    </div>
  </section>

  <!-- The Cherry Merry Difference (2-Column Problem vs Solution) -->
  <section class="difference-section" id="difference">
    <div class="difference-grid">
      <div class="diff-card card-problem">
        <h3>Synthetic & Bleached</h3>
        <!-- Mass-produced pain points -->
      </div>
      <div class="diff-card card-solution">
        <h3>100% Pure & Small-Batch</h3>
        <!-- Botanical standard features -->
      </div>
    </div>
  </section>

  <!-- 3 Signature Product Lines -->
  <section class="products-section" id="products">
    <div class="products-grid">
      <!-- Red Line, Green Line, Yellow Line Cards with ₹45 tags -->
    </div>
  </section>

  <!-- Interactive Testimonials Slider & Drawer -->
  <script src="script.js"></script>
</body>
</html>`;

  const vanillaCssSnippet = `/* CHERRY MERRY — MODULAR VANILLA CSS */
:root {
  --bg-dark: #0d0f12;
  --bg-card: #15181e;
  --color-ruby: #ef233c;
  --color-emerald: #10b981;
  --color-amber: #f59e0b;
}

/* Glassmorphism Sticky Navbar on Scroll */
.navbar {
  position: sticky;
  top: 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.navbar.scrolled {
  background: rgba(13, 15, 18, 0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* 2-Column Responsive Problem/Solution Grid */
.difference-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
@media (max-width: 900px) {
  .difference-grid { grid-template-columns: 1fr; }
}

/* Product Cards Hover Depth */
.product-card {
  background: var(--bg-card);
  border-radius: 20px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.product-card:hover {
  transform: translateY(-8px);
}`;

  const vanillaJsSnippet = `// CHERRY MERRY — VANILLA JS LOGIC
document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Navbar Scroll Styling
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Interactive Testimonials Slider with Autoplay & Pause on Hover
  let currentSlide = 0;
  const track = document.getElementById('reviewsSliderTrack');
  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = \`translateX(-\${currentSlide * 100}%)\`;
  }

  // 3. Cart State Management
  let cart = [];
  window.addToCart = function(id, name, price, img) {
    const item = cart.find(i => i.id === id);
    if (item) item.quantity++;
    else cart.push({ id, name, price, img, quantity: 1 });
    renderCart();
  };
});`;

  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#e6e8eb] font-sans selection:bg-[#ef233c]/30 selection:text-white relative">
      
      {/* =====================================================================
          1. STICKY TOP BAR (3-Zone Strict Contract + Portfolio Code Inspector)
          ===================================================================== */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0d0f12]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <span className="w-3 h-3 bg-gradient-to-tr from-[#ef233c] to-[#f59e0b] rotate-45 rounded-[2px] shadow-[0_0_12px_#ef233c] group-hover:scale-110 transition-transform"></span>
            <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-white/90">
              CHERRY MERRY
            </span>
          </a>

          {/* Zone 2: Navigation Links (Text with subtle hover state) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#story" className="hover:text-white transition-colors">Our Story</a>
            <a href="#difference" className="hover:text-white transition-colors">The Difference</a>
            <a href="#products" className="hover:text-white transition-colors">Products</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <button
              onClick={() => setShowCodeModal(true)}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-slate-200 transition-all cursor-pointer"
              title="Inspect Vanilla HTML/CSS/JS source code"
            >
              <Code2 className="w-3.5 h-3.5 text-[#ef233c]" />
              <span>Portfolio Code</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Cart Trigger) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ef233c] text-white text-[11px] font-bold min-w-5 h-5 rounded-full flex items-center justify-center px-1 shadow-[0_0_10px_rgba(239,35,60,0.5)]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="w-5 flex flex-col gap-1">
                <span className={`h-0.5 w-full bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`h-0.5 w-full bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-full bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#12151b] border-b border-white/10 px-6 py-4 flex flex-col gap-3">
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-1.5 text-slate-200">Our Story</a>
            <a href="#difference" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-1.5 text-slate-200">The Difference</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-1.5 text-slate-200">Products</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-1.5 text-slate-200">Reviews</a>
            <button
              onClick={() => { setMobileMenuOpen(false); setShowCodeModal(true); }}
              className="flex items-center justify-center gap-2 text-xs font-semibold py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-slate-200"
            >
              <Code2 className="w-4 h-4 text-[#ef233c]" />
              <span>Inspect Portfolio Source Code</span>
            </button>
          </div>
        )}
      </header>

      {/* =====================================================================
          2. HERO SECTION
          ===================================================================== */}
      <section id="hero" className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Ambient Atmospheric Light Glows */}
        <div className="absolute top-0 left-[-150px] w-[500px] h-[500px] bg-[#ef233c]/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-[20%] right-[-150px] w-[450px] h-[450px] bg-[#f59e0b]/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7">
              
              {/* Unboxed Metadata (Zero-Pill Discipline) */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef233c] shadow-[0_0_6px_#ef233c]"></span>
                <span className="text-slate-300">Artisanal Confectionery Co.</span>
                <span className="text-slate-600">·</span>
                <span>100% Botanical Extracts</span>
                <span className="text-slate-600">·</span>
                <span>Small Batch</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
                Pure Ingredients. <br />
                <span className="bg-gradient-to-r from-white via-[#ef233c] to-[#f59e0b] bg-clip-text text-transparent">
                  Vibrant Margins.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mb-8">
                Premium Quality Crafted to Perfection. Hand-diced heirloom green papaya steeped with cold-pressed fruit juices and pure cane sugar—reinventing tutti frutti for fine pastry chefs, artisanal gelaterias, and discerning bakers.
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#ef233c] to-[#c91830] text-white font-semibold text-base shadow-[0_10px_30px_rgba(239,35,60,0.35)] hover:shadow-[0_15px_40px_rgba(239,35,60,0.5)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Shop the Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#difference"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-200 font-medium text-base hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>The Difference</span>
                </a>
              </div>

              {/* Proof Metrics Bar */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-xl">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">100%</div>
                  <div className="text-xs text-slate-400 mt-1">Botanical Plant Dyes</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">220°C</div>
                  <div className="text-xs text-slate-400 mt-1">Bake-Stable Zero-Bleed</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">₹45</div>
                  <div className="text-xs text-slate-400 mt-1">Standard 100g Unit</div>
                </div>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#15181e] shadow-2xl group">
                <img
                  src={heroImg}
                  alt="Cherry Merry Gourmet Tutti Frutti in dark crystal coupe"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Scrim with Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12]/90 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0f1115]/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]"></span>
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">Artisanal Batch #042</p>
                      <p className="text-[11px] text-slate-400">Copper kettle slow-candied · Zero synthetic dyes</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-semibold">₹45</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          3. OUR STORY / ARTISANAL ROOTS (Context Section)
          ===================================================================== */}
      <section id="story" className="py-20 bg-[#101318] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img
                  src={craftProcessImg}
                  alt="Handcrafted tutti frutti preparation with botanical extracts"
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-xs font-medium text-slate-300">
                  <span>Farm-fresh green papaya diced within 24h of harvest</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-widest text-[#ef233c] uppercase mb-3">Our Heritage & Craft</p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
                Reclaiming Confectionery from Industrial Short-Cuts
              </h2>
              <p className="text-base text-slate-300 leading-relaxed mb-5">
                For over forty years, commercial tutti frutti had degenerated into a chemical casualty: rubbery cubes of bleached pulp steeped in petroleum-derived dyes and artificial essences that evaporated the moment an oven door closed.
              </p>
              <p className="text-base text-slate-300 leading-relaxed mb-6">
                At <strong>Cherry Merry</strong>, we asked a simple question: what if tutti frutti was treated like an authentic luxury preserve? We source crisp heirloom raw green papaya directly from pesticide-free orchards, precision dice every cube, and slow-infuse them in copper kettles with real botanical concentrates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-2.5">
                  <Leaf className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-white">Botanical Dyes</h3>
                    <p className="text-[12px] text-slate-400">Beetroot, chlorophyll & golden saffron</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Flame className="w-5 h-5 text-[#ef233c] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-white">Bake Integrity</h3>
                    <p className="text-[12px] text-slate-400">Stays crisp and doesn’t bleed in batters</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-white">Zero Preservatives</h3>
                    <p className="text-[12px] text-slate-400">Pure cane sugar cure, no sodium bisulfite</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          4. THE CHERRY MERRY DIFFERENCE (Problem vs Solution Matrix)
          ===================================================================== */}
      <section id="difference" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold tracking-widest text-[#ef233c] uppercase mb-2">The Standard of Excellence</p>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              The Cherry Merry Difference
            </h2>
            <p className="text-base text-slate-300">
              Why leading master bakers, patisseries, and dessert chefs are abandoning commercial synthetic sweets for our hand-crafted standard.
            </p>
          </div>

          {/* Two-Column Problem vs Solution Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Column 1: Mass-Produced Sweets (The Problem) */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#14171d] border border-red-500/20 hover:border-red-500/40 transition-colors">
              <div className="pb-6 mb-6 border-b border-white/10">
                <span className="text-xs font-bold tracking-wider uppercase text-red-400 mb-1.5 block">
                  Mass-Produced Commercial Sweets
                </span>
                <h3 className="font-display text-2xl font-bold text-white">Synthetic & Bleached</h3>
              </div>

              <ul className="space-y-5">
                <li className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✕
                  </span>
                  <div>
                    <strong className="text-white text-sm block mb-0.5">Petroleum Azo Dyes:</strong>
                    <span className="text-xs text-slate-400 leading-relaxed">
                      Artificial Red #40, Tartrazine, and Brilliant Blue leave metallic, bitter aftertastes and questionable health impacts.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✕
                  </span>
                  <div>
                    <strong className="text-white text-sm block mb-0.5">Batter Bleeding Halos:</strong>
                    <span className="text-xs text-slate-400 leading-relaxed">
                      High-moisture water syrups leach during baking, staining cakes and panettone dough with messy, unappealing halos.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✕
                  </span>
                  <div>
                    <strong className="text-white text-sm block mb-0.5">Sulphur Preservative Masking:</strong>
                    <span className="text-xs text-slate-400 leading-relaxed">
                      Bleached scrap pulp soaked in sodium metabisulfite to artificially prolong shelf life and disguise inferior fruit.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✕
                  </span>
                  <div>
                    <strong className="text-white text-sm block mb-0.5">Rubbery & Gelatinous Texture:</strong>
                    <span className="text-xs text-slate-400 leading-relaxed">
                      Tough, leathery chew that ruins pastry mouthfeel and turns soggy or rubbery under oven heat.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 2: Cherry Merry Artisanal Standard (The Solution) */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#141820] border border-emerald-500/25 hover:border-emerald-500/50 shadow-[0_10px_35px_rgba(16,185,129,0.08)] transition-colors relative">
              <div className="pb-6 mb-6 border-b border-white/10">
                <span className="text-xs font-bold tracking-wider uppercase text-[#10b981] mb-1.5 block">
                  The Cherry Merry Standard
                </span>
                <h3 className="font-display text-2xl font-bold text-white">100% Botanical & Small-Batch</h3>
              </div>

              <ul className="space-y-5">
                <li className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-[#10b981] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white text-sm block mb-0.5">Natural Botanical Extracts:</strong>
                    <span className="text-xs text-slate-300 leading-relaxed">
                      Real beetroot juice, spinach chlorophyll, and wild saffron provide luminous hues and clean fruit flavor.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-[#10b981] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white text-sm block mb-0.5">Zero-Bleed Crystallization:</strong>
                    <span className="text-xs text-slate-300 leading-relaxed">
                      Slow cane sugar osmotic curing locks color completely inside fruit fibers. Clean, pristine cake slices every bake.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-[#10b981] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white text-sm block mb-0.5">Direct Farm Heirloom Papaya:</strong>
                    <span className="text-xs text-slate-300 leading-relaxed">
                      Hand-inspected raw green papaya with optimal natural pectin content, diced cleanly to 6mm uniform jewels.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-[#10b981] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white text-sm block mb-0.5">Crisp Jewel Snap:</strong>
                    <span className="text-xs text-slate-300 leading-relaxed">
                      Pleasant tender resistance with an authentic fruit snap that preserves structure from freezing cold to 220°C oven heat.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================================
          5. PRODUCT ECOSYSTEM (3 Signature Lines with Stylized ₹45 Tags)
          ===================================================================== */}
      <section id="products" className="py-24 bg-[#0f1115] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold tracking-widest text-[#ef233c] uppercase mb-2">Signature Lines</p>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              The Gourmet Confectionery Ecosystem
            </h2>
            <p className="text-base text-slate-300">
              Three masterfully infused fruit lines formulated to make your artisanal creations look and taste extraordinary.
            </p>
          </div>

          {/* 3 Interactive Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <article
                key={product.id}
                className="group relative rounded-2xl bg-[#14171e] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  boxShadow: `0 10px 30px -15px ${product.accentGlow}`
                }}
              >
                {/* Visual Area */}
                <div className="relative aspect-[4/3] bg-black/40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Colored Vignette */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at bottom right, ${product.accentColor}, transparent 70%)`
                    }}
                  ></div>

                  {/* Stylized ₹45 Price Tag */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[#0d0f12]/90 backdrop-blur-md border border-white/15 shadow-lg flex items-baseline gap-1">
                    <span className="font-display text-lg font-extrabold text-white">₹{product.price}</span>
                    <span className="text-[11px] text-slate-400 font-sans">/ 100g</span>
                  </div>

                  {/* Quick Detail Trigger */}
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#0d0f12]/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-[#0d0f12] text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  
                  {/* Line Marker */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: product.accentColor, boxShadow: `0 0 8px ${product.accentColor}` }}
                    ></span>
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: product.accentColor }}
                    >
                      {product.line}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs text-slate-400">{product.flavorNotes[0]}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    {product.name}
                  </h3>

                  <p className="text-sm font-semibold italic text-slate-300 mb-3">
                    {product.tagline}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed mb-5 flex-grow">
                    {product.desc}
                  </p>

                  {/* Flavor Attributes */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.flavorNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Subtle Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer text-white"
                    style={{
                      background: product.accentBg,
                      border: `1px solid ${product.borderColor}`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = product.accentColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = product.accentBg;
                    }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart — ₹{product.price}</span>
                  </button>

                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================================
          6. CUSTOMER REVIEWS (Interactive Slider + Marquee)
          ===================================================================== */}
      <section id="reviews" className="py-24 relative overflow-hidden bg-[#0d0f12]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#ef233c] uppercase mb-2">Verified Kitchen Proof</p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Praised by Confectioners & Chefs
              </h2>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3 mt-6 md:mt-0">
              <div className="flex gap-1.5 mr-3">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReviewIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeReviewIndex === idx ? 'w-6 bg-[#ef233c]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveReviewIndex((prev) => (prev + 1) % reviews.length)}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Testimonial Slider Card */}
          <div
            className="relative rounded-2xl bg-[#14171f] border border-white/10 p-8 sm:p-12 transition-all duration-300 shadow-2xl"
            onMouseEnter={() => setIsSliderPaused(true)}
            onMouseLeave={() => setIsSliderPaused(false)}
          >
            <div className="flex items-center gap-1 text-amber-400 mb-6">
              {[...Array(reviews[activeReviewIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            <blockquote className="font-display text-xl sm:text-3xl text-white font-semibold leading-relaxed mb-8">
              "{reviews[activeReviewIndex].quote}"
            </blockquote>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-base shadow-md"
                style={{ backgroundColor: reviews[activeReviewIndex].avatarColor }}
              >
                {reviews[activeReviewIndex].initials}
              </div>
              <div>
                <p className="font-bold text-white text-base">
                  {reviews[activeReviewIndex].author}
                </p>
                <p className="text-xs text-slate-400">
                  {reviews[activeReviewIndex].role}
                </p>
              </div>
            </div>
          </div>

          {/* Continuous Marquee Ticker */}
          <div className="mt-16 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0d0f12] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0d0f12] to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee flex gap-6 py-2">
              {[...reviews, ...reviews].map((rev, index) => (
                <div
                  key={index}
                  className="w-[340px] shrink-0 p-5 rounded-xl bg-[#12151b] border border-white/10 flex flex-col justify-between"
                >
                  <p className="text-xs text-slate-300 italic mb-4 leading-relaxed">
                    "{rev.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: rev.avatarColor }}
                    >
                      {rev.initials}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">{rev.author}</p>
                      <p className="text-[10px] text-slate-400">{rev.role.split('·')[0]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          7. SLIDE-OUT CART DRAWER
          ===================================================================== */}
      {/* Backdrop */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 w-full max-w-md h-full bg-[#12151b] border-l border-white/10 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-white">Your Gourmet Bag</h3>
            <p className="text-xs text-slate-400">
              {totalCartCount} item{totalCartCount === 1 ? '' : 's'} selected
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-6 py-3 bg-[#0d0f12] border-b border-white/5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-300">
              {shippingRemaining === 0 ? (
                <span className="text-emerald-400 font-medium">✓ Free Artisanal Shipping Unlocked!</span>
              ) : (
                <>Add <strong className="text-white">₹{shippingRemaining}</strong> more for Free Shipping</>
              )}
            </span>
            <span className="text-slate-500 font-mono">Goal: ₹199</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ef233c] to-[#10b981] transition-all duration-300"
              style={{ width: `${Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Item List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-slate-500" />
              </div>
              <h4 className="font-display text-lg font-bold text-white mb-1">Your bag is empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mb-6">
                Discover our signature Ruby Red, Zesty Green, and Sunny Golden Yellow handcrafted editions.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer"
              >
                Browse Harvest Editions
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-black"
                />
                <div className="flex-grow">
                  <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                  <p className="text-xs text-slate-400 mb-2">₹{item.price} per 100g</p>
                  
                  {/* Stepper */}
                  <div className="inline-flex items-center rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="p-1 hover:bg-white/10 text-slate-300 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 text-xs font-semibold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1 hover:bg-white/10 text-slate-300 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-display font-bold text-sm text-white mb-2">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeCartItem(item.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0d0f12]">
            <div className="space-y-2 mb-4 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono text-white text-sm">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Artisanal Packaging</span>
                <span className="text-emerald-400 font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery</span>
                <span>{shippingRemaining === 0 ? 'FREE' : '₹40'}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ef233c] to-[#c91830] text-white font-bold text-sm shadow-[0_8px_25px_rgba(239,35,60,0.35)] hover:shadow-[0_12px_35px_rgba(239,35,60,0.5)] transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <span className="font-mono">₹{cartSubtotal + (shippingRemaining === 0 ? 0 : 40)}</span>
            </button>
          </div>
        )}
      </aside>

      {/* =====================================================================
          8. QUICK PRODUCT DETAIL MODAL
          ===================================================================== */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#14171f] border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full sm:w-44 aspect-square rounded-xl object-cover border border-white/10"
              />
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider block mb-1"
                  style={{ color: selectedProduct.accentColor }}
                >
                  {selectedProduct.line}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  {selectedProduct.name}
                </h3>
                <p className="text-sm italic font-medium text-slate-300 mb-3">
                  {selectedProduct.tagline}
                </p>
                <div className="font-display text-2xl font-extrabold text-white">
                  ₹{selectedProduct.price} <span className="text-xs text-slate-400 font-sans font-normal">/ {selectedProduct.weight}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-200 mb-1">Culinary Profile:</h4>
                <p className="text-slate-400 leading-relaxed">{selectedProduct.desc}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 mb-1">Pure Ingredients:</h4>
                <p className="text-slate-400 leading-relaxed font-mono text-[11px] bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                  {selectedProduct.ingredients}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 mb-1">Recommended Chef Pairings:</h4>
                <p className="text-slate-400 leading-relaxed">{selectedProduct.pairings}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="flex-grow py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                style={{ backgroundColor: selectedProduct.accentColor }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart — ₹{selectedProduct.price}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          9. CHECKOUT CONFIRMATION MODAL
          ===================================================================== */}
      {showCheckoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#14171f] border border-emerald-500/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-5">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">Order Confirmed!</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Thank you for ordering with <strong>Cherry Merry</strong>. Your artisanal harvest packs are being freshly packaged in copper-sealed glass jars for shipment.
            </p>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Order Reference:</span>
                <span className="font-mono text-white">#CM-84920</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Amount:</span>
                <span className="font-mono text-emerald-400 font-bold">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Arrival:</span>
                <span className="text-white">2-3 Business Days</span>
              </div>
            </div>
            <button
              onClick={confirmCheckout}
              className="w-full py-3 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm transition-all cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          10. PORTFOLIO SOURCE CODE MODAL (Computer Applications Showcase)
          ===================================================================== */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#12151b] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0e1014]">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-[#ef233c]" />
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Portfolio Source Code Inspector
                  </h3>
                  <p className="text-xs text-slate-400">
                    Clean, modular, heavily commented Vanilla HTML, CSS & JavaScript
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Code Tabs */}
            <div className="flex items-center justify-between px-6 py-2.5 bg-[#171a22] border-b border-white/10">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveCodeTab('html')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    activeCodeTab === 'html'
                      ? 'bg-[#ef233c] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  index.html
                </button>
                <button
                  onClick={() => setActiveCodeTab('css')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    activeCodeTab === 'css'
                      ? 'bg-[#ef233c] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  style.css
                </button>
                <button
                  onClick={() => setActiveCodeTab('js')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    activeCodeTab === 'js'
                      ? 'bg-[#ef233c] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  script.js
                </button>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/vanilla/index.html"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <span>Open Standalone HTML</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    const snippet =
                      activeCodeTab === 'html'
                        ? vanillaHtmlSnippet
                        : activeCodeTab === 'css'
                        ? vanillaCssSnippet
                        : vanillaJsSnippet;
                    handleCopyCode(snippet);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="flex-grow overflow-auto p-6 bg-[#090a0d] font-mono text-xs text-slate-300">
              <pre className="whitespace-pre leading-relaxed">
                {activeCodeTab === 'html' && vanillaHtmlSnippet}
                {activeCodeTab === 'css' && vanillaCssSnippet}
                {activeCodeTab === 'js' && vanillaJsSnippet}
              </pre>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#0e1014] border-t border-white/10 text-right">
              <span className="text-[11px] text-slate-400">
                Built for Computer Applications portfolio presentation · 100% Mobile Responsive
              </span>
            </div>

          </div>
        </div>
      )}

      {/* =====================================================================
          11. FOOTER SECTION
          ===================================================================== */}
      <footer className="bg-[#090a0d] border-t border-white/10 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
            
            {/* Brand Column */}
            <div className="md:col-span-5">
              <a href="#hero" className="flex items-center gap-2.5 mb-4 group">
                <span className="w-3 h-3 bg-gradient-to-tr from-[#ef233c] to-[#f59e0b] rotate-45 rounded-[2px] shadow-[0_0_12px_#ef233c]"></span>
                <span className="font-display font-extrabold text-xl tracking-tight text-white">
                  CHERRY MERRY
                </span>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
                Pure Ingredients. Vibrant Margins. The new artisanal benchmark for gourmet tutti frutti confectionery. Hand-diced raw green papaya, copper-kettle reduced, 100% botanical plant extracts.
              </p>
              <div className="text-xs text-slate-500">
                <p>© 2026 Cherry Merry Confections Inc.</p>
                <p className="mt-0.5">Crafted with precision for bakeries & dessert artisans.</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h4 className="font-display font-bold text-sm text-white mb-4">Harvest Editions</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#products" className="hover:text-white transition-colors">Ruby Red Line (Cherry & Beetroot)</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Zesty Green Line (Lime & Chlorophyll)</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Sunny Yellow Line (Mango & Saffron)</a></li>
                <li><a href="#difference" className="hover:text-white transition-colors">The Problem vs Solution Matrix</a></li>
                <li>
                  <button onClick={() => setShowCodeModal(true)} className="hover:text-white transition-colors cursor-pointer text-[#ef233c]">
                    View Portfolio Source Code (HTML/CSS/JS)
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="md:col-span-4">
              <h4 className="font-display font-bold text-sm text-white mb-2">Baker's Digest & Wholesale</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Subscribe for seasonal harvest releases, commercial bakery recipes, and volume pricing.
              </p>

              {newsletterSubscribed ? (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                  ✓ Welcome to the Baker's Digest! Your welcome 10% voucher code has been dispatched.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setNewsletterSubscribed(true);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-grow bg-[#15181e] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ef233c] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-lg bg-[#ef233c] hover:bg-[#c91830] text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}

              {/* Social Channels */}
              <div className="flex items-center gap-3 mt-6">
                {['Instagram', 'Pinterest', 'YouTube', 'LinkedIn'].map((platform, idx) => (
                  <span
                    key={idx}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400 hover:text-white hover:border-white/25 transition-all cursor-pointer"
                    title={platform}
                  >
                    {platform.slice(0, 2).toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
            <p>Cherry Merry Confections · Flat Price ₹45 per unit</p>
            <p className="mt-2 sm:mt-0">Computer Applications Project Showcase</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
