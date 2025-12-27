// 任务项类型
export interface Todo {
  id: string
  name: string
}

// TodoList 组件的 props 类型
export interface TodoListProps {
  todos: Todo[]
}

// TodoAdd 组件的 props 类型
export interface TodoAddProps {
  onAdd: (name: string) => void
}

