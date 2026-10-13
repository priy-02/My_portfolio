const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && !reduceMotion) {
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
menuToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  siteNav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const skillMessages = {
  all: 'A full-spectrum developer who can move from interface to insight.',
  build: 'Shipping responsive interfaces, secure APIs, and reliable data layers.',
  analyze: 'Turning messy records into decisions people can trust.',
  ai: 'Using LLMs and applied AI to make workflows more human and useful.'
};
document.querySelectorAll('.skill-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    document.querySelectorAll('.skill-tab').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.skill-cluster').forEach((cluster) => {
      const matches = filter === 'all' || cluster.dataset.group === filter || cluster.dataset.group === 'all';
      cluster.classList.toggle('is-dimmed', !matches);
    });
    document.querySelector('#skill-readout-text').textContent = skillMessages[filter];
    document.querySelector('#skill-readout-code').textContent = filter;
  });
});

const projects = {
  echoops: {
    type: 'Featured build / 01',
    stack: 'React · Node · MongoDB · LLM',
    title: 'EchoOps <span>— AI Incident Management</span>',
    description: 'An AI-powered system to log, triage, track, and resolve operational incidents through a full stack web application. LLM / Generative AI summarizes incidents, suggests root causes, and recommends next steps — reducing manual analysis effort.',
    tags: ['React.js', 'Node.js', 'Express', 'REST API'],
    visual: 'feature-echoops'
  },
  annotation: {
    type: 'Featured build / 02',
    stack: 'React · Node · MongoDB · RBAC',
    title: 'AI Data Annotation <span>— quality at scale</span>',
    description: 'A full stack web application to label, review, and export text and image datasets for ML training. Role-based access control and annotation quality checks support smooth multi-user annotation and review sessions.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'RBAC'],
    visual: 'feature-annotation'
  },
  rti: {
    type: 'Featured build / 03',
    stack: 'Python · NLP · LLM · Prompt Engineering',
    title: 'RTI LoopHole Detector <span>— policy intelligence</span>',
    description: 'A Generative AI pipeline using LLM-based semantic analysis to parse Right to Information clauses. Designed prompt-engineering logic to automatically flag ambiguous or loophole-prone language, accelerating policy compliance review.',
    tags: ['Python', 'LLM', 'NLP', 'Prompt Engineering'],
    visual: 'feature-rti'
  }
};
const feature = document.querySelector('#project-feature');
const visual = document.querySelector('#feature-visual');
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => {
    const project = projects[card.dataset.project];
    document.querySelectorAll('.project-card').forEach((item) => {
      const active = item === card;
      item.classList.toggle('is-selected', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('#feature-type').textContent = project.type;
    document.querySelector('#feature-stack').textContent = project.stack;
    document.querySelector('#feature-title').innerHTML = project.title;
    document.querySelector('#feature-description').textContent = project.description;
    document.querySelector('#feature-tags').innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
    visual.className = `feature-visual ${project.visual}`;
    visual.innerHTML = project.visual === 'feature-echoops'
      ? '<div class="visual-grid"></div><div class="signal-ring ring-a"></div><div class="signal-ring ring-b"></div><div class="feature-terminal"><span class="terminal-head">echoops / incident intelligence</span><span class="terminal-row"><b>severity</b><i>critical</i></span><span class="terminal-row"><b>root_cause</b><i>latency spike</i></span><span class="terminal-row"><b>next_action</b><i>recommended</i></span></div><div class="feature-glow"></div>'
      : project.visual === 'feature-annotation'
        ? '<div class="visual-grid"></div><div class="annotation-board"><span class="board-head">dataset / review queue</span><span class="board-row"><i></i><b>vehicle_0421</b><em>reviewed</em></span><span class="board-row"><i></i><b>street_scene_019</b><em>approved</em></span><span class="board-row"><i></i><b>portrait_882</b><em>needs label</em></span><span class="board-row"><i></i><b>product_103</b><em>reviewed</em></span></div><div class="annotation-cursor">+ label</div>'
        : '<div class="visual-grid"></div><div class="policy-orbit"><span>RTI</span><i>semantic</i><b>scan</b></div><div class="policy-lines"><span>clause 04 / ambiguous</span><span>clause 09 / loophole risk</span><span>clause 13 / clear</span></div><div class="feature-glow"></div>';
    feature.animate([{ opacity: .55, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 380, easing: 'ease-out' });
  });
});

// Keep the project visual language consistent when the alternate project views are selected.
const style = document.createElement('style');
style.textContent = `.feature-annotation .annotation-board,.feature-rti .policy-orbit,.feature-rti .policy-lines{position:absolute;z-index:2}.annotation-board{left:18%;top:17%;width:64%;padding:16px 20px;background:rgba(4,14,23,.88);border:1px solid rgba(98,201,255,.36);box-shadow:0 20px 50px rgba(0,0,0,.4)}.board-head{display:block;color:var(--blue-bright);font:10px var(--mono);padding-bottom:12px;border-bottom:1px solid var(--line);margin-bottom:9px}.board-row{display:grid;grid-template-columns:10px 1fr auto;gap:10px;align-items:center;color:var(--muted);font:9px var(--mono);padding:9px 0;border-bottom:1px solid rgba(183,216,239,.08)}.board-row:last-child{border-bottom:0}.board-row i{width:6px;height:6px;border-radius:50%;background:var(--cyan)}.board-row em{color:var(--cyan);font-style:normal}.annotation-cursor{position:absolute;z-index:3;bottom:24%;right:16%;padding:7px 10px;background:var(--cyan);color:var(--navy);font:10px var(--mono);box-shadow:0 0 20px rgba(139,240,224,.2);animation:float 5s ease-in-out infinite}.policy-orbit{left:53%;top:50%;width:148px;height:148px;border:1px solid rgba(139,240,224,.62);border-radius:50%;transform:translate(-50%,-50%);display:grid;place-items:center;color:var(--cyan);font:600 22px var(--mono);box-shadow:0 0 34px rgba(139,240,224,.1),inset 0 0 24px rgba(139,240,224,.08)}.policy-orbit:before,.policy-orbit:after{content:"";position:absolute;border:1px solid rgba(98,201,255,.3);border-radius:50%}.policy-orbit:before{inset:-22px}.policy-orbit:after{inset:25px;border-color:rgba(255,134,109,.5)}.policy-orbit i,.policy-orbit b{position:absolute;font:9px var(--mono);font-weight:400;color:var(--muted);white-space:nowrap}.policy-orbit i{top:-35px;left:70px}.policy-orbit b{bottom:-35px;right:62px;color:var(--coral)}.policy-lines{right:12%;top:26%;display:grid;gap:10px;font:9px var(--mono);color:var(--muted)}.policy-lines span{padding:8px 10px;border-left:2px solid var(--cyan);background:rgba(4,14,23,.72)}.policy-lines span:nth-child(2){border-color:var(--coral)}.policy-lines span:nth-child(3){border-color:var(--blue)}`;
document.head.appendChild(style);
