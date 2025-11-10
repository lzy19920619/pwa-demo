// home.js
function go(page) {
  window.location.href = page;
}

document.getElementById('go-in').addEventListener('click', () => go('/in.html'));
document.getElementById('go-out').addEventListener('click', () => go('/out.html'));
document.getElementById('go-stock').addEventListener('click', () => go('/stock.html'));
document.getElementById('go-sync').addEventListener('click', () => go('/sync.html'));

// 校验登录状态
if (!localStorage.getItem('authed')) {
  window.location.href = '/login.html';
}
