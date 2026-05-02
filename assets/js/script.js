/* ============================================
   ⚠️ TROCA AQUI: data e hora em que vocês começaram a namorar.
   Formato: 'AAAA-MM-DDTHH:MM:SS'
   Exemplo: '2025-02-14T20:30:00' = 14 de fev de 2025, às 20:30.
   ============================================ */
const dataInicio = new Date('2025-02-21T20:00:00');


/* ============================================
   1. EXIBE A DATA NO HERO
   - getDate, getMonth e getFullYear voltam dia, mês (0–11) e ano.
   - padStart garante 2 dígitos: 1 vira "01".
   ============================================ */
function formatarDataHero(data) {
  const dia  = String(data.getDate()).padStart(2, '0');
  const mes  = String(data.getMonth() + 1).padStart(2, '0'); // +1 porque janeiro = 0
  const ano  = data.getFullYear();
  return `${dia}.${mes}.${ano}`;
}

document.getElementById('start-date').textContent = formatarDataHero(dataInicio);


/* ============================================
   2. CONTADOR AO VIVO (atualiza a cada 1 segundo)
   - Pega a diferença em milissegundos entre agora e a data de início.
   - Converte essa diferença em dias, horas, minutos e segundos
     usando divisão + módulo (%).
   ============================================ */
const $days    = document.getElementById('days');
const $hours   = document.getElementById('hours');
const $minutes = document.getElementById('minutes');
const $seconds = document.getElementById('seconds');

function atualizarContador() {
  const agora = new Date();
  const diff  = agora - dataInicio; // diferença em milissegundos

  const MS_POR_SEGUNDO = 1000;
  const MS_POR_MINUTO  = MS_POR_SEGUNDO * 60;
  const MS_POR_HORA    = MS_POR_MINUTO * 60;
  const MS_POR_DIA     = MS_POR_HORA * 24;

  const dias     = Math.floor(diff / MS_POR_DIA);
  const horas    = Math.floor((diff / MS_POR_HORA)    % 24);
  const minutos  = Math.floor((diff / MS_POR_MINUTO)  % 60);
  const segundos = Math.floor((diff / MS_POR_SEGUNDO) % 60);

  $days.textContent    = String(dias).padStart(3, '0');
  $hours.textContent   = String(horas).padStart(2, '0');
  $minutes.textContent = String(minutos).padStart(2, '0');
  $seconds.textContent = String(segundos).padStart(2, '0');
}

atualizarContador();              // chama uma vez assim que carrega
setInterval(atualizarContador, 1000); // depois atualiza a cada 1s


/* ============================================
   3. ANIMAÇÕES COM GSAP
   - gsap.from(): elemento começa diferente e anima até o estado final do CSS.
   - ScrollTrigger: dispara animação quando a seção entra na tela.
   ============================================ */
gsap.registerPlugin(ScrollTrigger);

// Entrada do hero (em cascata)
gsap.from('.hero__eyebrow',  { opacity: 0, y: 20, duration: 1.2, ease: 'power3.out', delay: 0.3 });
gsap.from('.hero__title',    { opacity: 0, y: 40, duration: 1.4, ease: 'power3.out', delay: 0.5 });
gsap.from('.hero__subtitle', { opacity: 0, y: 20, duration: 1.2, ease: 'power3.out', delay: 0.9 });
gsap.from('.hero__date',     { opacity: 0, y: 20, duration: 1.2, ease: 'power3.out', delay: 1.2 });
gsap.from('.hero__scroll',   { opacity: 0,        duration: 1.5, delay: 1.8 });

// Reveal das seções ao rolar
const seletoresReveal = [
  '.photo__figure',
  '.counter__label',
  '.counter__grid',
  '.counter__caption',
  '.letter__title',
  '.letter__body',
  '.list__title'
];

seletoresReveal.forEach((sel) => {
  gsap.from(sel, {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: sel,
      start: 'top 85%',          // dispara quando o topo do elemento chega a 85% da tela
      toggleActions: 'play none none none'
    }
  });
});

// Stagger nos itens da lista (um aparece depois do outro)
gsap.from('.list__item', {
  opacity: 0,
  y: 30,
  duration: 1,
  ease: 'power3.out',
  stagger: 0.15,
  scrollTrigger: {
    trigger: '.list__items',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});
