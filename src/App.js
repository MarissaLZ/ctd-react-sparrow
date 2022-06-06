import React from 'react';
import "./style.css"
import TodoList from './TodoList.js'
import AddTodoForm from './AddTodoForm.js'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
/*
Router- component used to encompass all of the diff components in
the application that will exist in the BrowseRouter system
Routes-determines where in router systmen where you want to have routes
*/
//diavle delete when editing mode? causes conflict

function App() {
  //todoList is an array value
  const [todoList, setTodoList] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  console.log("todoList",todoList)

  React.useEffect(() => {
     //Headers contain metadata about the request, such as content type, user agent
     //to return the same ordered list in airtable must include view parameter "Grid view". See Airtable API Encoder
     //specifies number of records and view parameters
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?maxRecords=30&view=Grid+view`,{
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
    }})
    .then((response) => response.json())
    .then((data) => {
      console.log("GET response", data.records)
      setTodoList(data.records)
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
      //send as array of ojects//create record { fields: {title: todoTitle} }
      body: JSON.stringify({
        records: [newTodo] 
      }),
    })
    .then(response => response.json())
    .then((data) => {
      console.log("setting data",data.records) 
      setTodoList([...todoList, ...data.records])
      //add error handling
    })
  }
  const removeTodo = (id) => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(response => response.json())
    .then((data) => {
      const removeId = data.id
      //locate item with given id and then remove from todoList state
      const newTodoList = todoList.filter((item) => item.id!==removeId)
      setTodoList(newTodoList)
    })
  }

  const editTodo = (id, updatedTodo) => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(updatedTodo)
    })
    .then(response => response.json())
    .then(response => {
      console.log("editTodo response",response);
      console.log(todoList);
      //generate a new todoList to set the state with
      const newTodoList = todoList.map((todo) => {
        if (id === todo.id ) {
          return { 
            ...todo, //copy todo object info via spread
            fields: { // replace the nested fields object
              ...todo.fields, //with the same same one
              title: response.fields.title // but change the title value inside of it
            }
          }
        } else {
          return todo
        }
      })
      setTodoList(newTodoList) 
    })
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo}/>
            { isLoading ?
             <p>Loading</p> :
              <TodoList todoList={todoList} onRemoveTodo={removeTodo} onEditTodo={editTodo} />}
          </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>}/>
      </Routes>
    </Router>
  );
}
export default App;


  // const removeTodo = (id) => {
  //    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?` + new URLSearchParams({"records[]": id}) , {
  //     method: "Delete",
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  //     },
  //   })
  //   .then(response => response.json())
  //   .then((data) => {
  //     const removeId = data.id
  //     console.log("removalID", id)
    
  //   //locate item with given id and then remove from todoList state
  //     const newTodoList = todoList.filter((item) => item.id!==removeId)
  //     console.log(newTodoList)
  //     setTodoList(newTodoList)
  //   })
  // }
  //https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request