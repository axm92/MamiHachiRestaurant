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

function closeMenu() 
{
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// menu tabs
function switchTab(id, event) 
{
  document.querySelectorAll('menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('menu-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  event.target.classList.add('active');
}

// gallery slider
const track = document.getElementById('galleryTrack');
const slides = track.querySelectorAll('gallery-slide');
let current = 0;

function goTo(index) 
{
    if(index >= slides.length)
      index = 0;

    if(index < 0)
         index = slides.length - 1;

    current = index;
    const slideWidth = slides[0].offsetWidth + 24 //width + gap
    track.style.transform = 'translateX(-${current * slideWidth}px);
}

document.getElementById('prevButton').onclick = () => goTo(current - 1);
document.getElementById('nextButton').onclick = () => goTo(current + 1);

window.addEventListener('resize', () => goTo(0));

// contact form
function submitForm() 
{
  const btn = document.querySelector('.btn-submit');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = '#4a5240';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
  }, 3000);
}
