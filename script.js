document.addEventListener('DOMContentLoaded', () => {
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
