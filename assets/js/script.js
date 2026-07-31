// ============================================
// RUMAH KHITAN KAK TOPA - Main JavaScript
// ============================================

// ============================================
// RESERVASI MODAL
// ============================================
function openReservasiModal(packageName) {
    const modal = document.getElementById('reservasi-modal');
    const panel = document.getElementById('reservasi-modal-panel');
    if (!modal || !panel) return;

    // Reset form
    const form = document.getElementById('booking-form');
    if (form) form.reset();

    // Pre-select package if given
    if (packageName) {
        const pkg = document.getElementById('modal-package');
        if (pkg) pkg.value = packageName;
    }

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Trigger animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            panel.classList.remove('scale-95', 'opacity-0', 'translate-y-4');
            panel.classList.add('scale-100', 'opacity-100', 'translate-y-0');
        });
    });
}

function closeReservasiModal() {
    const modal = document.getElementById('reservasi-modal');
    const panel = document.getElementById('reservasi-modal-panel');
    if (!modal || !panel) return;

    panel.classList.remove('scale-100', 'opacity-100', 'translate-y-0');
    panel.classList.add('scale-95', 'opacity-0', 'translate-y-4');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }, 300);
}

// ============================================
// RESERVATION FORM HANDLER
// ============================================
function handleBooking(event) {
    event.preventDefault();

    const form = event.target;
    
    // Get values
    const branch = form.branch.value; // 'bandung' or 'garut'
    const parentName = form.parentName.value;
    const childName = form.childName.value;
    const packageChoice = form.package.value;
    const bookingDate = form.bookingDate.value;

    // Determine WhatsApp number
    let waNumber = '6285196049990';
    let branchName = 'Bandung Barat';
    if (branch === 'garut') {
        waNumber = '6281220224867';
        branchName = 'Garut';
    }

    // Format Date
    let formattedDate = bookingDate;
    if (bookingDate) {
        const d = new Date(bookingDate);
        formattedDate = d.toLocaleDateString('id-ID', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    // Construct Message
    const text = `Halo Admin Rumah Khitan Kak Topa (Cabang ${branchName}),\n\nSaya ingin mendaftar khitan dengan detail sebagai berikut:\n\n*Data Pasien:*\n- Nama Orang Tua/Wali: ${parentName}\n- Nama & Usia Anak: ${childName}\n- Pilihan Paket: ${packageChoice}\n- Rencana Tanggal: ${formattedDate}\n\nMohon informasi lebih lanjut mengenai ketersediaan jadwal. Terima kasih.`;

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

    // Open WhatsApp
    window.open(waUrl, '_blank');

    // Close modal after sending
    closeReservasiModal();
}

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initFAQ();
    initCounters();
    initSmoothScroll();

    // Close reservasi modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeReservasiModal();
    });
});



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
