// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavLinkItems = document.querySelectorAll('.mobile-nav-link-item');

    if (mobileMenuIcon && mobileMenuOverlay && mobileMenuClose) {
        mobileMenuIcon.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('open');
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('open');
        });

        mobileNavLinkItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('open'); // Close menu when a link is clicked
            });
        });
    }

    // --- Dynamic Year for Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const animatedSections = document.querySelectorAll('.animated-section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        observer.observe(section);
    });

});