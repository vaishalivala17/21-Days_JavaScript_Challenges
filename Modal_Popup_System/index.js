document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100)+'%');
    btn.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');
  });
});

function openModal(id) {
  const ov = document.getElementById('overlay-' + id);
  ov.classList.add('active');
  document.body.style.overflow = 'hidden';
  // focus trap: focus first focusable element
  setTimeout(() => {
    const el = ov.querySelector('input,select,button:not(.modal-close)');
    if (el) el.focus();
  }, 80);
  // trigger progress bar if loading modal
  if (id === 'loading') resetDeploy();
}

function closeModal(id) {
  const ov = document.getElementById('overlay-' + id);
  const modal = ov.querySelector('.modal');
  // exit animation
  modal.style.transform = 'translateY(18px) scale(.97)';
  modal.style.opacity = '0';
  setTimeout(() => {
    ov.classList.remove('active');
    modal.style.transform = '';
    modal.style.opacity = '';
    document.body.style.overflow = '';
  }, 280);
  // reset form
  if (id === 'form') resetForm();
}

function handleOverlayClick(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}

// Esc key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.overlay.active').forEach(ov => {
      const id = ov.id.replace('overlay-', '');
      closeModal(id);
    });
  }
});

let currentStep = 0;
const TOTAL_STEPS = 3;

function formStep(dir) {
  const newStep = currentStep + dir;
  if (newStep < 0 || newStep >= TOTAL_STEPS) return;

  document.getElementById('step-' + currentStep).style.display = 'none';
  document.getElementById('dot-' + currentStep).classList.remove('active');
  document.getElementById('dot-' + currentStep).classList.add('done');

  currentStep = newStep;

  document.getElementById('step-' + currentStep).style.display = '';
  document.getElementById('dot-' + currentStep).classList.remove('done');
  document.getElementById('dot-' + currentStep).classList.add('active');

  document.getElementById('form-back').style.display = currentStep > 0 ? '' : 'none';

  const nextBtn = document.getElementById('form-next');
  if (currentStep === TOTAL_STEPS - 1) {
    nextBtn.textContent = 'Finish ✓';
    nextBtn.onclick = () => { toast('Account created!','#7e6cff'); closeModal('form'); };
  } else {
    nextBtn.textContent = 'Next →';
    nextBtn.onclick = () => formStep(1);
  }
}

function resetForm() {
  currentStep = 0;
  for (let i = 0; i < TOTAL_STEPS; i++) {
    const step = document.getElementById('step-' + i);
    const dot  = document.getElementById('dot-' + i);
    step.style.display = i === 0 ? '' : 'none';
    dot.classList.remove('active','done');
    if (i === 0) dot.classList.add('active');
  }
  document.getElementById('form-back').style.display = 'none';
  const nextBtn = document.getElementById('form-next');
  nextBtn.textContent = 'Next →';
  nextBtn.onclick = () => formStep(1);
}

let deployInterval = null;
let deployProgress = 0;

function resetDeploy() {
  clearInterval(deployInterval);
  deployProgress = 0;
  document.getElementById('prog-bar').style.transition = 'none';
  document.getElementById('prog-bar').style.width = '0%';
  document.getElementById('prog-label').textContent = '0%';
  document.getElementById('deploy-btn').textContent = 'Start Deploy';
  document.getElementById('deploy-btn').onclick = startDeploy;
}

function startDeploy() {
  const bar   = document.getElementById('prog-bar');
  const label = document.getElementById('prog-label');
  const btn   = document.getElementById('deploy-btn');

  btn.textContent = 'Running…';
  btn.onclick = null;
  bar.style.transition = '';

  clearInterval(deployInterval);
  deployProgress = 0;

  deployInterval = setInterval(() => {
    deployProgress += Math.random() * 12 + 2;
    if (deployProgress >= 100) {
      deployProgress = 100;
      clearInterval(deployInterval);
      bar.style.width = '100%';
      label.textContent = '100%';
      setTimeout(() => {
        toast('Deployment successful!','#5ce0a0');
        closeModal('loading');
      }, 600);
      return;
    }
    bar.style.width = deployProgress.toFixed(0) + '%';
    label.textContent = deployProgress.toFixed(0) + '%';
  }, 350);
}

function toast(msg, color = '#c8a96e') {
  const stack = document.getElementById('toast-stack');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="toast-dot" style="background:${color}"></span>${msg}`;
  stack.appendChild(t);
  setTimeout(() => {
    t.classList.add('hide');
    setTimeout(() => t.remove(), 350);
  }, 3000);
}