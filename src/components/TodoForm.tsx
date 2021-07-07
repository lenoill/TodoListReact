import React, { ChangeEvent, FC, MouseEvent, useContext, useState } from 'react'
import { storeContext } from '../Store'

const TodoForm:FC = () => {
    const {state, dispatch} = useContext(storeContext)
    const [values, setValues] = useState<{title:string}>({
        title: ''
    })
    const handleTitleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setValues(values => ({...values, title:e.target.value}))
    }
    const handleClick = (e:MouseEvent) => {
        console.log('create todo')
        console.log(values)
        dispatch({type:'ADDTODOS', payload:{values}})
        setValues({title:''})
    }
    return (
        <div className="flex items-center justify-center mt-8">
            <div className="flex items-end">
                <div>
                    <label htmlFor="todo" className="block text-2xl font-medium text-center text-gray-700">
                        Add a new Todo
                    </label>
                    <div className="mt-1">
                        <input value={values.title} onChange={handleTitleChange} type="text" name="todo" id="todo" placeholder="my best task" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>   
                </div>
                <button onClick={handleClick} type="button" className="relative inline-flex items-center px-2 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            aria-hidden="true">
                            <path fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                <div className="ml-16">
                    <label htmlFor="location" className="block text-2xl font-medium text-center text-gray-700">Category</label>
                    <select id="tag" name="tag" className="block w-full py-2 pl-3 pr-32 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>Sport</option>
                        <option>Study</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default TodoForm;