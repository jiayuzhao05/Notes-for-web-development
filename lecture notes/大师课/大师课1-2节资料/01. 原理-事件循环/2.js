setTimeout(function () {
  setTimeout(function () {
    setTimeout(function () {
      setTimeout(function () {
        setTimeout(function () {
          setTimeout(function () {
            setTimeout(function () {
              setTimeout(function () {
                setTimeout(function () {}, 4);
              }, 4);
            }, 4);
          }, 4);
        }, 0);
      }, 0);
    }, 0);
  }, 0);
}, 0);

// 9层嵌套的 setTimeout 调用:第 1-4 层（最外层到内层）：延迟为 0 ms
//第 5-8 层：延迟为 4ms;第 9 层（最内层）：延迟为 4ms
//每个 setTimeout 的回调会注册下一个 setTimeout
//执行顺序：从外到内，逐层触发
//浏览器中，setTimeout 的最小延迟通常为 4 毫秒（HTML5 规范）
//即使设置为 0，实际延迟也可能被限制为 4 毫秒
//连续嵌套的 setTimeout(fn, 0) 会累积延迟
//最内层的 setTimeout 回调是空函数，所以不会执行任何操作，仅用于完成嵌套结构