import React, {useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import {db} from "./firebase-config";
import {collection, getDocs, addDoc} from "firebase/firestore";

// git add .   / git status  / git commit -m ""  / git push  / git pull  / git checkout master  / git checkout main
// https://github.com/KevinJinwoogCho/moim.git
// https://www.youtube.com/watch?v=hQAHSlTtcmY
// https://www.youtube.com/watch?v=jCY6DH8F4oc&t=2s

//defining variable in Local Storage where we store "todos"
const LOCAL_STORAGE_KEY = "todoApp.todos"



function App() {
  
  /* Start - Firebase */
  console.log("test")
  const [users, setUsers] = useState([])
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(0)
  //grab data from "users" collection
  const usersCollectionRef = collection(db,"users")
  
  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, age: newAge} )
  }
  
  /* End */





  // setTodos is a function that allows us to update our "todos"
  const [todos, setTodos] = useState([])
  
  //'useRef' allows us to grab a value and store it in variable
  const todoNameRef = useRef()

  // need to store "todo" data into local storage and fetch when refreshed
  // useEffect is way to perform tasks on the side

  // below useEffect loads data from localstorage once on every load
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    console.log (storedTodos)
    setTodos( prevTodos => [...prevTodos, ...storedTodos] );


    /** Code related to Firebase - Start */
    const getUsers = async () => {
      const userData = await getDocs(usersCollectionRef)
      console.log(userData)
      // looping through documents in the collection and setting "users" Array with document data + its ID
      setUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
      console.log(users)
    }
    getUsers();
    /** Code related to Firebase - End */

  }, [])

  // below useEffect stores todos in localstorage
  // , [todos] means we run the function everytime there's change in todos
  useEffect(()  => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) 
  }, [todos])

  

  //toggling the todo items - this is triggered by "onChange" from ToDo.js  
  function toggleTodo(id){
    const newTodos = [...todos]
    //The find() method, which takes in a function, returns the value of the first element that passes a test.
    // "newTodos.find(todo => todo.id === id)" means find "todo=> todo.id===id" from newTodos
    //"todo => todo.id === id" is an arrow function
    const todoItem = newTodos.find(todoLocalVariable => todoLocalVariable.id === id)
    console.log (todoItem)
    todoItem.complete = !todoItem.complete
    setTodos(newTodos)
  }

  // e is the event listener
  function addToDo(e){
    const name = todoNameRef.current.value
    
    //simply terminate function if the input box is empty. 
    if (name === '') return

    //as there were valid response provided. we'll need to update "todos" array w latest value
    setTodos (prevTodos => {
      return [...prevTodos,{id: uuidv4(), name: name, complete: false}]
    })  

    //clears out the input box
    todoNameRef.current.value = null
  }

  function clearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  
  
  //ref in input is from 'useRef' 
  return (
    <>
      <TodoList todoList ={todos} toggleTodoTask={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={addToDo}> Add Todo</button>
      <button onClick={clearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do  </div>


      
      <input placeholder = "Name..." onChange={(event) => {setNewName(event.target.value)}}/>
      <input type="number" placeholder = "Age..." onChange={(event) => {setNewAge(event.target.value)}}/>
      <button onClick={createUser}> Creaet User </button>
      <div>
        {
          users.map((user) => {
            return (
              <div key={user.id}> 
                <h1>Name: {user.name}</h1>
                <h1>Name: {user.age}</h1>
              </div>
            )
          })
        }
      </div>
    </>
  )


}

export default App;
