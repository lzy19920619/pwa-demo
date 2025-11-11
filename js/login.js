// login.js
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('authed', 'true');
  window.location.href = '/warehouse.html';
});
