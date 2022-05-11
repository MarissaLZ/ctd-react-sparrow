import React from 'react';
import TodoList from './TodoList.js'
import AddTodoForm from './AddTodoForm.js'
import { useState } from 'react/cjs/react.production.min';
import react from 'react';


function App() {
  //todoList is an array value
  const [todoList, setTodoList] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    //async task
     //Headers contain metadata about the request, such as content type, user agent
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`,{headers:{Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`}})
    .then((response) => response.json())
    .then((data) => {
      //an array of objects
      console.log(data.records)
      setTodoList(data.records)
      setIsLoading(false)
    })
    .catch((error) => console.log("error",error))
  },[])

  //useEffect hook to store todoList
  React.useEffect( () => {
    if (isLoading === false) {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList))
    }
  }, [todoList,isLoading ])

  const addTodo = (newTodo) => {
    return(
      //updating the todoList array to contain the old todoList objects and the new list object
      setTodoList([...todoList, newTodo])
    )
  }

  const removeTodo = (id) => {
    //remove item w/ a given id
    //locate item with given id and then remove
    const newTodoList = todoList.filter( (item)=> id!==item.id)
    setTodoList(newTodoList)

  }
  return (
  <>
    <h1>Todo List</h1>
    <AddTodoForm onAddTodo={addTodo}/>
    { isLoading ? <p>Loading</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>}
  </>
  );
}
export default App;