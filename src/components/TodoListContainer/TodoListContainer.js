import React from 'react';
import {requestAddTodo, requestRemoveTodo, requestEditTodo} from "./todoAPI.js"
import TodoList from '../TodoList/TodoList.js'
import AddTodoForm from '../AddTodoForm/AddTodoForm.js'
import styles from "./TodoListContainer.module.css"
import Search from "../Search/Search.js"

export default function TodoListContainer({handleToggle}) {
    const [todoList, setTodoList] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [searchTerm, setSearchTerm ] = React.useState("")
    console.log("search", searchTerm)
    console.log("todoList", todoList)

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
        requestAddTodo(newTodo)
        .then((data) => {
        setTodoList([...todoList, ...data.records])
        //add error handling
        })
    }
    const removeTodo = (id) => {
        requestRemoveTodo(id)
        .then((data) => {
        const removeId = data.id
        //locate item with given id and then remove from todoList state
        const newTodoList = todoList.filter((item) => item.id!==removeId)
        setTodoList(newTodoList)
        })
    }
    const editTodo = (id, updatedTodo) => {
        requestEditTodo(id, updatedTodo)
        .then(response => {
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
    const handleSearch = (value) => {
        setSearchTerm(value)
    }

    return (
    <div className={styles.todoListContainer}>
        <button className={styles.button} onClick={handleToggle}>toggle</button> 
        <Search handleSearch={handleSearch}></Search>
        <div className={styles.subcontainer}>
            <h1 className={styles.header}>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo}/>
            {isLoading ? <p>Loading</p> :
            <TodoList searchTerm={searchTerm} todoList={todoList} onRemoveTodo={removeTodo} onEditTodo={editTodo}/>}
        </div>
    </div>
        
    );
}
