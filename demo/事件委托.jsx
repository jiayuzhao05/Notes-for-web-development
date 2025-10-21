<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Delegation Demo</title>
  <style>
    ul { padding: 0; list-style: none }
    li { padding: 8px 12px; margin:6px 0; background:#e9ffe3; cursor:pointer }
    button.add { margin-top:12px }
  </style>
</head>
<body>
  <ul id="list">
    <li data-id="1">Item 1（点我）</li>
    <li data-id="2">Item 2（点我）</li>
    <li data-id="3">Item 3（点我）</li>
  </ul>
  <button class="add">添加新项</button>

  <script>
    const list = document.getElementById('list');

    // 只在父元素上挂一个监听器
    list.addEventListener('click', (e) => {
      // 精准命中：只处理点击到 li（或 li 内部子节点）的情况
      const li = e.target.closest('li');
      if (!li || !list.contains(li)) return; // 点击到了空白处或越界

      console.log('点击了：', li.dataset.id, li.textContent.trim());
      // 可在此执行删除/选中等逻辑
      // li.remove();
    });

    // 动态添加子项也能自动被“委托”到
    document.querySelector('.add').addEventListener('click', () => {
      const id = list.children.length + 1;
      const li = document.createElement('li');
      li.dataset.id = String(id);
      li.textContent = `Item ${id}（新加的也能点）`;
      list.appendChild(li);
    });
  </script>
</body>
</html>