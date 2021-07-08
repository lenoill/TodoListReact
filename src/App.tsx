import React, { useContext, useEffect, useState } from 'react'
import TodoList from './components/TodoList'
import { Router, Redirect } from "@reach/router";
import Register from './components/Register';
import Login from './components/Login';
import { storeContext } from './Store';
import Error from './components/Error';

function App() {


  const {state, dispatch} = useContext(storeContext)
  const [logggedIn, setLoggedIn] = useState(false)
  useEffect(()=> {
    state.jwt && setLoggedIn(true)
  },[state])

  return (
    <div className="">
      <Error />
      <Router>
        <Login path="/" />
        <Register path="/register"/>
        {
          logggedIn ? 
            <TodoList path="/todos" />
          :
          <Redirect from="*" to="/" noThrow />
        }
      </Router>
    </div>
  )
}

export default App
