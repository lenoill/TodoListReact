import React, { FC,MouseEvent, useContext } from 'react'
import { storeContext } from '../Store';
import { Todo } from '../types';

const TodoItem:FC<{todo:Todo}> = ({todo}) => {
    const {state, dispatch} = useContext(storeContext)
    const handleDelete = (e:MouseEvent) => {
        dispatch({type:'DELETETODO', payload:{id:todo.id}})
    }
    return(
     <li className="flex items-center justify-between p-4 hover: bg-gray-50">
         <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
                <button onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-4 text-red-500 duration-200 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round"strokeLinejoin="round" strokeWidth="2"  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </button>
                <span>{todo.title}</span>
                
                <span className="px-3 py-1 ml-2 text-xs text-green-800 bg-green-300 rounded-lg">
                    {todo.tag.name}
                </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 ml-8 text-blue-700 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
         </div>
     </li>  
    )
}

export default TodoItem;