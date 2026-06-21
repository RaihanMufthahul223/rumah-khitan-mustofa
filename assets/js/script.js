// ============================================
// RUMAH KHITAN MUSTOPA - Main JavaScript
// ============================================

// ============================================
// BRANCH DATA CONFIGURATION
// ============================================
const branchData = (typeof CONFIG !== 'undefined' && CONFIG.branches) ? CONFIG.branches : {
    bandung: {
        name: 'Cabang Bandung',
        'clinic-location': 'Klinik Khitan Modern di Bandung Barat',
        'address': 'Bandung Barat, Jawa Barat',
    },
    garut: {
        name: 'Cabang Garut',
        'clinic-location': 'Klinik Khitan Modern di Garut',
        'address': 'Garut, Jawa Barat',
    }
};

// ============================================
// BRANCH SELECTION FUNCTION (global scope)
// ============================================
function selectBranch(branch) {
    const overlay = document.getElementById('branch-overlay');
    if (!overlay) return;

    // Store selection
    sessionStorage.setItem('selectedBranch', branch);

    // Apply branch-specific text
    applyBranchData(branch);

    // Update branch labels in navbar
    updateBranchLabels(branch);

    // Animate out the overlay
    overlay.classList.add('branch-exit');

    // Remove overlay from DOM after animation
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }, 600);
}

function switchBranch() {
    const overlay = document.getElementById('branch-overlay');
    if (!overlay) return;

    // Clear saved selection
    sessionStorage.removeItem('selectedBranch');

    // Reset overlay animation classes
    overlay.classList.remove('branch-exit');
    overlay.style.display = '';
    document.body.style.overflow = 'hidden';

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');
    const menuLabel = document.getElementById('menu-label');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
        if (menuLabel) menuLabel.textContent = 'Menu';
    }

    // Scroll to top
    window.scrollTo({ top: 0 });
}

function updateBranchLabels(branch) {
    const data = branchData[branch];
    if (!data) return;

    const desktopLabel = document.getElementById('branch-label-desktop');
    const mobileLabel = document.getElementById('branch-label-mobile');

    if (desktopLabel) desktopLabel.textContent = data.name;
    if (mobileLabel) mobileLabel.textContent = data.name + ' — Ganti';
}

function applyBranchData(branch) {
    const data = branchData[branch];
    if (!data) return;

    // 1. Update text elements
    document.querySelectorAll('[data-branch-text]').forEach(el => {
        const key = el.getAttribute('data-branch-text');
        if (data[key]) {
            el.textContent = data[key];
        }
    });

    // 2. Update image elements
    document.querySelectorAll('[data-branch-img]').forEach(el => {
        const key = el.getAttribute('data-branch-img');
        if (data[key]) {
            el.setAttribute('src', data[key]);
        }
    });

    // 3. Update link elements (href)
    document.querySelectorAll('[data-branch-link]').forEach(el => {
        const key = el.getAttribute('data-branch-link');
        if (data[key]) {
            el.setAttribute('href', data[key]);
        }
    });

    // 4. Update Google Maps Embed Iframe
    const mapIframe = document.getElementById('map-iframe');
    if (mapIframe && data.googleMapsEmbedUrl) {
        mapIframe.setAttribute('src', data.googleMapsEmbedUrl);
    }

    // 5. Dynamic WhatsApp Link Number Replacement
    if (data.whatsappNumber) {
        document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
            let href = a.getAttribute('href');
            if (href) {
                // Replace phone number in wa.me/NUMBER or phone=NUMBER
                href = href.replace(/wa\.me\/[0-9]+/, `wa.me/${data.whatsappNumber}`);
                href = href.replace(/phone=[0-9]+/, `phone=${data.whatsappNumber}`);
                a.setAttribute('href', href);
            }
        });
    }

    // 6. Dynamic Telephone Link Number Replacement
    if (data.whatsappNumber) {
        document.querySelectorAll('a[href^="tel:"]').forEach(a => {
            a.setAttribute('href', `tel:+${data.whatsappNumber}`);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initBranchSelector();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initFAQ();
    initCounters();
    initSmoothScroll();
});

// ============================================
// BRANCH SELECTOR INIT
// ============================================
function initBranchSelector() {
    const overlay = document.getElementById('branch-overlay');
    const savedBranch = sessionStorage.getItem('selectedBranch');

    if (savedBranch && overlay) {
        // Branch already selected, skip overlay
        overlay.style.display = 'none';
        applyBranchData(savedBranch);
        updateBranchLabels(savedBranch);
    } else if (overlay) {
        // Show overlay and prevent scrolling
        document.body.style.overflow = 'hidden';
    }
}

// ============================================
// NAVBAR SCROLL BEHAVIOR
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    updateNavbar();
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');
    const menuLabel = document.getElementById('menu-label');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !mobileMenu) return;

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
        mobileMenu.classList.toggle('hidden', !isOpen);
        iconOpen.classList.toggle('hidden', isOpen);
        iconClose.classList.toggle('hidden', !isOpen);
        
        // Toggle label text for older users
        if (menuLabel) {
            menuLabel.textContent = isOpen ? 'Tutup' : 'Menu';
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isOpen) {
                toggleMenu();
            }
        });
    });

    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isOpen) {
            toggleMenu();
        }
    });
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.style.animationDelay || '0s';
                const delayMs = parseFloat(delay) * 1000;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delayMs);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');

        if (!toggle || !content) return;

        toggle.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const otherContent = other.querySelector('.faq-content');
                    if (otherContent) {
                        otherContent.style.maxHeight = '0';
                        otherContent.classList.add('hidden');
                    }
                    const otherToggle = other.querySelector('.faq-toggle');
                    if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = '0';
                setTimeout(() => content.classList.add('hidden'), 400);
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                content.classList.remove('hidden');
                content.style.maxHeight = content.scrollHeight + 'px';
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.round(startValue + (target - startValue) * easedProgress);

        if (target >= 1000) {
            element.textContent = current.toLocaleString('id-ID') + '+';
        } else {
            element.textContent = current + '+';
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
