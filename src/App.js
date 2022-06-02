import React from 'react';
import TodoList from './TodoList.js'
import AddTodoForm from './AddTodoForm.js'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
/*
Router- component used to encompass all of the diff components in
the application that will exist in the BrowseRouter system
Routes-determines where in router systmen where you want to have routes
*/
function App() {
  //todoList is an array value
  const [todoList, setTodoList] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(() => {
     //Headers contain metadata about the request, such as content type, user agent
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`,{
      headers:{Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
    }})
    .then((response) => response.json())
    .then((data) => {
      console.log("data.records",data.records)
      setTodoList( d=> data.records)
      setIsLoading(false)
    })
    .catch((error) => console.log("error", error))
  }, [])

  //useEffect hook to store todoList locally
  React.useEffect( () => {
    if (isLoading === false) {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList))
    }
  }, [todoList,isLoading ])

  //handlers
  const addTodo = (newTodo) => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      //send as array of ojects
      //create record { fields: {title: todoTitle} }
      body: JSON.stringify({
        records: [newTodo] 
      }),
    })
    .then(response => response.json())
    .then((data) => {
      console.log("setting data",data.records) 
      setTodoList([...todoList, ...data.records])
    })
  }
  const removeTodo = (id) => {
    //locate item with given id and then remove
    const newTodoList = todoList.filter( (item)=> id!==item.id)
    setTodoList(newTodoList)

  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo}/>
            { isLoading ? <p>Loading</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>}
          </>}
        />
        <Route path="/new" element={<h1>New Todo List</h1>}/>
      </Routes>
    </Router>

  );
}
export default App;