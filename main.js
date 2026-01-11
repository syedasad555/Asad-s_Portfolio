// Load event and wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize custom cursor
    initCursor();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize navbar
    initNavbar();
    
    // Initialize text reveal animation
    initTextReveal();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize skill progress bars
    initSkillProgress();
    
    // Initialize page transition
    initPageTransition();
});

// Initialize custom cursor
function initCursor() {
    // Disable cursor on mobile devices
    if (window.innerWidth <= 768) {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
        return;
    }
    
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .social-link, .btn, .project-card, .certificate-card, .achievement-card, .skill-card, .contact-card, .nav-link, .hamburger');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('expand');
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderWidth = '1px';
            cursorFollower.style.opacity = '0.3';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('expand');
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.borderWidth = '2px';
            cursorFollower.style.opacity = '0.5';
        });
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.5';
    });
}

// Initialize smooth scrolling
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const offsetPosition = targetPosition - navHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Initialize navbar
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Change navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navLinks) {
        // Handle both click and touch events for mobile
        const toggleMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked'); // Debug log
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        };
        
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('touchstart', toggleMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Close menu when clicking on nav links
        const navLinksItems = navLinks.querySelectorAll('.nav-link');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Highlight active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navHeight = navbar.offsetHeight;
            
            if (pageYOffset >= sectionTop - navHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize text reveal animation
function initTextReveal() {
    const revealTextElements = document.querySelectorAll('.reveal-text');
    
    revealTextElements.forEach(element => {
        let text = element.textContent;
        element.textContent = '';
        element.style.visibility = 'visible';
        
        // Split by words and wrap each word in spans
        const words = text.split(' ');
        let html = '';
        
        words.forEach(word => {
            html += `<span style="display: inline-block; overflow: hidden; margin-right: 0.25rem;"><span style="display: inline-block;">${word}</span></span>`;
        });
        
        element.innerHTML = html;
        
        // Add animation to each word
        element.querySelectorAll('span > span').forEach((wordSpan, index) => {
            wordSpan.style.animation = `reveal 0.5s forwards ${0.1 + (index * 0.05)}s cubic-bezier(0.5, 0, 0.1, 1)`;
        });
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const options = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(animateOnScroll, options);
    
    // Elements to animate
    const elements = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .achievement-card, .contact-card');
    
    elements.forEach((element, index) => {
        // Set initial style
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        // Add animation class when in view
        observer.observe(element);
        
        // Add animated class
        element.addEventListener('transitionend', () => {
            if (element.style.opacity === '1') {
                element.classList.add('animated');
            }
        });
    });
    
    // Set up intersection observer for skill progress bars
    const progressBars = document.querySelectorAll('.skill-progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
                
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Initialize skill progress bars
function initSkillProgress() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const progressBar = card.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.width = progressBar.style.width || '0%';
                progressBar.style.width = progressBar.getAttribute('style').replace('width: ', '');
            }
        });
    });
}

// Initialize page transition
function initPageTransition() {
    const pageTransition = document.querySelector('.page-transition');
    
    if (pageTransition) {
        // Page loaded transition
        pageTransition.style.transform = 'translateY(0)';
        pageTransition.style.transition = 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)';
        
        setTimeout(() => {
            pageTransition.style.transform = 'translateY(-100%)';
        }, 500);
    }
    
    // Add transition for links to other pages
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"], a[href$=".html"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Skip for links with target="_blank"
            if (link.getAttribute('target') === '_blank') return;
            
            e.preventDefault();
            const href = link.getAttribute('href');
            
            if (pageTransition) {
                pageTransition.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            } else {
                window.location.href = href;
            }
        });
    });
}

// Show scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.style.opacity = '1';
}
