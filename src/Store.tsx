import React, { createContext, PropsWithChildren, useReducer } from "react";
import { navigate } from "@reach/router";
import { useReducerAsync } from "use-reducer-async";
import { Context, Action, State } from "./types";

const initialStoreContext:Context = {
    state:{
        todos: [],
        tags: [],
        jwt: '',
        error: null
    },
    dispatch:(_a:any)=>{}
}

const reducer = (state: State, action: Action) => {
    switch( action.type ) {
        case 'SET_TODOS' : 
            console.log('SET_TODOS');
            return{...state,todos:action.payload}
        case 'SET_TAGS' : 
            console.log('SET_TAGS');
            return{...state,tags:action.payload}
        case 'SET_JWT':
            console.log('SET_JWT');
            navigate('/todos');
            return {...state,jwt:action.payload}
        case 'SET_ERROR':
            console.log('SET_ERROR')
            return {...state, error: action.payload}
        default: 
            return state
    }
}

const baseHeaders = {
    Acccept: 'application/json',
    'Content-Type': 'application/json'
}

const asyncActionHandler :any = {
    FETCHTAGS : ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('FETCHTAGS')
        const fetchSettings = {
            method:'GET',
            headers:baseHeaders
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URI}/tags`, fetchSettings)
            const tags = await response.json()
            dispatch({type:'SET_TAGS', payload:tags})
        }catch(e){console.log(e)}
    },
    FETCHTODOS : ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('FETCHTODOS')
        const fetchSettings = {
            method:'GET',
            headers:baseHeaders
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URI}/todos?_expand=tag`, fetchSettings)
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
            const response = await fetch(`${import.meta.env.VITE_API_URI}/todos`, fetchSettings)
            if(!response.ok){
                console.log('error')
            }else{
                const fetchSettings = {
                    method:'GET',
                    headers:baseHeaders
                }
                try{
                    const response = await fetch(`${import.meta.env.VITE_API_URI}/todos?_expand=tag`, fetchSettings)
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
            const response = await fetch(`${import.meta.env.VITE_API_URI}/todos/${action.payload.id}`, fetchSettings)
            if(!response.ok){
                console.log('error')
            }else{
                const fetchSettings = {
                    method:'GET',
                    headers:baseHeaders
                }
                try{
                    const response = await fetch(`${import.meta.env.VITE_API_URI}/todos?_expand=tag`, fetchSettings)
                    const todos = await response.json()
                    dispatch({type:'SET_TODOS', payload:todos})
                }catch(e){console.log(e)}
            }
        }catch(e){console.log(e)}
    },
    REGISTER: ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('REGISTER')
        const fetchSettings = {
            method:'POST',
            headers:baseHeaders,
            body:JSON.stringify(action.payload)
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URI}/signup`, fetchSettings)
            if(!response.ok){
                console.log('error')
            }else{
              navigate('/');
            }
        }catch(e){console.log(e)}
    },
    LOGIN: ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('LOGIN')
        const fetchSettings = {
            method:'POST',
            headers:baseHeaders,
            body:JSON.stringify(action.payload)
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URI}/signin`, fetchSettings)
            if(!response.ok){
                const errorMsg = await response.text()
                dispatch({type:'SET_ERROR', payload: errorMsg})
            }else{
                dispatch({type:'SET_JWT', payload:(await response.json()).accessToken })
            //   navigate('/');
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