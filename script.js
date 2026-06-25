document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
        
        // Close menu when clicking navigation link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });

    const bgText = document.querySelector('.story-background-text');
    const storySection = document.querySelector('.story');

    // Simple parallax effect for images
    window.addEventListener('scroll', () => {
        // Parallax for Background Text in Story Section
        if (bgText && storySection) {
            const rect = storySection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Calculate 0 to 1 progress of the section
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                // Shift text up to 45% of its own immense width to left side to reveal full text slower
                const shiftPercentage = scrollProgress * 45;
                // Move text based on its own width calculation
                bgText.style.transform = `translate(calc(10vw - ${shiftPercentage}%), -50%)`;
            }
        }

    });
});
