// DOM Elements
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const currentYear = document.getElementById('year');

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Scroll to Top Button
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Rotating Quotes for Home Page
const quotes = [
    {
        text: "Love is not about how many days, months, or years you've been together. Love is about how much you love each other every single day.",
        author: ""
    },
    {
        text: "A successful marriage requires falling in love many times, always with the same person.",
        author: "Mignon McLaughlin"
    },
    {
        text: "The best thing to hold onto in life is each other.",
        author: "Audrey Hepburn"
    },
    {
        text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
        author: "Maya Angelou"
    },
    {
        text: "Love is composed of a single soul inhabiting two bodies.",
        author: "Aristotle"
    }
];

function rotateQuotes() {
    const quoteContainer = document.querySelector('.quote-container');
    if (!quoteContainer) return;

    let currentQuote = 0;
    
    // Initial quote
    updateQuote();
    
    // Change quote every 5 seconds
    setInterval(() => {
        currentQuote = (currentQuote + 1) % quotes.length;
        updateQuote();
    }, 5000);
    
    function updateQuote() {
        const quote = quotes[currentQuote];
        const quoteHTML = `
            <p class="quote">"${quote.text}"</p>
            ${quote.author ? `<p class="quote-author">— ${quote.author}</p>` : ''}
        `;
        
        // Fade out
        quoteContainer.style.opacity = '0';
        quoteContainer.style.transform = 'translateY(10px)';
        
        // Update content after fade out
        setTimeout(() => {
            quoteContainer.innerHTML = quoteHTML;
            // Fade in
            quoteContainer.style.opacity = '1';
            quoteContainer.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Initialize quote rotation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    rotateQuotes();
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current navigation link
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuLength = navLinks.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (navLinks[i].href === currentLocation) {
            navLinks[i].classList.add('active');
        }
    }
    
    
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    img.style.opacity = '0';
                    
                    // Fade in image when loaded
                    img.onload = function() {
                        img.style.transition = 'opacity 0.5s ease-in-out';
                        img.style.opacity = '1';
                    };
                    
                    observer.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Form validation for contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const formMessage = document.getElementById('formMessage');
        
        // Reset previous error states
        document.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('error');
        });
        
        // Validate name
        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            email.classList.add('error');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            message.classList.add('error');
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
            formMessage.textContent = 'Please fill in all required fields correctly.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            
            // Scroll to first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            return false;
        }
        
        // If form is valid, it will submit to Formspree
        return true;
    });
}

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);

// Initial check in case elements are already in view
document.addEventListener('DOMContentLoaded', animateOnScroll);
