// CALEB — app.js (vanilla JS)
const works = [
  {
    id: '1',
    title: 'Data-Selling Admin Dashboard',
    description: 'Comprehensive administrative interface for managing data bundle sales and transactions.',
    image: 'assets/images/Data-Selling Admin Dashboard.png',
    tags: ['Dashboard', 'Admin UI'],
    href: '#'
  },
  {
    id: '2',
    title: 'CourseCity Webapp',
    description: 'Dynamic e-learning platform for course management and student interaction.',
    image: 'assets/images/CourseCity Webapp.png',
    tags: ['Web Application', 'E-learning'],
    href: '#'
  },
  {
    id: '3',
    title: 'School Managemet System UI',
    description: 'Clean interface for educational institutions to manage records and schedules.',
    image: 'assets/images/School Managemet System UI.png',
    tags: ['School System', 'Management'],
    href: '#'
  },
  {
    id: '4',
    title: 'GCTU-LMS (Redesigned & Evaluated)',
    description: 'Enhanced Learning Management System for GCTU with focus on usability.',
    image: 'assets/images/GCTU-LMS.png',
    tags: ['LMS', 'UI/UX Design'],
    href: 'https://hci-gctu-lms-group-alpha.netlify.app'
  }
]

const testimonials = [
  {
    text: "Caleb's academic performance and technical skills are outstanding. He's a top-tier student in our Computer Science program.",
    author: "GCTU ACADEMICS",
    role: "Dean's Office",
    avatar: "assets/images/gctu_logo.png"
  },
  {
    text: "A reliable and creative partner for our e-learning platforms. Caleb's designs are intuitive and world-class.",
    author: "COURSECITY TEAM",
    role: "Management",
    avatar: "assets/images/coursecity_logo.png"
  },
  {
    text: "Pixel-perfect implementation and robust backend solutions. Working with Caleb on our digital projects was a game-changer.",
    author: "BYTEBEACON TECH",
    role: "Engineering Lead",
    avatar: "assets/images/bytebeacon_logo.png"
  }
]

function createCard(w) {
  const article = document.createElement('article')
  article.className = 'card'

  article.innerHTML = `
    <div class="card-media" style="background-image: url('${encodeURI(w.image)}')"></div>
    <div class="card-body">
      <h3 class="card-title">${w.title}</h3>
      <p class="card-description">${w.description}</p>
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
  initForm()
  initTestimonials()
})

function initTestimonials() {
  const avatar = document.getElementById('test-avatar')
  const text = document.getElementById('test-text')
  const author = document.getElementById('test-author')
  const role = document.getElementById('test-role')
  const container = document.getElementById('test-container')
  const dots = document.querySelectorAll('.test-dot')

  if (!container) return

  let idx = 0

  const update = () => {
    container.style.opacity = '0'
    container.style.transform = 'translateY(10px)'

    setTimeout(() => {
      const t = testimonials[idx]
      if (avatar) avatar.src = t.avatar
      if (text) text.textContent = `"${t.text}"`
      if (author) author.textContent = t.author
      if (role) role.textContent = t.role

      dots.forEach((dot, dIdx) => {
        dot.style.background = dIdx === idx ? 'var(--accent-color)' : 'var(--card-border)'
      })

      container.style.opacity = '1'
      container.style.transform = 'translateY(0)'
      idx = (idx + 1) % testimonials.length
    }, 500)
  }

  setInterval(update, 5000)
}

// Netlify Form Handling
function initForm() {
  const form = document.getElementById('contact-form')
  if (!form) return
  const statusEle = document.getElementById('form-status')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)

    // Disable button during submission
    const submitBtn = form.querySelector('.btn-submit-contact')
    const originalBtnText = submitBtn.textContent
    submitBtn.textContent = 'SENDING...'
    submitBtn.disabled = true

    try {
      await fetch("https://formsubmit.co/ajax/adzokatsekaleb@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      })

      statusEle.textContent = "Thanks for your message, Caleb will get back to you soon!"
      statusEle.className = "form-status success"
      form.reset()

      // Clear status after 5 seconds
      setTimeout(() => {
        statusEle.style.display = 'none'
      }, 5000)

    } catch (error) {
      statusEle.textContent = "Oops! There was an error sending your message. Please try again."
      statusEle.className = "form-status error"
    } finally {
      submitBtn.textContent = originalBtnText
      submitBtn.disabled = false
    }
  })
}
