// Navbar Toggle Enhancements (No scroll color change)
document.addEventListener('DOMContentLoaded', function() {
    const toggler = document.querySelector('.navbar-toggler');
    const icon = document.getElementById('togglerIcon');

    if (toggler && icon) {
        toggler.addEventListener('click', function() {
            if (this.getAttribute('aria-expanded') === 'true') {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});
