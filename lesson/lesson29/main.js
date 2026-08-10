// create worker
const worker = new Worker('worker.js');

const startBn = document.getElementById('start');
const stopBn = document.getElementById('stop');
const result = document.getElementById('result');
const uiTest = document.getElementById('ui-test');

let count = 0;
let timerId = null;

function startTimer() {
    // 已在计时就不重复启动
    if (timerId !== null) return;
    timerId = setInterval(() => {
      count++;
      uiTest.textContent = `计时：${count}`;
    }, 100);
  }
  function stopTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
    uiTest.textContent = `计时：${count}（已停止）`;
  }
  function bindWorkerEvents() {
    worker.onmessage = (event) => {
      const { type, data } = event.data;
      if (type === 'result') {
        result.textContent = `结果：${data}`;
        stopTimer(); // Worker 算完，计时也停
      }
      if (type === 'progress') {
        result.textContent = `进度：${data}%`;
      }
    };
    worker.onerror = (error) => {
      result.textContent = `错误：${error.message}`;
      stopTimer();
    };
  }
  bindWorkerEvents();
  // 开始：启动计时 + 发送 Worker 任务
  startBn.addEventListener('click', () => {
    result.textContent = '计算中...';
    startTimer();
    worker.postMessage({
      type: 'start',
      payload: 100_000_000,
    });
  });
  // 停止：停止计时 + 终止 Worker
  stopBn.addEventListener('click', () => {
    stopTimer();
    worker.terminate();
    result.textContent = 'calculation canceled';
    // 重新创建 Worker，方便再次点击开始
    worker = new Worker('worker.js');
    bindWorkerEvents();
  });