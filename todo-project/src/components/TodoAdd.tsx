import { useState } from 'react'
import { TodoAddProps } from '../types/todos'

export default function TodoAdd({ onAdd }: TodoAddProps) {
  const [value, setValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onAdd(value.trim())
      setValue('')
    }
  }

  return (
    <div>
      <h2>添加任务</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入任务名称，按回车添加"
      />
    </div>
  )
}

