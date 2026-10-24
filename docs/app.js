'use strict';

const tasks = [
  {slug:'stack-bowl-and-block', name:'Stack bowl & block', description:'Stack a side bowl onto the center bowl, then place a block into it.'},
  {slug:'bottle-to-trash', name:'Bottle to trash', description:'Pick up scattered bottles and place them in the trash can.'},
  {slug:'pour-teapot', name:'Pour teapot', description:'Pour water into a cup, then place the teapot and cup on a tray.'},
  {slug:'bowl-to-tray', name:'Bowl to tray', description:'Move a bowl to the center, then transfer it into a tray with the other arm.'},
  {slug:'stack-blocks', name:'Stack blocks', description:'Move blocks from the table to a tray and stack them.'},
  {slug:'clear-table', name:'Clear table', description:'Place all objects on the table into a drawer.'}
];

const libero = [
  ['Diffusion Policy',78.5,87.5,73.5,64.8,76.1],['OpenVLA',84.7,88.4,79.2,53.7,76.5],
  ['SpatialVLA',88.2,89.9,78.6,55.5,78.1],['CoT-VLA',87.5,91.6,87.6,69.0,83.9],
  ['π₀-Fast',96.4,96.8,88.6,60.2,85.5],['GR00T-N1',94.4,97.6,93.0,90.6,93.9],
  ['π₀',98.0,96.8,94.4,88.4,94.4],['F1',98.2,97.8,95.4,91.3,95.7],
  ['InternVLA-M1',98.0,99.0,93.8,92.6,95.9],['Discrete Diffusion VLA',97.2,98.6,97.4,92.0,96.3],
  ['Genie-Envisioner',98.2,97.6,95.8,94.4,96.5],['π₀.₅',98.8,98.2,98.0,92.4,96.9],
  ['GR00T-N1.6',97.7,98.5,97.5,94.4,97.0],['OpenVLA-OFT',97.6,98.4,97.9,94.5,97.1],
  ['X-VLA',98.2,98.6,97.8,97.6,98.1],['X-World',99.6,99.4,99.0,95.8,98.5]
];
const plus = [
  ['OpenVLA',0.8,3.5,23.0,8.1,34.8,15.2,28.5,15.6],['π₀',13.8,6.0,58.8,85.0,81.4,79.0,68.9,53.6],
  ['OpenVLA-OFT',56.4,31.9,79.5,88.7,93.3,75.8,74.2,69.6],['OpenVLA-OFT (w)',10.4,38.7,70.5,76.8,93.6,49.9,69.9,55.8],
  ['NORA',2.2,37.0,65.1,45.7,58.6,12.8,62.1,39.0],['WorldVLA',0.1,27.9,41.6,43.7,17.1,10.9,38.0,25.0],
  ['UniVLA',1.8,46.2,69.6,69.0,81.0,21.2,31.9,43.9],['π₀-Fast',65.1,21.6,61.0,73.2,73.2,74.4,68.8,61.6],
  ['RIPT-VLA',55.2,31.2,77.6,88.4,91.6,73.5,74.2,68.4],['OpenVLA-OFT (m)',55.6,21.7,81.0,92.7,91.0,78.6,68.7,67.9],
  ['X-World',52.6,72.5,94.3,95.4,85.8,59.7,84.7,76.5]
];
const ablations = [
  ['Without Stage 1',95.4,97.6,92.4,72.4,89.5],['Without Stage 2',99.2,98.8,97.2,94.2,97.4],
  ['Without Stages 1 & 2',97.4,96.2,93.4,81.2,92.1],['Shared projections',98.6,98.4,98.2,94.4,97.4],
  ['Without Q-Former',99.8,98.6,98.6,94.6,97.9],['Without video loss',99.8,100.0,97.2,96.2,98.3],
  ['Full model',99.6,99.4,99.0,95.8,98.5]
];

