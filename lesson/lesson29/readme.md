主线程（main.js）          Worker 线程（worker.js）
─────────────────         ─────────────────────
postMessage ──────────────→ onmessage 收到
onmessage ←────────────── postMessage 进度/结果
setInterval 每 100ms +1
（同时进行，互不阻塞）


时间 ──────────────────────────────────────────────────────────→

【加载】
main.js: new Worker → bindWorkerEvents → addEventListener（注册完，等待）

【用户点「开始」】
main: 计算中... → startTimer → postMessage ──→ worker: 开始循环
main: 计时 1, 2, 3...（每 100ms）          worker: 发 progress 0%, 10%...
main: 显示进度                               worker: 继续算...
main: 计时 4, 5, 6...                        worker: 发 result
main: 显示结果 → stopTimer

【用户点「停止】（若在计算中）
main: stopTimer → terminate → 重建 Worker