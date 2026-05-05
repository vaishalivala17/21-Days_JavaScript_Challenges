const USERS_KEY   = 'nexus_users';
const SESSION_KEY = 'nexus_session';

function getUsers()  { return JSON.parse(localStorage.getItem(USERS_KEY)  || '[]'); }
function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
function getSession(){ return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
function saveSession(s){ localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
function clearSession(){ localStorage.removeItem(SESSION_KEY); }


window.addEventListener('DOMContentLoaded', () => {
  const sess = getSession();
  if (sess) showDashboard(sess);
});

function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t,i) =>
    t.classList.toggle('active', (tab==='login' && i===0)||(tab==='signup' && i===1)));
  document.getElementById('view-login').classList.toggle('active',  tab==='login');
  document.getElementById('view-signup').classList.toggle('active', tab==='signup');
  hideAlert();
  clearAllValidation();
}

function liveValidate(input, type) {
  const v = input.value.trim();
  let ok = false, msg = '';

  if (type === 'email') {
    ok  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    msg = ok ? 'Looks good!' : v ? 'Enter a valid email address.' : 'Email is required.';
  } else if (type === 'name') {
    ok  = v.length >= 2;
    msg = ok ? 'Looks good!' : v ? 'Min 2 characters required.' : 'This field is required.';
  } else if (type === 'password') {
    ok  = v.length >= 8;
    msg = ok ? 'Strong enough!' : v ? 'Min 8 characters required.' : 'Password is required.';
  } else if (type === 'password-simple') {
    ok  = v.length >= 1;
    msg = ok ? '' : 'Password is required.';
  } else if (type === 'confirm') {
    const pass = document.getElementById('s-pass')?.value || '';
    ok  = v === pass && v.length > 0;
    msg = ok ? 'Passwords match!' : v ? 'Passwords do not match.' : 'Please confirm your password.';
  }

  setFieldState(input, ok, msg);
  return ok;
}

function setFieldState(input, ok, msg) {
  input.classList.remove('is-valid','is-invalid');
  if (input.value.trim()) input.classList.add(ok ? 'is-valid' : 'is-invalid');

  const msgEl = document.getElementById(input.id + '-msg');
  if (!msgEl) return;
  msgEl.className = 'field-msg';
  if (msg && input.value.trim()) {
    msgEl.classList.add('show', ok ? 'ok' : 'err');
    msgEl.innerHTML = `<i class="bi bi-${ok ? 'check-circle' : 'exclamation-circle'}"></i> ${msg}`;
  }
}

function clearAllValidation() {
  document.querySelectorAll('.field-input').forEach(i => {
    i.classList.remove('is-valid','is-invalid');
  });
  document.querySelectorAll('.field-msg').forEach(m => m.className = 'field-msg');
}

function updateStrength(val) {
  const row   = document.getElementById('strength-row');
  const bars  = [1,2,3,4].map(n => document.getElementById('sb'+n));
  const label = document.getElementById('strength-label');

  if (!val) { row.classList.remove('show'); return; }
  row.classList.add('show');

  let score = 0;
  if (val.length >= 8)            score++;
  if (/[A-Z]/.test(val))         score++;
  if (/[0-9]/.test(val))         score++;
  if (/[^a-zA-Z0-9]/.test(val))  score++;

  const levels = ['weak','fair','good','strong'];
  const labels = ['Weak','Fair','Good','Strong'];
  const cls    = levels[score-1] || 'weak';

  bars.forEach((b,i) => {
    b.className = 's-bar';
    if (i < score) b.classList.add(cls);
  });
  label.className = `strength-label ${cls}`;
  label.textContent = labels[score-1] || 'Weak';
}

function toggleEye(inputId, btn) {
  const inp  = document.getElementById(inputId);
  const icon = btn.querySelector('i');
  const show = inp.type === 'password';
  inp.type   = show ? 'text' : 'password';
  icon.className = show ? 'bi bi-eye-slash' : 'bi bi-eye';
}

function toggleCheck(el) { el.classList.toggle('checked'); }


function showAlert(msg, isErr = false) {
  const el = document.getElementById('auth-alert');
  el.className = 'auth-alert show' + (isErr ? ' err' : '');
  el.querySelector('i').className = isErr ? 'bi bi-x-circle-fill' : 'bi bi-check-circle-fill';
  document.getElementById('alert-text').textContent = msg;
}
function hideAlert() {
  document.getElementById('auth-alert').classList.remove('show');
}

function setLoading(btn, on) {
  btn.classList.toggle('loading', on);
}

