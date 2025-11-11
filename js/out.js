// out.js
import { db } from './db.js';

const form = document.getElementById('form-out');
const list = document.getElementById('list-out');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const code = document.getElementById('out-code').value.trim();
  const qty = parseInt(document.getElementById('out-qty').value);
  if (!code || qty <= 0) return alert('请输入有效条码和数量');
  await db.addOutbound(code, qty);
  form.reset();
  render();
});

async function render() {
  const records = await db.listOutbound();
  list.innerHTML = records.map(r =>
    `<li>${r.code} × ${r.qty} <span class="meta">${new Date(r.ts).toLocaleString()}</span></li>`
  ).join('');
}

render();
