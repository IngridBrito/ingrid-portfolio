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
    // CONTACT FORM HANDLING & TOAST
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;
    const toast = document.getElementById('toast');
    
    if (contactForm && submitBtn && toast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic fields validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Set sending state on button
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinner"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                Enviando...
            `;
            
            // Add CSS class for rotation to the spinner
            const spinner = submitBtn.querySelector('.spinner');
            if (spinner) {
                spinner.style.animation = 'rotateOutline 1s linear infinite';
            }
            
            // Simulate API request (1.5 seconds)
            setTimeout(() => {
                // Success action
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Show toast notification
                toast.classList.add('show');
                
                // Save locally to simulate backend persistence
                const messagesList = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
                messagesList.push({
                    name,
                    email,
                    message,
                    date: new Date().toISOString()
                });
                localStorage.setItem('portfolio_messages', JSON.stringify(messagesList));
                
                // Hide toast after 4s
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);
                
            }, 1500);
        });
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