function handleLogin(e) {
  e.preventDefault();
  const emailInp = document.getElementById('l-email');
  const passInp  = document.getElementById('l-pass');
  const btn      = e.target.querySelector('.submit-btn');

  const vEmail = liveValidate(emailInp,'email');
  const vPass  = liveValidate(passInp,'password-simple');
  if (!vEmail || !vPass) return;

  setLoading(btn, true);
  hideAlert();

  setTimeout(() => {
    const users = getUsers();
    const user  = users.find(u => u.email === emailInp.value.trim().toLowerCase());

    if (!user) {
      showAlert('No account found with that email.', true);
      setLoading(btn, false);
      return;
    }
    if (user.password !== btoa(passInp.value)) {
      showAlert('Incorrect password. Please try again.', true);
      setLoading(btn, false);
      return;
    }

    user.lastLogin = new Date().toISOString();
    saveUsers(users);

    const session = { ...user };
    delete session.password;
    saveSession(session);

    setLoading(btn, false);
    showDashboard(session);
  }, 900);
}

function handleSignup(e) {
  e.preventDefault();
  const fName  = document.getElementById('s-fname');
  const lName  = document.getElementById('s-lname');
  const email  = document.getElementById('s-email');
  const pass   = document.getElementById('s-pass');
  const pass2  = document.getElementById('s-pass2');
  const terms  = document.getElementById('terms-check');
  const btn    = e.target.querySelector('.submit-btn');

  const vF = liveValidate(fName,'name');
  const vL = liveValidate(lName,'name');
  const vE = liveValidate(email,'email');
  const vP = liveValidate(pass,'password');
  const vC = liveValidate(pass2,'confirm');

  if (!vF || !vL || !vE || !vP || !vC) {
    showAlert('Please fix the errors above.', true);
    return;
  }
  if (!terms.classList.contains('checked')) {
    showAlert('You must accept the Terms of Service.', true);
    return;
  }

  setLoading(btn, true);
  hideAlert();

  setTimeout(() => {
    const users = getUsers();
    const emailVal = email.value.trim().toLowerCase();

    if (users.find(u => u.email === emailVal)) {
      showAlert('An account with this email already exists.', true);
      setLoading(btn, false);
      return;
    }

    const newUser = {
      id:        Date.now().toString(),
      firstName: fName.value.trim(),
      lastName:  lName.value.trim(),
      email:     emailVal,
      password:  btoa(pass.value),   // base64 for demo — use bcrypt in production!
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    const session = { ...newUser };
    delete session.password;
    saveSession(session);

    setLoading(btn, false);
    showAlert(`Welcome aboard, ${newUser.firstName}! Your account has been created.`);
    setTimeout(() => showDashboard(session), 1200);
  }, 1000);
}

function showForgot(e) {
  e.preventDefault();
  const email = document.getElementById('l-email').value.trim();
  if (!email) {
    showAlert('Enter your email above, then click "Forgot password".', true);
    return;
  }
  const users = getUsers();
  if (users.find(u => u.email === email.toLowerCase())) {
    showAlert(`Reset link sent to ${email} (demo — check localStorage).`);
  } else {
    showAlert('No account found with that email.', true);
  }
}

function socialLogin(provider) {
  showAlert(`${provider} OAuth would open here in a real app.`);
}

function showDashboard(user) {
  // Hide tabs + auth forms
  document.getElementById('auth-tabs').style.display = 'none';
  document.getElementById('view-login').classList.remove('active');
  document.getElementById('view-signup').classList.remove('active');
  hideAlert();

  const initials = (user.firstName?.[0] || '') + (user.lastName?.[0] || '');
  document.getElementById('dash-avatar').textContent   = initials || user.email[0].toUpperCase();
  document.getElementById('dash-name').textContent     = user.firstName || user.email.split('@')[0];
  document.getElementById('dash-email').textContent    = user.email;
  document.getElementById('dash-lastlogin').textContent= 'Just now';
  document.getElementById('dash-usercount').textContent= getUsers().length;

  document.getElementById('view-dashboard').classList.add('active');
}

function handleLogout() {
  clearSession();
  document.getElementById('auth-tabs').style.display = '';
  document.getElementById('view-dashboard').classList.remove('active');
  clearAllValidation();
  // Reset forms
  document.getElementById('login-form').reset();
  document.getElementById('signup-form').reset();
  document.getElementById('terms-check').classList.remove('checked');
  document.getElementById('remember-check').classList.remove('checked');
  document.getElementById('strength-row').classList.remove('show');
  switchTab('login');
  showAlert('You have been signed out successfully.');
}