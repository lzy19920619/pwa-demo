// sw.js — 移动货品管理系统 PWA
// 网络优先 + 离线缓存 + 自动版本更新

const VERSION = 'v2.0.0';
const STATIC_CACHE = `static-${VERSION}`;

// 按照当前目录结构，确保路径完全正确
const STATIC_ASSETS = [
  // 页面文件
  '/login.html',
  '/home.html',
  '/in.html',
  '/out.html',
  '/stock.html',
  '/sync.html',

  // 样式与脚本
  '/styles/style.css',
  '/js/login.js',
  '/js/home.js',
  '/js/in.js',
  '/js/out.js',
  '/js/stock.js',
  '/js/sync.js',
  '/js/db.js',

  // PWA配置与图标
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',

  // 网络探测
  '/ping.txt'
];

const NETWORK_TIMEOUT_MS = 5000;

self.addEventListener('install', (event) => {
  console.log('📦 正在安装 Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => console.log('✅ 缓存完毕:', STATIC_ASSETS.length, '个资源'))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('🔄 激活新 Service Worker...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => (k.startsWith('static-') && k !== STATIC_CACHE) ? caches.delete(k) : null)
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  // 只缓存本站资源
  if (url.origin !== self.location.origin) return;

  // 对静态资源与页面采用 network-first 策略
  event.respondWith(networkFirstWithTimeout(req));
});

async function networkFirstWithTimeout(req) {
  const cache = await caches.open(STATIC_CACHE);
  try {
    const res = await fetchWithTimeout(req, NETWORK_TIMEOUT_MS);
    if (res && res.status === 200) {
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    console.warn('⚠️ 网络请求失败，使用缓存:', req.url);
    const cached = await cache.match(req);
    if (cached) return cached;
    // 如果是导航请求（HTML 页面），回退到首页
    if (req.mode === 'navigate' || req.destination === 'document') {
      return await cache.match('/login.html');
    }
    throw err;
  }
}

function fetchWithTimeout(req, timeout) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  return fetch(req, { signal: controller.signal, cache: 'no-store' })
    .finally(() => clearTimeout(timer));
}
