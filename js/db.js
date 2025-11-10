// db.js - IndexedDB wrapper with Inbound/Outbound & Syncable Data
const DB_NAME = 'pwa-stock-db';
const DB_VERSION = 1;
const STORE_IN = 'inbound';
const STORE_OUT = 'outbound';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_IN)) {
        const s = db.createObjectStore(STORE_IN, { keyPath: 'id', autoIncrement: true });
        s.createIndex('by_code', 'code', { unique: false });
        s.createIndex('by_time', 'ts', { unique: false });
      }
      if (!db.objectStoreNames.contains(STORE_OUT)) {
        const s = db.createObjectStore(STORE_OUT, { keyPath: 'id', autoIncrement: true });
        s.createIndex('by_code', 'code', { unique: false });
        s.createIndex('by_time', 'ts', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function addRecord(store, rec) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).add(rec);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function listRecords(store, code=null) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const st = tx.objectStore(store);
    const req = code ? st.index('by_code').getAll(code) : st.getAll();
    req.onsuccess = () => {
      const arr = (req.result || []).sort((a,b)=>a.ts-b.ts);
      resolve(arr);
    };
    req.onerror = () => reject(req.error);
  });
}

async function clearAll() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_IN, STORE_OUT], 'readwrite');
    tx.objectStore(STORE_IN).clear();
    tx.objectStore(STORE_OUT).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export const db = {
  addInbound: (code, qty) => addRecord(STORE_IN, { code, qty, ts: Date.now() }),
  addOutbound: (code, qty) => addRecord(STORE_OUT, { code, qty, ts: Date.now() }),
  listInbound: (code) => listRecords(STORE_IN, code),
  listOutbound: (code) => listRecords(STORE_OUT, code),
  clearAll
};
