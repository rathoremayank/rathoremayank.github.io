// ===================================
// Main JavaScript for Resume Website
// ===================================

// Global variables
let profileData = null;

// ===================================
// Initialize on DOM Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeScrollEffects();
    initializeBackToTop();
    loadProfileData();
    setCurrentYear();
});

// ===================================
// Theme Management
// ===================================
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===================================
// Navigation Management
// ===================================
function initializeNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Mobile menu toggle with animation
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Smooth scrolling with offset for fixed header
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active link highlight on scroll & header scroll effect
    window.addEventListener('scroll', () => {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active link
        const sections = document.querySelectorAll('.section, .hero');
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===================================
// Scroll Effects & Animations
// ===================================
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and items
    const observeElements = () => {
        const elements = document.querySelectorAll(`
            .experience-item,
            .project-card,
            .skill-category,
            .education-item,
            .contact-card,
            .about-card
        `);
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    };
    
    // Run after content loads
    setTimeout(observeElements, 500);
}

// ===================================
// Back to Top Button
// ===================================
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Load and Populate Profile Data
// ===================================
async function loadProfileData() {
    try {
        // Try to fetch the JSON file
        const response = await fetch('data/profile.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        profileData = await response.json();
        console.log('Profile data loaded successfully:', profileData);
        populateAllSections();
    } catch (error) {
        console.error('Error loading profile data:', error);
        
        // Show user-friendly error with more details
        showError(`Failed to load profile data: ${error.message}. If opening from file://, please use a local server (e.g., Live Server extension or python -m http.server)`);
        
        // Still populate static content where possible
        document.getElementById('nav-name').textContent = 'Mayank Singh Rathore';
        document.getElementById('hero-name').innerHTML = 'Hi, I\'m <span class="gradient-text">Mayank Singh Rathore</span>';
        document.getElementById('hero-headline').textContent = 'Senior DevOps Engineer | Cloud Architect';
    }
}

function populateAllSections() {
    if (!profileData) {
        console.error('No profile data available');
        return;
    }
    
    console.log('Populating all sections with data');
    
    populateBasicInfo();
    populateQuickLinks();
    populateAbout();
    populateExperience();
    populateProjects();
    populateEducation();
    populateSkills();
    populateContact();
    populateSocialLinks();
    setupDownloadResume();
}

// ===================================
// Populate Basic Info (Header & Hero)
// ===================================
function populateBasicInfo() {
    const { basics } = profileData;
    
    // Logo initial
    const logoInitial = document.getElementById('logo-initial');
    if (logoInitial) logoInitial.textContent = basics.name.charAt(0);
    
    // Navigation name
    const navName = document.getElementById('nav-name');
    if (navName) navName.textContent = basics.name;
    
    // Hero section
    const heroName = document.getElementById('hero-name');
    const heroHeadline = document.getElementById('hero-headline');
    
    if (heroName) {
        // Create gradient text effect
        heroName.innerHTML = `Hi, I'm <span class="gradient-text">${basics.name}</span>`;
    }
    if (heroHeadline) heroHeadline.textContent = basics.headline;
    
    // Footer name
    const footerName = document.getElementById('footer-name');
    if (footerName) footerName.textContent = basics.name;
    
    const footerNameCopy = document.querySelector('.footer-name-copy');
    if (footerNameCopy) footerNameCopy.textContent = basics.name;
}

// ===================================
// Populate Quick Links Section
// ===================================
function populateQuickLinks() {
    const { basics } = profileData;
    const container = document.getElementById('quick-links-container');

    if (!container || !basics.quickLinks) return;

    container.innerHTML = '';

    basics.quickLinks.forEach(link => {
        const linkCard = document.createElement('a');
        linkCard.href = link.url;
        linkCard.className = 'quick-link-card';
        linkCard.target = '_blank';
        linkCard.rel = 'noopener noreferrer';

        linkCard.innerHTML = `
            <i class="${link.icon}"></i>
            <span>${link.name}</span>
        `;
        container.appendChild(linkCard);
    });
}

// ===================================
// Populate About Section
// ===================================
function populateAbout() {
    const { basics } = profileData;
    const aboutSummary = document.getElementById('about-summary');
    
    if (aboutSummary) {
        aboutSummary.textContent = basics.summary;
    }
}

// ===================================
// Populate Experience Section
// ===================================
function populateExperience() {
    const { workExperience } = profileData;
    const container = document.getElementById('experience-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    workExperience.forEach(job => {
        const endDate = job.endDate ? formatDate(job.endDate) : 'Present';
        const startDate = formatDate(job.startDate);
        
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        
        experienceItem.innerHTML = `
            <div class="experience-header">
                <h3 class="experience-title">${job.title}</h3>
                <div class="experience-company">${job.company}</div>
                <div class="experience-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${startDate} - ${endDate}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                </div>
            </div>
            <p class="experience-summary">${job.summary}</p>
            ${job.highlights && job.highlights.length > 0 ? `
                <ul class="experience-highlights">
                    ${job.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            ` : ''}
            ${job.technologies && job.technologies.length > 0 ? `
                <div class="experience-technologies">
                    ${job.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            ` : ''}
        `;
        
        container.appendChild(experienceItem);
    });
}

// ===================================
// Populate Projects Section
// ===================================
function populateProjects() {
    const { projects } = profileData;
    const container = document.getElementById('projects-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    projects.forEach(project => {
        const endDate = project.endDate ? formatDate(project.endDate) : 'Present';
        const startDate = formatDate(project.startDate);
        
        const projectCard = document.createElement('a');
        projectCard.href = project.url || '#';
        projectCard.className = 'project-card';
        projectCard.target = '_blank';
        projectCard.rel = 'noopener noreferrer';
        
        projectCard.innerHTML = `
            <div class="project-header">
                <h3 class="project-name">${project.name}</h3>
                <div class="project-meta">
                    <span class="project-role">${project.role}</span>
                    <span><i class="fas fa-building"></i> ${project.company}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${startDate} - ${endDate}</span>
                </div>
                ${project.domain ? `<div class="project-meta"><span><i class="fas fa-industry"></i> ${project.domain}</span></div>` : ''}
            </div>
            ${project.highlights && project.highlights.length > 0 ? `
                <ul class="project-highlights">
                    ${project.highlights.slice(0, 5).map(highlight => `<li>${highlight}</li>`).join('')}
                    ${project.highlights.length > 5 ? `<li>...and ${project.highlights.length - 5} more achievements</li>` : ''}
                </ul>
            ` : ''}
        `;
        
        container.appendChild(projectCard);
    });
}

// ===================================
// Populate Education Section
// ===================================
function populateEducation() {
    const { education } = profileData;
    const container = document.getElementById('education-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    education.forEach(edu => {
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        
        const degreeInfo = edu.fieldOfStudy 
            ? `${edu.degree} in ${edu.fieldOfStudy}` 
            : edu.degree;
        
        const institutionInfo = edu.university 
            ? `${edu.institution}, ${edu.university}` 
            : edu.institution;
        
        const boardOrUniversity = edu.board ? `Board: ${edu.board}` : '';
        
        educationItem.innerHTML = `
            <h3 class="education-degree">${degreeInfo}</h3>
            <div class="education-institution">${institutionInfo}</div>
            <div class="education-meta">
                <span><i class="fas fa-calendar-alt"></i> ${edu.startDate} - ${edu.endDate}</span>
                ${edu.score ? `<span><i class="fas fa-award"></i> ${edu.score}</span>` : ''}
                ${boardOrUniversity ? `<span>${boardOrUniversity}</span>` : ''}
            </div>
        `;
        
        container.appendChild(educationItem);
    });
}

// ===================================
// Populate Skills Section
// ===================================
function populateSkills() {
    const { skills } = profileData;
    const container = document.getElementById('skills-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    skills.forEach(skillCategory => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        categoryDiv.innerHTML = `
            <h3 class="skill-category-title">${skillCategory.category}</h3>
            <div class="skill-items">
                ${skillCategory.items.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        
        container.appendChild(categoryDiv);
    });
}

// ===================================
// Populate Contact Section
// ===================================
function populateContact() {
    const { basics } = profileData;
    
    // Email
    const contactEmail = document.getElementById('contact-email');
    if (contactEmail) {
        contactEmail.textContent = basics.email;
        contactEmail.href = `mailto:${basics.email}`;
    }
    
    // Phone
    const contactPhone = document.getElementById('contact-phone');
    if (contactPhone) {
        contactPhone.textContent = basics.phone;
        contactPhone.href = `tel:${basics.phone}`;
    }
    
    // Location
    const contactLocation = document.getElementById('contact-location');
    if (contactLocation && basics.location) {
        const { city, region, country } = basics.location;
        contactLocation.textContent = `${city}, ${region}, ${country}`;
    }
}

// ===================================
// Populate Social Links
// ===================================
function populateSocialLinks() {
    const { basics } = profileData;
    const container = document.getElementById('social-links');
    
    if (!container || !basics.profiles) return;
    
    container.innerHTML = '';
    
    const socialIcons = {
        'LinkedIn': 'fab fa-linkedin',
        'GitHub': 'fab fa-github',
        'Twitter': 'fab fa-twitter',
        'Facebook': 'fab fa-facebook',
        'Instagram': 'fab fa-instagram',
        'Portfolio': 'fas fa-globe',
        'Email': 'fas fa-envelope'
    };
    
    basics.profiles.forEach(profile => {
        const link = document.createElement('a');
        link.href = profile.url;
        link.className = 'social-link';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = profile.network;
        
        const icon = document.createElement('i');
        icon.className = socialIcons[profile.network] || 'fas fa-link';
        
        link.appendChild(icon);
        container.appendChild(link);
    });
}

// ===================================
// Setup Download Resume
// ===================================
function setupDownloadResume() {
    const downloadButton = document.getElementById('download-resume');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show notification
            showNotification('Opening print dialog...', 'info');
            
            // Small delay for better UX
            setTimeout(() => {
                // Option 1: Print the page (user can save as PDF)
                window.print();
            }, 300);
            
            // Option 2: If you have a PDF file, uncomment below
            // window.location.href = 'path/to/your/resume.pdf';
        });
    }
}

// ===================================
// Utility Functions
// ===================================
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
}

function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function showError(message) {
    console.error(message);
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    const colors = {
        error: '#ef4444',
        success: '#10b981',
        info: '#0ea5e9',
        warning: '#f59e0b'
    };
    
    const icons = {
        error: 'fas fa-exclamation-circle',
        success: 'fas fa-check-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        font-family: 'Inter', sans-serif;
        font-size: 0.875rem;
    `;
    
    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations to page
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Performance & Polish
// ===================================

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure smooth initial render
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
