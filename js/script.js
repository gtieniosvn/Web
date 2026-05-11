// Loading
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 800);
});

// Back to Top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    observer.observe(statsSection);
}

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 15, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== PHONE MOCKUP ANIMATION =====
const chatMessages = document.querySelectorAll('.chat-msg');
chatMessages.forEach((msg, index) => {
    msg.style.opacity = '0';
    msg.style.transform = 'translateX(-20px)';
    msg.style.animation = `slideIn 0.5s ease-out ${index * 0.5}s forwards`;
});

// Add keyframe dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT ON HERO =====
const heroImage = document.querySelector('.hero-image');
window.addEventListener('mousemove', (e) => {
    if (!heroImage) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    
    heroImage.style.transform = `translate(${x}px, ${y}px)`;
});

// ===== PRICING CARD HOVER =====
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        document.querySelectorAll('.pricing-card.featured').forEach(fc => {
            fc.style.transform = 'scale(1.02)';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        document.querySelectorAll('.pricing-card.featured').forEach(fc => {
            fc.style.transform = 'scale(1.05)';
        });
    });
});

// ===== LAZY LOAD ANIMATIONS =====
const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .step');
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            animationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    animationObserver.observe(el);
});

// ===== CLICK TO TELEGRAM TRACKING =====
document.querySelectorAll('a[href*="t.me"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('User clicked Telegram link:', link.href);
        // Có thể thêm Google Analytics hoặc tracking khác ở đây
    });
});

console.log('🚀 Bot Check SĐT - Website ready!');
console.log('👤 Admin: @trangiatien33');
