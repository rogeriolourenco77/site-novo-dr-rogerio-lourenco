// =====================================================
// Lourenço & Lourenço — site institucional
// =====================================================

(function(){
  'use strict';

  // Header scroll effect
  const header = document.querySelector('.site-header');
  let lastY = 0;
  function onScroll(){
    const y = window.scrollY;
    if (header){
      header.classList.toggle('scrolled', y > 40);
    }
    lastY = y;
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-menu');
  if (burger && menu){
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('show'));
  }

  // Smooth scroll para âncoras dentro da página
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1 && document.querySelector(id)){
        e.preventDefault();
        document.querySelector(id).scrollIntoView({ behavior:'smooth', block:'start' });
      }
    });
  });

  // Contact form — handler simples (mailto fallback até instalar backend)
  const form = document.querySelector('#contact-form');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const nome = data.get('nome') || '';
      const email = data.get('email') || '';
      const tel = data.get('telefone') || '';
      const area = data.get('area') || '';
      const msg = data.get('mensagem') || '';
      const subject = encodeURIComponent('Contato pelo site — ' + (area || 'Lourenço & Lourenço'));
      const body = encodeURIComponent(
        `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${tel}\nÁrea de interesse: ${area}\n\nMensagem:\n${msg}`
      );
      // Abre cliente de e-mail; o ideal é trocar por backend PHP no Locaweb depois
      window.location.href = `mailto:contato@lourencoelourenco.adv.br?subject=${subject}&body=${body}`;
    });
  }
})();
