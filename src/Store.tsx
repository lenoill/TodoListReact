import React, { createContext, PropsWithChildren, useReducer } from "react";
import { useReducerAsync } from "use-reducer-async";

const initialStoreContext = {
    state:{
        todos: []
    }
}

const reducer = (state: State, action: Action) => {
    switch( action.type ) {
        case 'SET_TODOS' : 
            console.log('SET_TODOS');
            return{...state,todos:action.payload}
        default: 
            return state
    }
}

const baseHeaders = {
    Acccept: 'application/json',
    'Content-Type': 'application/json'
}

const asyncActionHandler :any = {
    FETCHTODOS : ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('FETCHTODOS')
        const fetchSettings = {
            method:'GET',
            headers:baseHeaders
        }
        try{
            const response = await fetch('http://localhost:8000/todos', fetchSettings)
            const todos = await response.json()
            dispatch({type:'SET_TODOS', payload:todos})
        }catch(e){console.log(e)}
    },
    ADDTODOS: ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('ADDTODOS')
        console.log(action.payload)
        const fetchSettings = {
            method:'POST',
            headers:baseHeaders,
            body:JSON.stringify(action.payload.values)
        }
        try{
            const response = await fetch('http://localhost:8000/todos', fetchSettings)
            if(!response.ok){
                console.log('error')
            }else{
                const fetchSettings = {
                    method:'GET',
                    headers:baseHeaders
                }
                try{
                    const response = await fetch('http://localhost:8000/todos', fetchSettings)
                    const todos = await response.json()
                    dispatch({type:'SET_TODOS', payload:todos})
                }catch(e){console.log(e)}
            }
            // const todos = await response.json()
            // dispatch({type:'SET_TODOS', payload:todos})
        }catch(e){console.log(e)}
    },
    DELETETODO: ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('DELETETODO')
        console.log(action.payload.id)
        const fetchSettings = {
            method:'DELETE',
            headers:baseHeaders
        }
        try{
            const response = await fetch(`http://localhost:8000/todos/${action.payload.id}`, fetchSettings)
            if(!response.ok){
                console.log('error')
            }else{
                const fetchSettings = {
                    method:'GET',
                    headers:baseHeaders
                }
                try{
                    const response = await fetch('http://localhost:8000/todos', fetchSettings)
                    const todos = await response.json()
                    dispatch({type:'SET_TODOS', payload:todos})
                }catch(e){console.log(e)}
            }
        }catch(e){console.log(e)}
    }
}

//CONTEXT
const storeContext = createContext(initialStoreContext);
const {Provider} = storeContext;
const StateProvider = ({children}: PropsWithChildren<any>) => {
    const [state, dispatch] = useReducerAsync(reducer,initialStoreContext.state,asyncActionHandler)
    return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {storeContext, StateProvider}