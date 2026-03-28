// Mobile Menu Toggle Logic
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIconOpen = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isOpened = mobileMenu.classList.contains('translate-x-0');
    
    if (isOpened) {
        // Close Menu
        mobileMenu.classList.remove('translate-x-0', 'opacity-100', 'pointer-events-auto');
        mobileMenu.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        document.body.style.overflow = '';
    } else {
        // Open Menu
        mobileMenu.classList.add('translate-x-0', 'opacity-100', 'pointer-events-auto');
        mobileMenu.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('translate-x-0')) {
            toggleMenu();
        }
    });
});

// Tab Switching Logic for About Section
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("block"); // Ensure hidden via Tailwind if mixed
    }
    
    // Remove active state from all buttons
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active", "bg-blue-500/20", "border-blue-500/30", "text-white");
        tablinks[i].classList.add("text-slate-400", "border-transparent");
    }
    
    // Show the current tab and add active state
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active", "bg-blue-500/20", "border-blue-500/30", "text-white");
    evt.currentTarget.classList.remove("text-slate-400", "border-transparent");
}

// Initialize everything
function init() {
    console.log("Initializing portfolio scripts...");
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        console.log("Lucide library found. Creating icons...");
        lucide.createIcons();
    } else {
        console.warn("Lucide library NOT found. Check script include.");
    }

    // Initialize AOS Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Initialize Filter Indicator position
    const activeBtn = document.querySelector('.filter-btn.active');
    const indicator = document.getElementById('filter-indicator');
    if (activeBtn && indicator) {
        indicator.style.left = activeBtn.offsetLeft + 'px';
        indicator.style.width = activeBtn.offsetWidth + 'px';
    }
}

// Immediate call as script is at the bottom
init();

// Run init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Also run on window load to handle late-loading elements/images
window.addEventListener('load', init);

// Magic Bottom Navigation Logic
let isManualScroll = false;
let scrollTimeout;

function updateActiveState(el) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    el.classList.add('active');
}

// Attach listeners to bottom nav items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        isManualScroll = true;
        clearTimeout(scrollTimeout);
        updateActiveState(item);
        
        // Refresh AOS animations for the section we jumped to
        if (window.AOS) {
            setTimeout(() => AOS.refresh(), 600);
        }
        
        // Resume intersection observer after scroll finishes
        scrollTimeout = setTimeout(() => {
            isManualScroll = false;
        }, 1200);
    });
});

// Also handle mobile links in drawer if they exist
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const targetNav = document.querySelector(`.nav-item[href="${href}"]`);
            if (targetNav) updateActiveState(targetNav);
        }
        // Auto-close menu if open
        if (typeof toggleMenu === 'function') {
            const menu = document.getElementById('mobile-menu');
            if (menu && !menu.classList.contains('opacity-0')) toggleMenu();
        }
    });
});

// Track active section on scroll
const mobileNavItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    if (isManualScroll) return;
    
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            mobileNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Project Filtering Logic
function filterProjects(evt, category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');
    const indicator = document.getElementById('filter-indicator');
    
    // Update buttons active state
    buttons.forEach(btn => {
        btn.classList.remove('active', 'text-white');
        btn.classList.add('text-slate-400');
    });
    evt.currentTarget.classList.add('active', 'text-white');
    evt.currentTarget.classList.remove('text-slate-400');

    // Move Indicator
    if (indicator) {
        const btn = evt.currentTarget;
        indicator.style.left = btn.offsetLeft + 'px';
        indicator.style.width = btn.offsetWidth + 'px';
    }

    let visibleIndex = 0;
    // Filter cards with spring animation
    cards.forEach((card) => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            
            // Reset for staggered entry
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8) translateY(30px)';
            card.style.filter = 'blur(10px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1) translateY(0)';
                card.style.filter = 'blur(0px)';
            }, visibleIndex * 80);
            visibleIndex++;
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9) translateY(20px)';
            card.style.filter = 'blur(5px)';
            card.classList.add('hidden');
            setTimeout(() => {
                if (card.classList.contains('hidden')) {
                    card.style.display = 'none';
                }
            }, 400);
        }
    });

    // Re-trigger AOS
    setTimeout(() => {
        if (typeof AOS !== 'undefined') AOS.refresh();
    }, 500);
}
