// Premium Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initial loading screen
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading Portfolio...</div>
        </div>
    `;
    document.body.appendChild(loading);

    // Remove loading screen when page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.remove();
                initAllFunctions();
            }, 500);
        }, 800);
    });

    // Fallback loading removal
    setTimeout(() => {
        if (document.body.contains(loading)) {
            loading.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(loading)) {
                    loading.remove();
                }
            }, 500);
        }
    }, 3000);

    function initAllFunctions() {
        // Initialize all functions
        initMobileMenu();
        initSmoothScroll();
        initThemeToggle();
        initTypewriterEffect();
        initCounterAnimation();
        initSkillBars();
        initProjectFilters();
        initVideoModal();
        initContactForm();
        initBackToTop();
        initScrollAnimations();
        initFloatingElements();
    }

    // Mobile Menu Toggle
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                this.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });

            // Close menu when clicking a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
        }
    }

    // Smooth Scrolling
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;
                
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Theme Toggle
    function initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (themeToggle) {
            // Check for saved theme or prefered scheme
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
                document.body.classList.add('dark-theme');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }

            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            });
        }
    }

    // Typewriter Effect
    function initTypewriterEffect() {
        const words = document.querySelectorAll('.word');
        if (words.length > 0) {
            let wordIndex = 0;
            
            function rotateWords() {
                words.forEach(word => word.style.opacity = '0');
                words[wordIndex].style.opacity = '1';
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            // Start rotation
            rotateWords();
            setInterval(rotateWords, 2000);
        }
    }

    // Counter Animation
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + '+';
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // Skill Bars Animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                    
                    observer.unobserve(bar);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // Video Modal - Immersive Premium Version
    function initVideoModal() {
        const modal = document.getElementById('videoModal');
        const closeBtn = document.querySelector('.modal-close');
        const video = document.getElementById('projectVideo');
        
        // Correctly mapped Project Video Data
        const videoData = {
            project1: {
                src: 'labautomation.mp4',
                title: 'SRS Registration & Lab Automation System',
                description: 'A comprehensive web portal demonstrating secure laboratory analytics, role-based workflows, and database tracking.'
            },
            project2: {
                src: 'sustainablelivingvideo.mp4',
                title: 'Sustainable Living Guide App',
                description: 'A beautiful mobile application demo highlighting carbon footprint trackers, eco lifestyle tips, and challenges.'
            },
            pawfectcare: {
                src: 'pawfectcare.mp4',
                title: 'PawfectCare - Pet Care & Adoption Mobile App',
                description: 'A comprehensive Flutter mobile application showcasing multi-role access (Pet Owner, Vet, Shelter Admin), pet adoption workflows, appointment scheduling, and patient medical records.'
            },
            project3: {
                src: 'fitnesstrackervideo.mp4',
                title: 'Fitness Tracker Pro App',
                description: 'A professional mobile fitness tracking experience showcasing calorie monitoring, active logs, and custom widgets.'
            }
        };

        // Attach event listeners to all play buttons
        document.querySelectorAll('.video-play-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const projectId = this.getAttribute('data-project');
                const data = videoData[projectId];
                if (data) {
                    playVideo(data);
                }
            });
        });

        // Function to play video in modal
        function playVideo(data) {
            if (!data || !data.src) {
                showNotification('Demo video coming soon!', 'error');
                return;
            }

            // Set video source
            const source = video.querySelector('source');
            source.src = data.src;
            video.load();

            // Set modal content
            document.getElementById('videoTitle').textContent = data.title;
            document.getElementById('videoDescription').textContent = data.description;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Try to play video
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.log('Autoplay prevented:', e);
                    video.controls = true;
                });
            }
        }

        // Close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            video.pause();
            video.currentTime = 0;
            video.controls = false;
            
            // Reset video source
            const source = video.querySelector('source');
            source.src = '';
            video.load();
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Contact Form
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate
            let isValid = true;
            const required = form.querySelectorAll('[required]');
            required.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                showNotification('Please fill all required fields', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.querySelector('span').textContent;
            
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Sending...';
            
            setTimeout(() => {
                // Success simulation
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;
            }, 1500);
        });

        // Clear error on input
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type === 'success' ? '' : 'error'}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Back to Top Button
    function initBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.project-card, .skills-category, .feature-card, .info-card, .timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }

    // Project Category Filtering System
    function initProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Toggle active filter button style
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    projectCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        if (filterValue === 'all' || cardCategory === filterValue) {
                            card.style.display = 'block';
                            // Apply smooth entry animation
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(15px)';
                            setTimeout(() => {
                                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }
    }

    // Floating Elements Animation
    function initFloatingElements() {
        const elements = document.querySelectorAll('.element');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});