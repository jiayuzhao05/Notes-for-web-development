//capture：window → document → html → body → 外层 → 内层
//addEventListener(type, handler, { capture: true }) 或第三个参数 true 才会在捕获阶段触发
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Capturing Demo</title>
  <style>
    .outer { padding:40px; background:#e6f0ff }
    .middle{ padding:40px; background:#cfe8ff }
    .inner { padding:40px; background:#b3dbff; cursor:pointer }
  </style>
</head>
<body>
  <div class="outer">
    outer
    <div class="middle">
      middle
      <div class="inner">inner（点我）</div>
    </div>
  </div>

  <script>
    const log = msg => console.log(msg);

    document.querySelector('.outer').addEventListener('click', () => log('outer (capture)'), true);
    document.querySelector('.middle').addEventListener('click', () => log('middle (capture)'), true);
    document.querySelector('.inner').addEventListener('click', () => log('inner (capture)'), true);

    // 再加一组冒泡监听，方便对比（第三个参数默认 false）
    document.querySelector('.outer').addEventListener('click', () => log('outer (bubble)'));
    document.querySelector('.middle').addEventListener('click', () => log('middle (bubble)'));
    document.querySelector('.inner').addEventListener('click', () => log('inner (bubble)'));
  //Bubbling Phase（inner (bubble) → middle (bubble) → outer (bubble)）
  const log = console.log;

    document.querySelector('.outer').addEventListener('click', () => log('outer (bubble)'));
    document.querySelector('.middle').addEventListener('click', () => log('middle (bubble)'));
    document.querySelector('.inner').addEventListener('click', (e) => {
      log('inner (bubble)');
      // 取消下面注释，试试阻止冒泡：
      // e.stopPropagation();
    });
  
  </script>
</body>
</html>
