'use strict';

// ── Selectors ──────────────────────────────────────────────────
const form        = document.getElementById('loginForm');
const emailInput  = document.getElementById('email');
const passInput   = document.getElementById('password');
const emailError  = document.getElementById('email-error');
const passError   = document.getElementById('password-error');
const submitBtn   = document.getElementById('submitBtn');
const btnLabel    = submitBtn.querySelector('.btn__label');
const btnSpinner  = submitBtn.querySelector('.btn__spinner');
const formStatus  = document.getElementById('formStatus');
const toggleBtn   = document.getElementById('togglePassword');
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;

// ── Validation helpers ─────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, errorEl, msg) {
  input.classList.add('field__input--error');
  input.setAttribute('aria-invalid', 'true');
  errorEl.textContent = msg;
}

function clearError(input, errorEl) {
  input.classList.remove('field__input--error');
  input.removeAttribute('aria-invalid');
  errorEl.textContent = '';
}

function validateEmail() {
  const v = emailInput.value.trim();
  if (!v)               { setError(emailInput, emailError, 'Email address is required.'); return false; }
  if (!EMAIL_RE.test(v)){ setError(emailInput, emailError, 'Enter a valid email address.'); return false; }
  clearError(emailInput, emailError);
  return true;
}

function validatePassword() {
  const v = passInput.value;
  if (!v)        { setError(passInput, passError, 'Password is required.'); return false; }
  if (v.length < 6) { setError(passInput, passError, 'Password must be at least 6 characters.'); return false; }
  clearError(passInput, passError);
  return true;
}

// ── Live validation (on blur, then on input after first attempt) ─
let submitted = false;

emailInput.addEventListener('blur', () => { if (submitted) validateEmail(); });
passInput.addEventListener('blur',  () => { if (submitted) validatePassword(); });

emailInput.addEventListener('input', () => { if (submitted) validateEmail(); });
passInput.addEventListener('input',  () => { if (submitted) validatePassword(); });

// ── Submit ─────────────────────────────────────────────────────
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitted = true;

  const emailOk = validateEmail();
  const passOk  = validatePassword();

  if (!emailOk) { emailInput.focus(); return; }
  if (!passOk)  { passInput.focus();  return; }

  // Loading state
  submitBtn.disabled = true;
  btnLabel.textContent = 'Signing in…';
  btnSpinner.style.display = 'flex';
  formStatus.textContent = '';

  try {
    // Simulate async auth (replace with real fetch)
    await new Promise(r => setTimeout(r, 1400));

    // Success
    btnLabel.textContent = 'Sign in';
    btnSpinner.style.display = 'none';
    submitBtn.disabled = false;

    const card = document.querySelector('.card');
    card.classList.add('card--success');

    // Inject success markup if not already there
    if (!card.querySelector('.success-message')) {
      const msg = document.createElement('div');
      msg.className = 'success-message';
      msg.innerHTML = `
        <div class="success-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <p class="success-title">You're signed in</p>
        <p class="success-sub">Redirecting you now…</p>`;
      card.appendChild(msg);
    }

    formStatus.textContent = 'Sign-in successful. Redirecting.';
  } catch {
    btnLabel.textContent = 'Sign in';
    btnSpinner.style.display = 'none';
    submitBtn.disabled = false;
    formStatus.textContent = 'Something went wrong. Please try again.';
  }
});

// ── Show / hide password ───────────────────────────────────────
toggleBtn.addEventListener('click', () => {
  const showing = passInput.type === 'text';
  passInput.type = showing ? 'password' : 'text';
  toggleBtn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
  toggleBtn.setAttribute('aria-pressed', String(!showing));
  toggleBtn.querySelector('.icon-eye').style.display     = showing ? '' : 'none';
  toggleBtn.querySelector('.icon-eye-off').style.display = showing ? 'none' : '';
});

// ── Dark mode toggle ───────────────────────────────────────────
function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeToggle.querySelector('.icon-sun').style.display  = dark ? 'none' : '';
  themeToggle.querySelector('.icon-moon').style.display = dark ? '' : 'none';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* localStorage unavailable (private browsing) */ }
}

themeToggle.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') !== 'dark');
});

// Restore saved preference or system preference
(function init() {
  let saved;
  try { saved = localStorage.getItem('theme'); } catch { /* localStorage unavailable (private browsing) */ }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved ? saved === 'dark' : prefersDark);
})();
