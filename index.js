//Nav bar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () =>
{
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

//Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// menu tabs
function switchTab(id, event) 
{
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  event.target.classList.add('active');
}

// gallery slider
const track = document.getElementById('galleryTrack');
const slides = track.querySelectorAll('.gallery-slide');
const dotsContainer = document.getElementById('sliderDots');
let current = 0;

function getSlidesVisible() 
{
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 900) return 2;
  return 3;
}

function totalGroups() 
{
  return slides.length - getSlidesVisible() + 1;
}

function buildDots() 
{
  dotsContainer.innerHTML = '';
  const n = totalGroups();
  for (let i = 0; i < n; i++) {
    const d = document.createElement('div');
    d.className = 'slider-dot' + (i === current ? ' active' : '');
    d.onclick = () => goTo(i);
    dotsContainer.appendChild(d);
  }
}

function goTo(index) 
{
  current = Math.max(0, Math.min(index, totalGroups() - 1));
  const slideW = slides[0].offsetWidth + 24; // width + gap
  track.style.transform = `translateX(-${current * slideW}px)`;
  document.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

document.getElementById('prevBtn').onclick = () => goTo(current - 1);
document.getElementById('nextBtn').onclick = () => goTo(current + 1);

// Auto-play: advances every 4 seconds, pauses on hover
let autoPlay = setInterval(() => goTo((current + 1) % totalGroups()), 4000);
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlay));
track.parentElement.addEventListener('mouseleave', () => {
  autoPlay = setInterval(() => goTo((current + 1) % totalGroups()), 4000);
});

buildDots();
window.addEventListener('resize', () => { buildDots(); goTo(0); });

// contact form
function submitForm() {
  const btn = document.querySelector('.btn-submit');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = '#4a5240';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
  }, 3000);
}
