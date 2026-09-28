/**
 * ============================================================================
 * CHERRY MERRY — GOURMET TUTTI FRUTTI LANDING PAGE SCRIPT
 * ============================================================================
 * Clean, modular Vanilla JavaScript:
 * 1. State Management (Cart items, active review index)
 * 2. Dynamic Sticky Navbar on Scroll
 * 3. Mobile Navigation Menu Toggle
 * 4. Interactive Testimonial Slider (Dots, Controls & Auto-play)
 * 5. Slide-Over Cart Drawer & Pricing Computations
 * 6. Newsletter Subscription Form Handler
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. DYNAMIC NAVBAR SCROLL STYLING
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('mainNavbar');
  
  function handleNavbarScroll() {
    // Add blurred, solid backdrop class when page scrolls past 30px
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check


  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when a navigation anchor is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }


  // --------------------------------------------------------------------------
  // 3. INTERACTIVE TESTIMONIAL SLIDER
  // --------------------------------------------------------------------------
  const sliderTrack = document.getElementById('reviewsSliderTrack');
  const sliderDotsContainer = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevReviewBtn');
  const nextBtn = document.getElementById('nextReviewBtn');
  const sliderWindow = document.getElementById('reviewsSliderWindow');

  const reviewCards = sliderTrack ? Array.from(sliderTrack.children) : [];
  let currentSlideIndex = 0;
  let autoplayTimer = null;

  // Initialize indicator dots dynamically based on number of review cards
  function initSliderDots() {
    if (!sliderDotsContainer) return;
    sliderDotsContainer.innerHTML = '';
    reviewCards.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to review ${index + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(index);
        restartAutoplay();
      });
      sliderDotsContainer.appendChild(dot);
    });
  }

  // Update slider position using CSS transform
  function updateSliderView() {
    if (!sliderTrack) return;
    sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

    // Update active dot indicator
    const dots = sliderDotsContainer ? sliderDotsContainer.querySelectorAll('.dot') : [];
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlideIndex);
    });
  }

  function goToSlide(index) {
    if (index < 0) {
      currentSlideIndex = reviewCards.length - 1;
    } else if (index >= reviewCards.length) {
      currentSlideIndex = 0;
    } else {
      currentSlideIndex = index;
    }
    updateSliderView();
  }

  function nextSlide() {
    goToSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentSlideIndex - 1);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });
  }

  // Auto-play slider every 6.5 seconds, paused on hover
  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 6500);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (sliderWindow) {
    sliderWindow.addEventListener('mouseenter', stopAutoplay);
    sliderWindow.addEventListener('mouseleave', startAutoplay);
  }

  initSliderDots();
  startAutoplay();


  // --------------------------------------------------------------------------
  // 4. CART SYSTEM (Add to Cart, Storage, Drawer, Counter)
  // --------------------------------------------------------------------------
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartCounter = document.getElementById('cartCounter');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartSubtotalVal = document.getElementById('cartSubtotalVal');
  const checkoutAmountVal = document.getElementById('checkoutAmountVal');
  const cartTotalItemsLabel = document.getElementById('cartTotalItemsLabel');
  const shippingThresholdText = document.getElementById('shippingThresholdText');
  const shippingProgressBar = document.getElementById('shippingProgressBar');

  // In-memory cart array: [{ id, name, price, img, quantity }]
  let cart = [];

  function openCart() {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (cartTriggerBtn) cartTriggerBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  // Global addToCart accessible by inline card buttons
  window.addToCart = function(id, name, price, img) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, price: Number(price), img, quantity: 1 });
    }
    renderCart();
    openCart();
  };

  // Modify quantity from cart drawer
  window.updateCartQty = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    renderCart();
  };

  // Remove item completely
  window.removeFromCart = function(id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
  };

  // Render UI updates for the cart
  function renderCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update Counter badge
    if (cartCounter) cartCounter.textContent = totalCount;
    if (cartTotalItemsLabel) cartTotalItemsLabel.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;
    if (cartSubtotalVal) cartSubtotalVal.textContent = `₹${subtotal}`;
    if (checkoutAmountVal) checkoutAmountVal.textContent = `₹${subtotal}`;

    // Free delivery progress (Threshold = ₹199)
    const FREE_SHIPPING_THRESHOLD = 199;
    if (shippingThresholdText && shippingProgressBar) {
      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        shippingThresholdText.innerHTML = `<span style="color: var(--color-emerald)">✓ You've unlocked Free Priority Artisanal Delivery!</span>`;
        shippingProgressBar.style.width = '100%';
      } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        shippingThresholdText.textContent = `Add ₹${remaining} more for Free Priority Delivery`;
        const percentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        shippingProgressBar.style.width = `${percentage}%`;
      }
    }

    // Toggle Empty State vs Item list
    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <p class="empty-icon">🛍️</p>
          <p class="empty-title">Your bag is empty</p>
          <p class="empty-desc">Explore the signature Red, Green, and Yellow collections above.</p>
        </div>
      `;
      return;
    }

    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</p>
          <div class="cart-qty-stepper">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="Remove item">✕</button>
      </div>
    `).join('');
  }

  // Handle Checkout Click
  window.handleCheckout = function() {
    if (cart.length === 0) {
      alert('Your cart is empty! Add a signature Tutti Frutti harvest edition first.');
      return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for choosing Cherry Merry! \nYour order of ₹${total} has been confirmed. Artisanal batch packaging is now underway.`);
    cart = [];
    renderCart();
    closeCart();
  };


  // --------------------------------------------------------------------------
  // 5. NEWSLETTER FORM HANDLER
  // --------------------------------------------------------------------------
  window.handleNewsletter = function(event) {
    event.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    const feedback = document.getElementById('newsletterFeedback');
    if (!emailInput || !feedback) return;

    const email = emailInput.value.trim();
    if (email) {
      feedback.style.color = '#10b981';
      feedback.textContent = `Welcome to the Baker's Digest, ${email}! Your 10% welcome coupon has been dispatched.`;
      emailInput.value = '';
      setTimeout(() => {
        feedback.textContent = '';
      }, 5000);
    }
  };

});
