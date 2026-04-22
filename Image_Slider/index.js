document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    const toggle = document.getElementById('auto-slide');
    let currentIndex = 0;
    let interval;

    const showSlide = (index) => {
        // Hide all slides and dots
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    };

    // Event listeners
    nextBtn.onclick = nextSlide;
    prevBtn.onclick = prevSlide;

    dots.forEach((dot, index) => {
        dot.onclick = () => {
            currentIndex = index;
            showSlide(currentIndex);
        };
    });

    toggle.onchange = () => {
        if (toggle.checked) {
            interval = setInterval(nextSlide, 3000);
        } else {
            clearInterval(interval);
        }
    };

    // Initialize
    showSlide(currentIndex);
});
