import React from 'react';
import {BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom"
import MainContainer from './components/MainContainer/MainContainer.js'
import {requestAddTodo, requestRemoveTodo, requestEditTodo, requestEditCheck} from "./components/todoAPI.js"
import styles from "./App.module.css"
import Navigation from './components/Navigation/Navigation.js';
import Login from "./components/Login/Login.js"
import Signup from "./components/Signup/Signup.js"
/*
Router- component used to encompass all of the diff components in
the application that will exist in the BrowseRouter system
Routes-determines where in router systmen where you want to have routes
*/

function App() {
  const [todoList, setTodoList] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [tableID, setTableID] = React.useState("tblKkypMUe5OhJExQ")
  const [user, setUser] = React.useState({})
  console.log(todoList)
  
  React.useEffect(() => {
      //Headers contain metadata about the request, such as content type, user agent
      //to return the same ordered list in airtable must include view parameter "Grid view". See Airtable API Encoder
      //specifies number of records and view parameters
      fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableID}?maxRecords=30&view=Grid+view`, {
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
  React.useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList))
    }
  }, [todoList, isLoading ])

  //handlers
  // const changeListID = (newTableID) => {
  //   setTableID(newTableID)
  // }
  console.log(tableID)

  const handleUser = (userData) => {
    setUser(userData)
  }

  const requestNewList = (newTableID) => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${newTableID}?maxRecords=30&view=Grid+view`, {
      headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      }})
      .then((response) => response.json())
      .then((data) => {
      console.log("GET response", data.records)
      setTodoList(data.records)
      setIsLoading(false)
      setTableID(newTableID)
      })
      .catch((error) => console.log("error", error))
  }

  const addTodo = (tableID, newTodo) => {
    requestAddTodo(tableID, newTodo)
    .then((data) => {
      setTodoList([...todoList, ...data.records])
      //add error handling
    })
  }
  const removeTodo = (tableID, id) => {
    requestRemoveTodo(tableID, id)
    .then((data) => {
      const removeId = data.id
      //locate item with given id and then remove from todoList state
      const newTodoList = todoList.filter((item) => item.id!==removeId)
      setTodoList(newTodoList)
    })
  }

  const editTodo = (tableID, id, previousTodo, updatedTodo ) => {
    //immediately update todoList locally instead of waiting for server
    setTodoList (
      todoList.map((todo) => {
        if (id === todo.id ) {
          return {
            ...todo, //copy todo object info via spread
            fields: { // replace the nested fields object
              ...updatedTodo.fields //with the same same one
            }
          }
        } else {
          return todo
        }
      })
    )
    //fetch request
    requestEditTodo(tableID, id, updatedTodo)
    .then(response => {
      //generate a new todoList to set the state with
      const newTodoList = todoList.map((todo) => {
        if (id === todo.id ) {
          return { 
            ...todo, //copy todo object info via spread
            fields: { // replace the nested fields object
              ...todo.fields, //with the same same one
              title: response.fields.title, // but change the title value inside of it
              complete: response.fields.complete
            }
          }
        } else {
          return todo
        }
      })
      setTodoList(newTodoList) 
    })
    .catch((error) => {
      console.log(error)
      //revert todoList back to previous todo if error
      setTodoList(
        todoList.map((todo) => {
          if (id === todo.id ) {
            return {
              ...todo, //copy todo object info via spread
              fields: { // replace the nested fields object
                ...previousTodo.fields //with the same same one
              }
            }
          } else {
            return todo
          }
        })
      )
    })
  }

  const editCheck = (tableID, id, checkItem) => {
    requestEditCheck(tableID, id, checkItem)
    .then(response => {
      //generate a new todoList to set the state with
      const newTodoList = todoList.map((todo) => {
        if (id === todo.id ) {
          return { 
            ...todo, //copy todo object info via spread
            fields: { // replace the nested fields object
              ...todo.fields, //with the same same one
              complete: response.fields.complete // but change the title value inside of it
            }
          }
        } else {
        return todo
        }
      })
    setTodoList(newTodoList) 
    })
    .catch((error) => {
      console.log(error)
    })
  }
 
  return(
      <Router>
        <Routes>
          <Route path="signup" element={<div className={styles.container}><Signup/></div>}/>
          <Route path="/" element={<div className={styles.container}><Login handleUser={handleUser}/></div>}/>
          <Route path="home" element={
            <div className={styles.mainContainer}>
              <Navigation requestNewList={requestNewList}/>
              <MainContainer tableID={tableID} isLoading={isLoading} todoList={todoList} onAddTodo={addTodo} onRemoveTodo={removeTodo} onEditTodo={editTodo} editCheck={editCheck}/> 
            </div>
          }
          />
        </Routes>
      </Router>
  
  );
}
export default App;

  // <Router>
  //     <Navigation/>
  //     <Routes>
  //       <Route path="/" element={
  //       <div className={styles.container}>
  //       <MainContainer isLoading={isLoading} todoList={todoList} onAddTodo={addTodo} onRemoveTodo={removeTodo} onEditTodo={editTodo} editCheck={editCheck}/> 
  //       </div> 
  //       }
  //       />
  //       <Route path="/workList" element={<MainContainer isLoading={isLoading} todoList={workList}/>}/>
  //     </Routes>
  //   </Router>
  // );
