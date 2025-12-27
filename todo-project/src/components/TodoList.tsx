import { TodoListProps } from '../types/todos'

export default function TodoList({ todos }: TodoListProps) {
  return (
    <div>
      <h2>任务列表</h2>
      {todos.length === 0 ? (
        <p>暂无任务</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

