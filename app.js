// CALEB — app.js (vanilla JS)
const works = [
  {
    id: '1',
    title: 'Modern Dashboard UI',
    description: 'A responsive dashboard built with a focus on data viz and UX.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    tags: ['Web Design', 'App Design'],
    href: '#'
  },
  {
    id: '2',
    title: 'E‑commerce Landing',
    description: 'A fast landing experience optimized for conversions and accessibility.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
    tags: ['Web Design', 'Marketing'],
    href: '#'
  },
  {
    id: '3',
    title: 'Mobile App Prototype',
    description: 'Prototype for a mobile-first experience with animation and accessibility in mind.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
    tags: ['App Design', 'Figma'],
    href: '#'
  }
]

function createCard(w) {
  const article = document.createElement('article')
  article.className = 'card'

  article.innerHTML = `
    <div class="card-media" style="background-image: url('${w.image}')"></div>
    <div class="card-body">
      <h3 class="card-title">${w.title}</h3>
      <div class="card-tags">${w.tags.join(', ')}</div>
      <div class="card-actions">
        <a href="${w.href}" class="btn-arrow" target="_blank" rel="noreferrer" title="View Project">
          <span>&rarr;</span>
        </a>
      </div>
    </div>
  `
  return article
}

function renderWorks() {
  const grid = document.getElementById('works')
  if (!grid) return
  grid.innerHTML = ''
  works.forEach(w => grid.appendChild(createCard(w)))
}

// Theme Toggle Logic
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const themes = ['theme-ultra-light', 'theme-navy', 'theme-white', 'theme-purple'];
  const icons = {
    'theme-ultra-light': 'fas fa-sun',
    'theme-navy': 'fas fa-cloud-moon',
    'theme-white': 'fas fa-moon',
    'theme-purple': 'fas fa-star'
  };
  const labels = {
    'theme-ultra-light': 'Ultra Light Mode',
    'theme-navy': 'Navy Mode',
    'theme-white': 'White Mode',
    'theme-purple': 'Purple Mode'
  };

  let currentIdx = themes.indexOf(localStorage.getItem('theme-id')) || 0;
  if (currentIdx === -1) currentIdx = 0;

  const applyTheme = (idx) => {
    const theme = themes[idx];
    // Remove all theme classes
    document.body.classList.remove(...themes);
    // Add current theme class (unless it's ultra light default which is :root)
    if (theme !== 'theme-ultra-light') {
      document.body.classList.add(theme);
    }

    // Update Icon
    const iconEle = toggleBtn.querySelector('i');
    iconEle.className = `${icons[theme]} theme-icon`;

    // Update Tooltip
    const nextIdx = (idx + 1) % themes.length;
    toggleBtn.title = `Switch to ${labels[themes[nextIdx]]}`;

    localStorage.setItem('theme-id', theme);
  };

  // Initial Apply
  applyTheme(currentIdx);

  toggleBtn.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % themes.length;
    applyTheme(currentIdx);
  });
}

// Typing Animation Logic
async function initTyping() {
  const heroWords = ["DEVELOPER", "FREELANCER", "CS STUDENT", "UI DESIGNER", "FULL-STACK DEV"];
  const aboutWords = ["FRONTEND", "DATABASE", "SEO", "FULL-STACK", "LOGO DESIGN", "FREELANCE", "UI DESIGN", "GRAPHIC DESIGN", "BACKEND"];

  const typeWord = async (ele, words) => {
    let wordIdx = 0;
    while (true) {
      let word = words[wordIdx];
      // Type
      for (let i = 0; i <= word.length; i++) {
        ele.textContent = word.substring(0, i);
        await new Promise(r => setTimeout(r, 200)); // Slow Typing
      }
      await new Promise(r => setTimeout(r, 2000)); // pause
      // Backspace
      for (let i = word.length; i >= 0; i--) {
        ele.textContent = word.substring(0, i);
        await new Promise(r => setTimeout(r, 40)); // Fast Cleaning
      }
      wordIdx = (wordIdx + 1) % words.length;
      await new Promise(r => setTimeout(r, 800)); // Pause before next word
    }
  };

  const heroEle = document.getElementById('type-hero');
  const aboutEle = document.getElementById('type-about');

  if (heroEle) typeWord(heroEle, heroWords);
  if (aboutEle) typeWord(aboutEle, aboutWords);
}

// Active Nav Link on Scroll
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-link')

  window.addEventListener('scroll', () => {
    let current = ''
    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id')
      }
    })

    navLinks.forEach(link => {
      link.classList.remove('active')
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active')
      }
    })
  })
}

// Scroll Reveal Logic
function initReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year')
  if (yearSpan) yearSpan.textContent = new Date().getFullYear()

  renderWorks()
  initTheme()
  initTyping()
  initScrollSpy()
  initReveal()
})

