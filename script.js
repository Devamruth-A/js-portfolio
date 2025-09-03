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

// --- NEW MODAL POPUP LOGIC ---
const detailsButtons = document.querySelectorAll('.details-button');
const modal = document.getElementById('project-modal');
if (modal) {
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalDesc = document.getElementById('modal-desc');
    const modalLinks = document.getElementById('modal-links');

    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const title = button.dataset.title;
            const image = button.dataset.image;
            const tags = button.dataset.tags.split(',');
            const desc = button.dataset.desc;
            const liveUrl = button.dataset.liveUrl;
            const sourceUrl = button.dataset.sourceUrl;

            modalImage.src = image;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;

            modalTags.innerHTML = '';
            tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'project-tag';
                tagElement.textContent = tag.trim();
                modalTags.appendChild(tagElement);
            });
            
            modalLinks.innerHTML = '';
            if (liveUrl && liveUrl !== '#') {
                const liveLink = document.createElement('a');
                liveLink.href = liveUrl;
                liveLink.textContent = 'Live Demo';
                liveLink.target = '_blank';
                modalLinks.appendChild(liveLink);
            }
            if (sourceUrl && sourceUrl !== '#') {
                const sourceLink = document.createElement('a');
                sourceLink.href = sourceUrl;
                sourceLink.textContent = 'Source Code';
                sourceLink.target = '_blank';
                modalLinks.appendChild(sourceLink);
            }

            modal.classList.add('show');
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
    };

    modalCloseButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// --- NEW IMAGE LIGHTBOX LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // This assumes the rest of your script is inside this event listener
    
    const modalImage = document.getElementById('modal-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    if (modalImage && lightbox && lightboxImage && lightboxClose) {
        // When the image inside the modal is clicked
        modalImage.addEventListener('click', () => {
            // Set the lightbox image source to the modal image source
            lightboxImage.src = modalImage.src;
            // Show the lightbox
            lightbox.classList.add('show');
        });

        // Function to close the lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('show');
        };

        // Close lightbox when the close button is clicked
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close lightbox when the overlay is clicked
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }
});