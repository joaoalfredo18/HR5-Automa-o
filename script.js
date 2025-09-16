// Partículas simples
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 80;

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticles(){
  particles = [];
  for(let i=0;i<PARTICLE_COUNT;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*2 + 0.6,
      vx: (Math.random()-0.5)*0.6,
      vy: (Math.random()-0.5)*0.6,
      a: Math.random()*0.6 + 0.2
    });
  }
}
createParticles();

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;

    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;

    ctx.beginPath();
    ctx.fillStyle = `rgba(30,144,255,${p.a})`;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// Header: muda estilo ao rolar
const header = document.querySelector('.header-hero');
function onScrollHeader(){
  if(window.scrollY>10){ header.classList.add('scrolled'); }
  else{ header.classList.remove('scrolled'); }
}
window.addEventListener('scroll', onScrollHeader);
onScrollHeader();

// Nav ativa por seção
const navLinks = document.querySelectorAll('.nav a');
const sections = [...document.querySelectorAll('section[id]')];

function setActiveLink(){
  const scrollPos = window.scrollY + window.innerHeight*0.3;
  let current = sections[0]?.id;
  sections.forEach(sec=>{
    const rect = sec.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    if(scrollPos >= top) current = sec.id;
  });
  navLinks.forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Fade-in
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.15});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

// Menu mobile
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
hamburger.addEventListener('click', ()=>{
  nav.classList.toggle('open');
  hamburger.classList.toggle('open');
});
navLinks.forEach(link=>link.addEventListener('click', ()=>nav.classList.remove('open')));

// Formulário de contato (feedback)
const form = document.getElementById('form-contato');
const feedback = document.querySelector('.form-feedback');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // Validação simples
    const data = new FormData(form);
    const nome = data.get('nome')?.trim();
    const email = data.get('email')?.trim();
    const mensagem = data.get('mensagem')?.trim();
    if(!nome || !email || !mensagem){
      feedback.textContent = 'Por favor, preencha todos os campos obrigatórios.';
      feedback.style.color = '#ffd166';
      return;
    }
    // Simulação de envio
    feedback.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
    feedback.style.color = '#4ee3a4';
    form.reset();
  });
}