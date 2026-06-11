document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // NAVBAR SCROLL EFFECT & ACTIVE LINKS
    // ==========================================
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function handleScroll() {
        // Scroll header effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active section link highlighting
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // Offset for triggers
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load

    // ==========================================
    // MOBILE NAVIGATION MENU
    // ==========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navList.classList.toggle('open');
        });
        
        // Close menu when link clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navList.classList.remove('open');
            });
        });
    }

    // ==========================================
    // INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-container');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Run only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================
    // SKILLS PROGRESS BAR ANIMATION
    // ==========================================
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const skillsSection = document.querySelector('#habilidades');
    
    if (skillBars.length > 0 && skillsSection) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth + '%';
                    });
                    observer.unobserve(skillsSection); // Run only once
                }
            });
        }, {
            threshold: 0.2
        });
        
        skillsObserver.observe(skillsSection);
    }



    // ==========================================
    // MODAL WINDOW CONTROL
    // ==========================================
    const vetModal = document.getElementById('vetModal');
    const openVetBtn = document.getElementById('openVetProject');
    const closeVetBtn = vetModal ? vetModal.querySelector('.modal-close') : null;
    const modalOverlay = vetModal ? vetModal.querySelector('.modal-overlay') : null;

    if (vetModal && openVetBtn) {
        openVetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            vetModal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });

        const closeModal = () => {
            vetModal.classList.remove('open');
            document.body.style.overflow = ''; // Restore background scroll
        };

        if (closeVetBtn) closeVetBtn.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && vetModal.classList.contains('open')) {
                closeModal();
            }
        });
    }
});
