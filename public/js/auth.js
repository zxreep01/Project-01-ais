/* Auth pages run in demo mode: forms are intercepted with a friendly toast.
   Point these forms at your real auth backend to go live. */
(() => {
  const toast = document.createElement('div');
  toast.className = 'demo-toast';
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);
  let timer;

  const show = (msg) => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 3400);
  };

  document.querySelectorAll('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      show('Demo build — connect this form to your auth backend to enable sign-in.');
    });
  });

  document.querySelectorAll('[data-demo-oauth]').forEach((btn) => {
    btn.addEventListener('click', () => show('GitHub OAuth is available on the live gateway.'));
  });
})();
