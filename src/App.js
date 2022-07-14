import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom"
import MainContainer from "./components/MainContainer/MainContainer.js"
import {
  requestAddTodo,
  requestRemoveTodo,
  requestEditTodo,
  requestEditCheck,
} from "./components/todoAPI.js"
import styles from "./App.module.css"
import Navigation from "./components/Navigation/Navigation.js"
import Login from "./components/Login/Login.js"
import Signup from "./components/Signup/Signup.js"
import { Header } from "./components/Header/Header.js"

function App() {
  const [todoList, setTodoList] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [tableName, setTableName] = React.useState("Today")
  const [user, setUser] = React.useState({})
  const [openNav, setOpenNav] = React.useState(true)

  console.log("user", user)
  console.log("todoList", todoList)

  React.useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}?maxRecords=30&view=Grid+view`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const sortedList = [...data.records].sort((a, b) =>
          a.fields.title > b.fields.title ? 1 : -1
        )
        setTodoList(sortedList)
        setIsLoading(false)
      })
      .catch((error) => console.log("error", error))
  }, [])

  //handlers
  // const changeListID = (newTableName) => {
  //   setTableName(newTableName)
  // }

  const handleUser = (userData) => {
    setUser(userData)
  }

  const requestNewList = (newTableName) => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${newTableName}?maxRecords=30&view=Grid+view`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const sortedList = [...data.records].sort((a, b) =>
          a.fields.title > b.fields.title ? 1 : -1
        )
        setTodoList(sortedList)
        setIsLoading(false)
        setTableName(newTableName)
      })
      .catch((error) => console.log("error", error))
  }

  const addTodo = (tableName, newTodo) => {
    requestAddTodo(tableName, newTodo).then((data) => {
      setTodoList([...todoList, ...data.records])
      //add error handling
    })
  }
  const removeTodo = (tableName, id) => {
    requestRemoveTodo(tableName, id).then((data) => {
      const removeId = data.id
      //locate item with given id and then remove from todoList state
      const newTodoList = todoList.filter((item) => item.id !== removeId)
      setTodoList(newTodoList)
    })
  }
  const editTodo = (tableName, id, previousTodo, updatedTodo) => {
    //immediately update todoList locally instead of waiting for server
    setTodoList(
      todoList.map((todo) => {
        if (id === todo.id) {
          return {
            ...todo, //copy todo object info via spread
            fields: {
              // replace the nested fields object
              ...updatedTodo.fields, //with the same same one
            },
          }
        } else {
          return todo
        }
      })
    )
    //fetch request
    requestEditTodo(tableName, id, updatedTodo)
      .then((response) => {})
      .catch((error) => {
        console.log(error)
        //revert todoList back to previous todo if error
        setTodoList(
          todoList.map((todo) => {
            if (id === todo.id) {
              return {
                ...todo, //copy todo object info via spread
                fields: {
                  // replace the nested fields object
                  ...previousTodo.fields, //with the same one
                },
              }
            } else {
              return todo
            }
          })
        )
      })
  }

  const editCheck = (tableName, id, checkItem) => {
    requestEditCheck(tableName, id, checkItem)
      .then((response) => {
        //generate a new todoList to set the state with
        const newTodoList = todoList.map((todo) => {
          if (id === todo.id) {
            return {
              ...todo, //copy todo object info via spread
              fields: {
                // replace the nested fields object
                ...todo.fields, //with the same same one
                complete: response.fields.complete, // but change the value inside of it
              },
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

  const handleSort = (direction) => {
    //sort
    if (direction) {
      const sortedList = [...todoList].sort((a, b) =>
        a.fields.title > b.fields.title ? -1 : 1
      )
      setTodoList(sortedList)
    } else {
      const sortedList = [...todoList].sort((a, b) =>
        a.fields.title > b.fields.title ? 1 : -1
      )
      setTodoList(sortedList)
    }
  }

  const toggleNavbar = () => setOpenNav((n) => !n)

  return (
    <Router>
      <Routes>
        <Route
          path="signup"
          element={
            <div className={styles.container}>
              <Signup />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className={styles.container}>
              <Login handleUser={handleUser} />
            </div>
          }
        />
        <Route
          path="home"
          element={
            <div
              className={
                openNav
                  ? `${styles.mainContainer} ${styles.inactiveBackground} `
                  : `${styles.mainContainer} ${styles.activeBackground} `
              }
            >
              <Header toggleNavbar={toggleNavbar} />
              <Navigation
                requestNewList={requestNewList}
                openNav={openNav}
                toggleNavbar={toggleNavbar}
              />
              <MainContainer
                tableName={tableName}
                isLoading={isLoading}
                todoList={todoList}
                onAddTodo={addTodo}
                onRemoveTodo={removeTodo}
                onEditTodo={editTodo}
                editCheck={editCheck}
                handleSort={handleSort}
                openNav={openNav}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  )
}
export default App

//there is a glitch/infinite loop if user clicks checkboxes very very fast.
//If delete is clicked very fast patch request fails AKA not found
//switching too fast between lists causes errors

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
