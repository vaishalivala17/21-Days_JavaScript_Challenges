// Theme Toggle - Day 2 Challenge

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Load and apply saved theme explicitly
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.classList.remove('dark');
  if (savedTheme === 'dark') {
    html.classList.add('dark');
  }
  toggle.checked = savedTheme === 'dark';

  // Toggle handler
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });
});
