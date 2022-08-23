import React, { useState, useRef, useEffect} from 'react';
import './App.css';
import './components/style.css'
import TodoList from './components/TodoList';
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // load todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] );
  }, [])


  // save todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos );
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos( newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} className='center' type="text" />
      <div className='buttons'>
        <button onClick={handleAddTodo} className='add'>Add Todo</button>
        <button onClick={handleClearTodos}  className='clear'>Clear Complete</button>
      </div>
      <div className='center'>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
