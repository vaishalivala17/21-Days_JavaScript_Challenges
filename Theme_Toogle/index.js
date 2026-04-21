document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('theme-toggle');
  if (checkbox) {
    checkbox.addEventListener('change', (e) => {
    document.documentElement.classList.toggle('dark', e.target.checked);
    });
  }
});

