/* ==========================================================================
   ANAYA RESTAURANT - Interactivity and Animation Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Preloader Removal ---
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500); // Gives a smooth delay to show the logo
    });

    // Fallback if load event doesn't fire fast enough
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (!preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
        }
    }, 2000);

    
    // --- 2. Sticky Navbar & Active Link Observer ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Section Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
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


    // --- 3. Mobile Navigation Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = menuBtn.querySelector('i');

    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            menuIcon.className = 'fa-solid fa-xmark';
        } else {
            menuIcon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking a nav link on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.className = 'fa-solid fa-bars';
        });
    });


    // --- 4. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once revealed, we don't need to observe it again
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Triggers slightly before element enters view
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // --- 5. Pinterest Gallery Category Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.querySelector('.gallery-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Pinterest/Masonry column layout works best with toggle display
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // --- 6. Testimonial Slider / Carousel ---
    const track = document.getElementById('testimonial-track');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentIndex = 0;
    let autoplayTimer;

    // Create Navigation Dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    const updateSlider = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSlider();
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    };

    // Button event listeners
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    // Swipe gestures support for Mobile touchscreens
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
        const threshold = 50;
        if (startX - endX > threshold) {
            nextSlide(); // Swipe Left -> Next
            resetAutoplay();
        } else if (endX - startX > threshold) {
            prevSlide(); // Swipe Right -> Prev
            resetAutoplay();
        }
    };

    // Autoplay implementation
    const startAutoplay = () => {
        autoplayTimer = setInterval(nextSlide, 5000);
    };

    const resetAutoplay = () => {
        clearInterval(autoplayTimer);
        startAutoplay();
    };

    startAutoplay();


    // --- 7. Reservation Form Submission & Modal Handling ---
    const reservationForm = document.getElementById('reservation-form');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalMessage = document.getElementById('modal-message');

    // Date picker constraints: Prevent booking past dates
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const name = document.getElementById('res-name').value.trim();
        const phone = document.getElementById('res-phone').value.trim();
        const date = document.getElementById('res-date').value;
        const time = document.getElementById('res-time').value;
        const guests = document.getElementById('res-guests').value;

        // Custom SMS/Alert message format
        modalMessage.innerHTML = `
            Dear <strong>${name}</strong>,<br><br>
            Your table reservation for <strong>${guests} persons</strong> on <strong>${date}</strong> at <strong>${time}</strong> has been successfully booked.<br><br>
            A confirmation code and details have been sent to <strong>${phone}</strong>. We look forward to offering you our premium services!
        `;

        // Display Success Modal
        modalOverlay.classList.add('active');

        // Reset the form details
        reservationForm.reset();
    });

    // Close Modal when clicking background overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

});
