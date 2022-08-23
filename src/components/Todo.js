import React from 'react'
import './style.css'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick() {
        toggleTodo(todo.id)
      }
  return (
    <div className='center'>
        <label className='tasks'>
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
            {todo.name}
        </label>
    </div>
  )
}
