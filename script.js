// Initialize libraries when idle
if ('requestIdleCallback' in window) {
  requestIdleCallback(initNonCriticalScripts);
} else {
  setTimeout(initNonCriticalScripts, 500);
}

function initNonCriticalScripts() {
  AOS.init({ duration: 1000, once: true });

  new Typed('#typed', {
    strings: ['C++/C Programmer', 'UI designer', 'web developer'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });

  particlesJS('particles-js', {
    particles: {
      number: { value: 80 },
      color: { value: '#3b82f6' },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: 3 },
      move: { enable: true, speed: 2 }
    }
  });

  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), { max: 25, speed: 400 });
}

// Loader
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  loader.classList.add('fade-out');
  setTimeout(() => loader.remove(), 600);
});

// Navbar Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}
themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.style.opacity = '0';
    setTimeout(() => {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        icon.style.opacity = '1';
    }, 200);
}

// Scroll to Top
const scrollTop = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) scrollTop.classList.add('active');
  else scrollTop.classList.remove('active');
});
scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Load and display bio
fetch('bio.txt')
    .then(response => response.text())
    .then(bio => {
        document.getElementById('bio-text').textContent = bio;
    })
    .catch(error => console.error('Error loading bio:', error));

// Load and display code
fetch('code.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(code => {
        const codeElement = document.getElementById('arduino-code');
        if (codeElement) {
            codeElement.textContent = code;
            Prism.highlightElement(codeElement);
        }
    })
    .catch(error => {
        console.error('Error loading code:', error);
        document.getElementById('arduino-code').textContent = 'Error loading code...';
    });
