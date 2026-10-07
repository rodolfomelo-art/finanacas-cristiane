document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  const header = document.getElementById('header');
  const menu = document.getElementById('mobileMenu');
  const menuButton = document.getElementById('menuButton');
  const modal = document.getElementById('leadModal');
  const form = document.getElementById('leadForm');
  const success = document.getElementById('formSuccess');
  const money = value => Number(value).toLocaleString('pt-BR', {style:'currency', currency:'BRL', maximumFractionDigits:0});

  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 24), {passive:true});
  menuButton.addEventListener('click', () => menuButton.setAttribute('aria-expanded', String(!menu.classList.toggle('hidden'))));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.add('hidden'); menuButton.setAttribute('aria-expanded','false'); }));

  let lastFocus = null;
  const openModal = event => { event.preventDefault(); lastFocus = document.activeElement; modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; setTimeout(() => modal.querySelector('input')?.focus(), 200); };
  const closeModal = () => { modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; lastFocus?.focus(); };
  document.querySelectorAll('[data-open-modal]').forEach(el => el.addEventListener('click', openModal));
  document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  addEventListener('keydown', event => { if(event.key === 'Escape') closeModal(); });

  document.querySelectorAll('.faq-item button').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    document.querySelectorAll('.faq-item').forEach(other => { if(other !== item) other.classList.remove('open'); });
    item.classList.toggle('open');
    document.querySelectorAll('.faq-item').forEach(el => el.querySelector('button').setAttribute('aria-expanded', String(el.classList.contains('open'))));
  }));

  const income = document.getElementById('income');
  const debt = document.getElementById('debt');
  function updateSimulator(){
    const i = +income.value, d = Math.min(+debt.value, i), free = i-d, ratio = Math.round((d/i)*100), goal = Math.max(50, Math.round((free*.15)/50)*50);
    document.getElementById('incomeValue').textContent=money(i); document.getElementById('debtValue').textContent=money(d);
    document.getElementById('ratioResult').textContent=ratio+'%'; document.getElementById('freeResult').textContent=money(free); document.getElementById('goalResult').textContent=money(goal);
  }
  income.addEventListener('input', updateSimulator); debt.addEventListener('input', updateSimulator);

  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('visible'); observer.unobserve(entry.target);} }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const text = `Olá, Cristiane! Me chamo ${data.get('name').trim()}. Meu objetivo é: ${data.get('goal')}. Meu WhatsApp: ${data.get('phone').trim()}.`;
    window.open('https://wa.me/5511952499352?text=' + encodeURIComponent(text), '_blank', 'noopener');
    form.classList.add('hidden'); success.classList.remove('hidden'); lucide.createIcons();
  });
  document.getElementById('year').textContent = new Date().getFullYear();
});
