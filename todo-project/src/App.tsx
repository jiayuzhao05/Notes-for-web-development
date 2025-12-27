import { useState } from 'react'
import TodoAdd from './components/TodoAdd'
import TodoList from './components/TodoList'
import { Todo } from './types/todos'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (name: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      name,
    }
    setTodos([...todos, newTodo])
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todos 案例</h1>
      <TodoAdd onAdd={handleAdd} />
      <TodoList todos={todos} />
    </div>
  )
}

export default App

