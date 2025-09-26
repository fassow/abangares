document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto'; 
        });
    }
    document.addEventListener('click', function(event) {
        if (sidebar && !sidebar.contains(event.target) && menuToggle && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (sidebar) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });

    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .info-img, .info-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.service-card, .feature-card, .info-img, .info-text').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
                contactForm.reset();
            } else {
                alert('Por favor, completa todos los campos obligatorios.');
            }
        });
    }
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert('¡Gracias por suscribirte a nuestro newsletter!');
                emailInput.value = '';
            } else {
                alert('Por favor, ingresa tu dirección de email.');
            }
        });
    }
    
    function initPremiumDropdowns() {
        const desktopDropdowns = document.querySelectorAll('.dropdown');
        
        desktopDropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('a');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!menu) return;
            dropdown.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateX(-50%) translateY(10px)';
                    const items = menu.querySelectorAll('li');
                    items.forEach((item, index) => {
                        item.style.animationDelay = `${index * 0.1}s`;
                    });
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    setTimeout(() => {
                        if (!dropdown.matches(':hover')) {
                            menu.style.opacity = '0';
                            menu.style.visibility = 'hidden';
                            menu.style.transform = 'translateX(-50%) translateY(15px)';
                        }
                    }, 200);
                }
            });

            toggle.addEventListener('focus', function() {
                if (window.innerWidth > 768) {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateX(-50%) translateY(10px)';
                }
            });
            
            dropdown.addEventListener('focusout', function(e) {
                if (window.innerWidth > 768 && !dropdown.contains(e.relatedTarget)) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateX(-50%) translateY(15px)';
                }
            });
        });
        const mobileDropdownToggles = document.querySelectorAll('.sidebar-dropdown .dropdown-toggle');
        
        mobileDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdown = this.parentElement;
                const wasActive = dropdown.classList.contains('active');
                document.querySelectorAll('.sidebar-dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });

                if (!wasActive) {
                    dropdown.classList.add('active');
                    const submenu = dropdown.querySelector('.sidebar-submenu');
                    if (submenu) {
                        submenu.style.transition = 'max-height 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    }
                } else {
                    dropdown.classList.remove('active');
                }
            });
            toggle.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            toggle.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        document.addEventListener('click', function(event) {
            if (window.innerWidth > 768) {
                desktopDropdowns.forEach(dropdown => {
                    if (!dropdown.contains(event.target)) {
                        const menu = dropdown.querySelector('.dropdown-menu');
                        if (menu) {
                            menu.style.opacity = '0';
                            menu.style.visibility = 'hidden';
                            menu.style.transform = 'translateX(-50%) translateY(15px)';
                        }
                    }
                });
            }
            
            if (!event.target.closest('.sidebar-dropdown') && 
                !event.target.closest('.menu-toggle') && 
                window.innerWidth <= 768) {
                document.querySelectorAll('.sidebar-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
        function playDropdownSound() {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
            } catch (error) {
                console.log('Audio context not supported');
            }
        }
        if (window.innerWidth > 768) {
            desktopDropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', () => {
                    playDropdownSound();
                });
            });
        }
    }

    function initPerformanceOptimizations() {
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        
        const dropdownObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const dropdown = entry.target;
                    dropdown.style.willChange = 'transform, opacity';
                    const icons = dropdown.querySelectorAll('i');
                    icons.forEach(icon => {
                        icon.style.opacity = '1';
                    });
                    
                    dropdownObserver.unobserve(dropdown);
                }
            });
        }, observerOptions);
        document.querySelectorAll('.dropdown, .sidebar-dropdown').forEach(dropdown => {
            dropdownObserver.observe(dropdown);
        });
    }

    function enhanceSidebarExperience() {
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebar) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        const mainContent = document.querySelector('main') || document.querySelector('.hero');
                        if (sidebar.classList.contains('active')) {
                            document.body.style.overflow = 'hidden';
                            if (mainContent) {
                                mainContent.style.transition = 'filter 0.3s ease';
                                mainContent.style.filter = 'blur(3px) brightness(0.95)';
                            }
                        } else {
                            document.body.style.overflow = 'auto';
                            if (mainContent) {
                                mainContent.style.filter = 'none';
                            }
                        }
                    }
                });
            });
            
            observer.observe(sidebar, { attributes: true });
        }
    }

    initPremiumDropdowns();
    initPerformanceOptimizations();
    enhanceSidebarExperience();
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');

        document.querySelectorAll('.dropdown-menu a, .sidebar-submenu a').forEach(link => {
            link.addEventListener('touchstart', function() {
                this.style.transform = 'translateX(5px) scale(0.98)';
            });
            
            link.addEventListener('touchend', function() {
                this.style.transform = 'translateX(5px) scale(1)';
            });
        });
    }

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }

    function initCounterAnimation() {
        const statItems = document.querySelectorAll('.stat-item span');
        const statsSection = document.querySelector('.info');
        
        if (!statsSection || statItems.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statItems.forEach(stat => {
                        const target = parseInt(stat.textContent.replace(/,/g, ''));
                        if (isNaN(target)) return;
                        
                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                stat.textContent = target.toLocaleString();
                                clearInterval(timer);
                            } else {
                                stat.textContent = Math.floor(current).toLocaleString();
                            }
                        }, 30);
                    });
                    observer.unobserve(statsSection);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    initCounterAnimation();

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                animateOnScroll();
            }, 100);
        }
    });

    document.querySelectorAll('.sidebar-submenu a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    if (sidebar) {
                        sidebar.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                }, 300);
            }
        });
    });
    
    // Efecto de onda al hacer clic en botones
    document.querySelectorAll('.btn, .dropdown-toggle, .sidebar-links a').forEach(element => {
        element.addEventListener('click', function(e) {
            // Crear efecto de onda
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});