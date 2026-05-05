
const pages = window.PAGES || [];
let current = 0;
const $ = (s) => document.querySelector(s);

function common(){
  if(localStorage.getItem('luxTheme') === 'dark') document.body.classList.add('dark');
  $('#themeBtn')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('luxTheme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
}
function openModal(src){
  $('#modalImg').src = src;
  $('#modal').classList.add('open');
}
function modal(){
  $('#closeModal')?.addEventListener('click', () => $('#modal').classList.remove('open'));
  $('#modal')?.addEventListener('click', e => { if(e.target.id === 'modal') $('#modal').classList.remove('open'); });
}
function renderReader(dir='next'){
  const img = $('#pageImg'), info = $('#pageInfo'), box = $('#pageBox');
  if(!img || !info || !box) return;
  box.classList.remove('turn-next','turn-prev');
  void box.offsetWidth;
  box.classList.add(dir === 'next' ? 'turn-next' : 'turn-prev');
  setTimeout(() => { img.src = pages[current]; }, 180);
  info.textContent = `صفحة ${current + 1} من ${pages.length}`;
  document.querySelectorAll('.thumb').forEach((t,i)=>t.classList.toggle('active', i === current));
}
function go(n, dir='next'){
  current = Math.max(0, Math.min(pages.length - 1, n));
  renderReader(dir);
}
function reader(){
  if(!$('#pageImg')) return;
  $('#prevBtn').onclick = () => go(current - 1, 'prev');
  $('#nextBtn').onclick = () => go(current + 1, 'next');
  $('#rightNav').onclick = () => go(current - 1, 'prev');
  $('#leftNav').onclick = () => go(current + 1, 'next');
  $('#firstBtn').onclick = () => go(0, 'prev');
  $('#lastBtn').onclick = () => go(pages.length - 1, 'next');
  $('#zoomBtn').onclick = () => openModal(pages[current]);
  $('#openBtn').onclick = () => window.open(pages[current], '_blank');
  document.addEventListener('keydown', e => {
    if(e.key === 'ArrowLeft') go(current + 1, 'next');
    if(e.key === 'ArrowRight') go(current - 1, 'prev');
  });
  $('#thumbs').innerHTML = pages.map((p,i)=>`<div class="thumb ${i===0?'active':''}" data-i="${i}"><img src="${p}" alt="صفحة ${i+1}"><span>${i+1}</span></div>`).join('');
  document.querySelectorAll('.thumb').forEach(t => t.onclick = () => go(+t.dataset.i, +t.dataset.i > current ? 'next' : 'prev'));
}
function gallery(){
  if(!$('#gallery')) return;
  function draw(){
    const q = ($('#search')?.value || '').trim();
    const list = pages.map((p,i)=>({p,i})).filter(x => !q || String(x.i+1).includes(q));
    $('#gallery').innerHTML = list.map(x=>`<div class="gitem" data-src="${x.p}"><img src="${x.p}" alt="صفحة ${x.i+1}"><p>صفحة ${x.i+1}</p></div>`).join('');
    document.querySelectorAll('.gitem').forEach(el => el.onclick = () => openModal(el.dataset.src));
  }
  $('#search')?.addEventListener('input', draw);
  draw();
}
common(); modal(); reader(); gallery();
// kamel3lom
