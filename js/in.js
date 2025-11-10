// in.js
import { db } from './db.js';

const form = document.getElementById('form-in');
const list = document.getElementById('list-in');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const code = document.getElementById('in-code').value.trim();
  const qty = parseInt(document.getElementById('in-qty').value);
  if (!code || qty <= 0) return alert('请输入有效条码和数量');
  await db.addInbound(code, qty);
  form.reset();
  render();
});

async function render() {
  const records = await db.listInbound();
  list.innerHTML = records.map(r =>
    `<li>${r.code} × ${r.qty} <span class="meta">${new Date(r.ts).toLocaleString()}</span></li>`
  ).join('');
}

render();
