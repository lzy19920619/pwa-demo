// app.js - Navigation and data handling logic
import { db } from './db.js';

function navigateTo(page) {
  window.location.href = page;
}

document.getElementById('go-in').addEventListener('click', () => navigateTo('/in.html'));
document.getElementById('go-out').addEventListener('click', () => navigateTo('/out.html'));
document.getElementById('go-stock').addEventListener('click', () => navigateTo('/stock.html'));
document.getElementById('go-sync').addEventListener('click', () => navigateTo('/sync.html'));

// Handle Login
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('authed', 'true');
  navigateTo('/home.html');
});

if (localStorage.getItem('authed') !== 'true') {
  navigateTo('/login.html');
}