// Original method sources; OFT variant definitions follow LIBERO-Plus.
const methodReferences = {
  'Diffusion Policy': ['Chi et al., 2025', 'https://diffusion-policy.cs.columbia.edu/'],
  'OpenVLA': ['Kim et al., 2024', 'https://arxiv.org/abs/2406.09246'],
  'SpatialVLA': ['Qu et al., 2025', 'https://arxiv.org/abs/2501.15830'],
  'CoT-VLA': ['Zhao et al., 2025', 'https://arxiv.org/abs/2503.22020'],
  'π₀-Fast': ['Pertsch et al., 2025', 'https://arxiv.org/abs/2501.09747'],
  'GR00T-N1': ['Bjorck et al., 2025', 'https://arxiv.org/abs/2503.14734'],
  'π₀': ['Black et al., 2024', 'https://arxiv.org/abs/2410.24164'],
  'F1': ['Lv et al., 2025', 'https://arxiv.org/abs/2509.06951'],
  'InternVLA-M1': ['InternVLA-M1 Contributors, 2025', 'https://arxiv.org/abs/2510.13778'],
  'Discrete Diffusion VLA': ['Liang et al., 2025', 'https://arxiv.org/abs/2508.20072'],
  'Genie-Envisioner': ['Liao et al., 2025', 'https://arxiv.org/abs/2508.05635'],
  'π₀.₅': ['Physical Intelligence et al., 2025', 'https://arxiv.org/abs/2504.16054'],
  'GR00T-N1.6': ['GEAR Team et al., 2025', 'https://research.nvidia.com/labs/gear/gr00t-n1_6/'],
  'OpenVLA-OFT': ['Kim et al., 2025', 'https://arxiv.org/abs/2502.19645'],
  'X-VLA': ['Zheng et al., 2026', 'https://arxiv.org/abs/2510.10274'],
  'OpenVLA-OFT (w)': ['Kim et al., 2025', 'https://arxiv.org/abs/2502.19645'],
  'NORA': ['Hung et al., 2025', 'https://arxiv.org/abs/2504.19854'],
  'WorldVLA': ['Cen et al., 2025', 'https://arxiv.org/abs/2506.21539'],
  'UniVLA': ['Bu et al., 2025', 'https://arxiv.org/abs/2505.06111'],
  'RIPT-VLA': ['Tan et al., 2025', 'https://arxiv.org/abs/2505.17016'],
  'OpenVLA-OFT (m)': ['Kim et al., 2025', 'https://arxiv.org/abs/2502.19645']
};

function populateTable(id, rows) {
  const body = document.querySelector(`#${id} tbody`);
  rows.forEach(([name,...values]) => {
    const row = document.createElement('tr');
    if(name==='X-World'||name==='Full model') row.className='ours-row';
    const heading=document.createElement('th'); heading.scope='row'; heading.textContent=name;
    const reference=methodReferences[name];
    if(reference){
      const citation=document.createElement('a'); citation.className='method-citation';
      citation.href=reference[1]; citation.textContent=`(${reference[0]})`;
      citation.target='_blank'; citation.rel='noopener noreferrer';
      citation.setAttribute('aria-label',`${name}: ${reference[0]} (opens in a new tab)`);
      heading.append(citation);
    }
    row.append(heading);
    values.forEach(value=>{const cell=document.createElement('td');cell.textContent=value.toFixed(1);row.append(cell);});
    body.append(row);
  });
}
populateTable('libero-table',libero); populateTable('plus-table',plus); populateTable('ablation-table',ablations);

const grid = document.getElementById('demo-grid');
tasks.forEach((task,index)=>{
  const card=document.createElement('article'); card.className='demo-card';
  card.innerHTML=`<header><span class="demo-number">${String(index+1).padStart(2,'0')}</span><div><h3>${task.name}</h3><p>${task.description}</p></div></header><video class="demo-video" controls playsinline preload="none" poster="assets/posters/${task.slug}.webp" aria-label="X-World demonstration: ${task.name}"><source src="assets/videos/${task.slug}.mp4" type="video/mp4">Your browser does not support inline video. Download the recording below.</video><div class="demo-meta"><span>X-World · Dual-arm UR5e · Original recording</span><a href="assets/videos/${task.slug}.mp4" download aria-label="Download ${task.name} video">Download ↗</a></div>`;
  grid.append(card);
});

