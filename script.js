document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.slide-in');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Carousel Functionality
    const certificates = [
        { image: './assets/certificates/AI_for_techies.jpeg', title: 'AI For Techies' },
        { image: './assets/certificates/AI_Tools_Workshop.jpeg', title: 'AI Tools Workshop' },
        { image: './assets/certificates/cloud_computing.jpeg', title: 'Cloud Computing' },
        { image: './assets/certificates/codechef.jpeg', title: 'CodeChef' },
        { image: './assets/certificates/Prompt_engineering.jpeg', title: 'Prompt Engineering' }
    ];

    let currentIndex = 0;
    const certificateImage = document.getElementById('certificate-image');
    const certificateTitle = document.getElementById('certificate-title');
    const carouselDots = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Initialize carousel dots
    function initializeDots() {
        carouselDots.innerHTML = '';
        certificates.forEach((cert, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
        });
    }

    // Update carousel display
    function updateCarousel() {
        const cert = certificates[currentIndex];
        certificateImage.classList.remove('carousel-fade');
        // Trigger reflow to restart animation
        void certificateImage.offsetWidth;
        certificateImage.classList.add('carousel-fade');
        certificateImage.src = cert.image;
        certificateTitle.textContent = cert.title;
        
        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Navigation functions
    function nextSlide() {
        currentIndex = (currentIndex + 1) % certificates.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + certificates.length) % certificates.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Event listeners for buttons
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Initialize carousel if certificates section exists
    if (carouselDots) {
        initializeDots();
    }

    // Optional: Auto-advance carousel every 5 seconds
    // Uncomment the next two lines to enable auto-rotation
    // setInterval(nextSlide, 5000);
});
