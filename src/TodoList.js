import React from 'react'
import Todo from './ToDo'

export default function TodoList({todoList, toggleTodoTask}){
    return (
        todoList.map(todo1 => {
            //"key" allows code to identify each array by "todo1"  
            //Uses to identify which element when its value changes
            return <Todo key={todo1.id} todo2={todo1} toggleTodoTask2={toggleTodoTask} /> 
        })
    )
}