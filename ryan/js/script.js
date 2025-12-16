// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });
});

// Smooth Scrolling with Active Navigation
const sections = document.querySelectorAll('.section');

// Update active navigation on scroll
function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveNav);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.animationPlayState = 'paused';
    observer.observe(section);
});

// Smooth scroll to top on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
    
    // Start animations after a brief delay
    setTimeout(() => {
        sections.forEach(section => {
            section.style.animationPlayState = 'running';
        });
    }, 100);
});

// Add hover effects to images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.5s ease';
    });
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image-container');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
    }
});

// Add active state to contact cards on click
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Lightbox functionality for haircut images
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const barberImages = document.querySelectorAll('.barber-image');

const imageSources = [
    'images/haircut.png',
    'images/haircut-2.png',
    'images/haircut-3.png',
    'images/haircut-4.png'
];

let currentImageIndex = 0;

// Open lightbox when clicking on an image
barberImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightboxImage.src = imageSources[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body scrolling
    lightbox.scrollTop = 0; // Scroll lightbox to top
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    lightboxImage.src = imageSources[currentImageIndex];
    lightbox.scrollTop = 0; // Scroll to top when changing images
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
    lightboxImage.src = imageSources[currentImageIndex];
    lightbox.scrollTop = 0; // Scroll to top when changing images
}

// Event listeners for lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
});
