import { Dispatch } from "react"

type Context = {state:State, dispatch:Dispatch<Action>}

interface State {
    todos: Todo[],
    tags: Tag[],
    jwt: string,
    error: string | null
}
interface Todo{
    id: any,
    title: string,
    tag:{name:string}
}
interface Tag{
    id: any,
    name:string
}

type Action = 
    | SetTodos
    | FetchTodos
    | AddTodo
    | DeleteTodo
    | Fetchtags
    | SetTags
    | SetJwt
    | Register
    | Login
    | SetError

interface AddTodo {
    type: 'ADDTODOS',
    payload: {}
}
interface DeleteTodo {
    type: 'DELETETODO',
    payload: any
}

interface SetTodos {
    type: 'SET_TODOS',
    payload: Todo[]
}
interface SetTags {
    type: 'SET_TAGS',
    payload: Tag[]
}
interface SetError {
    type: 'SET_ERROR',
    payload: string
}

interface SetJwt {
    type:'SET_JWT',
    payload: string
}

interface FetchTodos {
    type: 'FETCHTODOS',
    payload:any
}
interface Fetchtags {
    type: 'FETCHTAGS',
    payload:any
}
interface Register {
    type:'REGISTER',
    payload:any
}
interface Login {
    type:'LOGIN',
    payload:any
}