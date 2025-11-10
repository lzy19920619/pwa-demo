# 移动货品管理系统（PWA Demo）

- 支持 **离线可用**（首次在线打开后）
- **网络优先**：有网时页面与数据优先走网络（本 Demo 无后端，仅页面文件网络优先），网络差/离线回退缓存
- **本地数据库**：IndexedDB 存储入库/出库记录
- **前端独立发版**：Android WebView 只需加载 HTTPS 域名

## 本地运行（静态 HTTPS 服务）
建议用任何支持 HTTPS 的静态服务器（Service Worker 需要安全上下文）。如果仅本地调试，也可以用 http://localhost 作为安全源。

1. 将本目录部署为站点根目录（确保 `/` 可访问到 login.html）
2. 访问 `https://你的域名/` 或 `http://localhost/`
3. 首次在线打开后，断网也能继续打开

> Android WebView 侧（一次性设置）：启用 JS 和 DOMStorage 即可。

## 目录说明
- login.html：登录页面
- home.html：首页（入库、出库、库存查询）
- in.html：入库页面
- out.html：出库页面
- stock.html：库存查询
- sync.html：数据同步页面
- app.js：导航与页面逻辑
- db.js：IndexedDB 数据存储
- sw.js：Service Worker（网络优先 + 超时回退缓存）
- manifest.webmanifest：PWA配置
- /icons：PWA 图标
- /ping.txt：网络探测用的极小资源
- /styles/style.css：样式
# pwa-demo
# pwa-demo
# pwa-demo
