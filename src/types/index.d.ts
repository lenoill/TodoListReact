interface State {
    todos: Todo[]
}
interface Todo{
    id: any,
    title: string
}

type Action = 
    | SetTodos
    | FetchTodos
    | AddTodo
    | DeleteTodo

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

interface FetchTodos {
    type: 'FETCHTODOS',
    payload:any
}