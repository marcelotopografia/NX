// Sticky Navbar on Scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > window.innerHeight * 0.6) {
            navbar.classList.add('past-hero');
        } else {
            navbar.classList.remove('past-hero');
        }
    }
});

// Mobile Menu Toggle
const mobileMenuIcon = document.getElementById('mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change icon between menu and close and update a11y
        const icon = mobileMenuIcon.querySelector('ion-icon');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('name', 'close-outline');
            mobileMenuIcon.setAttribute('aria-expanded', 'true');
        } else {
            icon.setAttribute('name', 'menu-outline');
            mobileMenuIcon.setAttribute('aria-expanded', 'false');
        }
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileMenuIcon) {
            const icon = mobileMenuIcon.querySelector('ion-icon');
            if (icon) icon.setAttribute('name', 'menu-outline');
            mobileMenuIcon.setAttribute('aria-expanded', 'false');
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Run animation only once
        }
    });
}, observerOptions);

// Select all elements to animate
const animatedElements = document.querySelectorAll('.fade-up, .fade-in-left, .fade-in-right');
animatedElements.forEach(el => observer.observe(el));

// Form Submission handling (prevent default for demo)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! (Demonstração)');
        contactForm.reset();
    });
}
