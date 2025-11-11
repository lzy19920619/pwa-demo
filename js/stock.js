// stock.js
import { db } from './db.js';

async function render() {
  const code = document.getElementById('search-code').value.trim() || null;
  const inbound = await db.listInbound(code);
  const outbound = await db.listOutbound(code);
  document.getElementById('stock-in').innerHTML = inbound.map(r =>
    `<li>${r.code} × ${r.qty} <span class="meta">${new Date(r.ts).toLocaleString()}</span></li>`
  ).join('');
  document.getElementById('stock-out').innerHTML = outbound.map(r =>
    `<li>${r.code} × ${r.qty} <span class="meta">${new Date(r.ts).toLocaleString()}</span></li>`
  ).join('');
}

document.getElementById('btn-refresh').addEventListener('click', render);
render();
