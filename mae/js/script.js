// Falling Leaves Animation
function createLeaves() {
    const leavesContainer = document.getElementById('leaves');
    const numberOfLeaves = 15; // Subtle amount
    
    for (let i = 0; i < numberOfLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        // Randomly assign one of the three leaf types
        const leafTypes = ['leaf1', 'leaf2', 'leaf3'];
        const randomLeaf = leafTypes[Math.floor(Math.random() * leafTypes.length)];
        leaf.classList.add(randomLeaf);
        
        // Random starting position
        leaf.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (slower for subtlety)
        const duration = 15 + Math.random() * 10; // 15-25 seconds
        leaf.style.animationDuration = duration + 's';
        
        // Random delay
        leaf.style.animationDelay = Math.random() * 10 + 's';
        
        // Random size variation (smaller)
        const size = 18 + Math.random() * 14;
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';
        
        leavesContainer.appendChild(leaf);
    }
}

// Navigation Active State
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Collapsible Sections
function initCollapsibles() {
    const collapsibleBtns = document.querySelectorAll('.collapsible-btn');
    
    collapsibleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

// Smooth Scroll with Offset
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 20;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize on Page Load
window.addEventListener('load', () => {
    createLeaves();
    initCollapsibles();
    updateActiveNav();
});

// Update nav on scroll
window.addEventListener('scroll', updateActiveNav);

// Add fade-in animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