const heroVideo=document.getElementById('hero-video');
const playback=document.getElementById('hero-playback');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let userPaused=reducedMotion.matches;
let heroVisible=true;
function syncPlaybackLabel(){playback.textContent=heroVideo.paused?'Play video':'Pause video';playback.setAttribute('aria-label',heroVideo.paused?'Play featured video':'Pause featured video');}
async function playHero(){
  if(userPaused||!heroVisible||document.hidden) return;
  try{await heroVideo.play();}catch{syncPlaybackLabel();}
}
heroVideo.addEventListener('play',syncPlaybackLabel);
heroVideo.addEventListener('pause',syncPlaybackLabel);
heroVideo.addEventListener('error',()=>{document.getElementById('hero-video-status').textContent='Video could not load. The poster is shown; try another task.';syncPlaybackLabel();});
if(reducedMotion.matches){heroVideo.removeAttribute('autoplay');heroVideo.pause();}else{playHero();}
playback.addEventListener('click',()=>{userPaused=!heroVideo.paused;if(userPaused) heroVideo.pause();else playHero();});
document.querySelectorAll('[data-task]').forEach(button=>button.addEventListener('click',()=>{
  if(button.getAttribute('aria-pressed')==='true')return;
  const task=tasks.find(item=>item.slug===button.dataset.task);
  document.querySelectorAll('[data-task]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  heroVideo.poster=`assets/posters/${task.slug}.webp`; heroVideo.src=`assets/videos/${task.slug}.mp4`;
  heroVideo.setAttribute('aria-label',`X-World real-robot demonstration: ${task.name}`);
  document.getElementById('hero-task-name').textContent=task.name;
  document.getElementById('hero-video-status').textContent=`Showing ${task.name}.`;
  heroVideo.load(); playHero();
}));
const heroObserver=new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;if(heroVisible)playHero();else heroVideo.pause();},{threshold:.08});
heroObserver.observe(document.querySelector('.hero'));
document.addEventListener('visibilitychange',()=>{if(document.hidden)heroVideo.pause();else playHero();});
document.querySelectorAll('.demo-video').forEach(video=>video.addEventListener('play',()=>{document.querySelectorAll('.demo-video').forEach(other=>{if(other!==video)other.pause();});}));

const tabs=[...document.querySelectorAll('.results-tabs [role=tab]')];
function selectTab(tab,focus=false){tabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active;});if(focus)tab.focus();}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectTab(tabs[next],true);}});});

const figureDialog=document.getElementById('figure-dialog');
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{const image=document.getElementById('dialog-image');image.src=button.dataset.zoom;image.alt=button.querySelector('img').alt;figureDialog.showModal();}));
figureDialog.querySelector('.dialog-close').addEventListener('click',()=>figureDialog.close());
figureDialog.addEventListener('click',event=>{if(event.target===figureDialog){const rect=figureDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)figureDialog.close();}});

document.getElementById('copy-bibtex').addEventListener('click',async event=>{
  const button=event.currentTarget;const text=document.getElementById('bibtex').textContent;
  try{await navigator.clipboard.writeText(text);button.textContent='Copied ✓';document.getElementById('copy-status').textContent='BibTeX citation copied to clipboard.';setTimeout(()=>button.textContent='Copy BibTeX',2200);}
  catch{const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(document.getElementById('bibtex'));selection.removeAllRanges();selection.addRange(range);button.textContent='Citation selected';document.getElementById('copy-status').textContent='Citation selected. Press Control+C or Command+C to copy.';}
});

const navLinks=[...document.querySelectorAll('.section-nav>div a')];
const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.hash===`#${entry.target.id}`));}}),{rootMargin:'-15% 0px -65% 0px'});
navLinks.forEach(link=>{const section=document.querySelector(link.hash);if(section)navObserver.observe(section);});
