 import React from 'react'

 export default function Todo({todo2, toggleTodoTask2}){
    function handleTodoClick(){
        toggleTodoTask2(todo2.id)
    }
    
    return(
        <div>
            <label>
                <input type = "checkbox" checked={todo2.complete} onChange={handleTodoClick}/>
                {todo2.name}    
            </label>
        </div>
    )
 }