import React, { useState } from 'react'
import TodoList from './components/TodoList'

function App() {


  return (
    
    <div className="">
      {console.log(import.meta.env.VITE_API_URI)}
        <TodoList />
    </div>
  )
}

export default App
