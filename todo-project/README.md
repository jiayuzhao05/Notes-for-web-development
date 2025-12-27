# Todos 案例

使用 TypeScript + React 实现的 todos 任务管理案例。

## 功能

1. **展示任务列表** - 使用状态提升实现父→子通讯
2. **添加任务** - 使用回调函数实现子→父通讯

## 项目结构

```
todo-project/
├── src/
│   ├── components/
│   │   ├── TodoAdd.tsx      # 添加任务组件
│   │   └── TodoList.tsx     # 任务列表组件
│   ├── types/
│   │   └── todos.d.ts       # 类型声明文件
│   ├── App.tsx              # 父组件
│   ├── main.tsx             # 入口文件
│   └── index.css            # 样式文件
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 技术实现

### 1. 展示任务列表（父→子通讯）

- 父组件 `App` 维护任务列表状态
- 通过 props 将任务列表传递给 `TodoList` 组件
- 使用类型声明文件 `todos.d.ts` 实现类型共享

### 2. 添加任务（子→父通讯）

- `TodoAdd` 组件使用受控组件方式管理输入框状态
- 通过回调函数 `onAdd` 将任务名称传递给父组件
- 父组件接收数据并更新任务列表状态

## 安装和运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 核心概念

- **状态提升**：将共享状态提升到最近的公共父组件
- **受控组件**：表单元素的值由 React 状态控制
- **类型共享**：使用 `.d.ts` 文件定义和导出公共类型

