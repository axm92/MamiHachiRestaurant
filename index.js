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

//closing mobile menu when any link inside is clicked
document.querySelectorAll('.mobile-menu a').forEach(link =>
{
  link.addEventListener('click', closeMenu);
}
)

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
const slides = track.querySelectorAll('gallery-slide');
let current = 0;

function goTo(index) 
{
    if(index >= slides.length)
      index = 0;

    if(index < 0)
         index = slides.length - 1;

    current = index;
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = 'translateX(-${current * slideWidth}px)';
}

document.getElementById('prevButton').onclick = () => goTo(current - 1);
document.getElementById('nextButton').onclick = () => goTo(current + 1);

window.addEventListener('resize', () => goTo(0));

//Shopping Cart
let cart = [];

function getCartItem(name)
{
  return cart.find(item => item.name === name);
}

function addToCart(name, price)
{
  const existing = getCartItem(name);

  if(existing)
  {
    existing.qty++;
  }
  else
  {
    cart.push({name, price, qty: 1});
  }

  updateCartUI();
  showCartToast(name);
}

function removeFromCart(name)
{
  cart = cart.filter(item => item.name !== name);
  updateCartUI();
}

function clearCart()
{
  cart = []; //empty cart
  updateCartUI();
}

function getCartTotal()
{
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount()
{
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI()
{
  const count = getCartCount();
  const badge = document.getElementById('cartBadge');
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';

  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartActions = document.getElementById('cartActions');

  if(cart.length === 0)
  {
    cartEmpty.style.display = 'block';
    cartItems.style.display = 'none';
    cartActions.style.display = 'none';
  }
  else
  {
    cartEmpty.style.display = 'none';
    cartItems.style.display = 'block';
    cartActions.style.display = 'flex';

    cartItems.innerHTML = cart.map(item =>
      <div class = "cart-item">
        <div class = "cart-item-info">
          <span class = "cart-item-name">${item.name}</span>
          <span class = "cart-item-qty">x ${item.qty}</span>
        </div>

        <div class = "cart-item-right">
          <span class ="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
          <button class = "cart-remove-btn" onclick = "removeFromCart('${item.name}'" title = "Remove">X</button>
        </div>
      </div>
    ).join('');

    cartTotal.textContent = '$${getCartTotal().toFixed(2)}';
  }
}

function toggleCart()
{
  const panel = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartOverlay');
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
  document.body.style.overflow = !isOpen ? 'hidden' : '';
}

function closeCart()
{
  document.getElementById('cartPanel').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function showCartToast(name)
{
  const toast = document.getElementById('cartToast');
  toast.textContent = '"${name}" added to cart';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

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

