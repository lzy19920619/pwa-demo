// sync.js
const statusEl = document.getElementById('sync-status');
const btn = document.getElementById('sync-now');

function updateStatus(msg, ok=true) {
  statusEl.textContent = msg;
  statusEl.style.color = ok ? 'green' : 'red';
}

btn.addEventListener('click', () => {
  if (navigator.onLine) {
    updateStatus('网络正常，开始同步...');
    setTimeout(() => updateStatus('✅ 同步完成！'), 1000);
  } else {
    updateStatus('⚠️ 当前离线，无法同步', false);
  }
});

window.addEventListener('online', () => updateStatus('✅ 网络恢复'));
window.addEventListener('offline', () => updateStatus('❌ 网络断开', false));
