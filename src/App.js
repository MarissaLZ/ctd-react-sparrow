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
    //create new promise
    new Promise( (resolve, reject ) => {
      //mimic async task
      setTimeout(()=> {
        //pass data to resolve(). loads after initial render 
        resolve( {data: {todoList: JSON.parse(localStorage.getItem("savedTodoList"))|| [] } } )},
         200)})
        .then((result) => {
      setTodoList(result.data.todoList)
      setIsLoading(false)
    })
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