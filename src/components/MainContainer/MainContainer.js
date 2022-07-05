import React from 'react';
import {TodoList} from '../TodoList/TodoList.js'
import {AddTodoForm} from '../AddTodoForm/AddTodoForm.js'
import styles from "./MainContainer.module.css"
import Search from "../Search/Search.js"

export default function MainContainer({ tableID, isLoading, todoList, onAddTodo, onRemoveTodo, onEditTodo, editCheck}) {

    const [searchTerm, setSearchTerm ] = React.useState("")
    const handleSearch = (value) => {
        setSearchTerm(value)
    }

    return (
    <div className={styles.MainContainer}>
        <div className={styles.subcontainer}>
            <h1 className={styles.header}>Tasks</h1>
            <Search handleSearch={handleSearch}></Search>
            <AddTodoForm tableID={tableID} onAddTodo={onAddTodo}/>
            {isLoading ? <p>Loading</p> : 
            <TodoList tableID={tableID} searchTerm={searchTerm} todoList={todoList} onRemoveTodo={onRemoveTodo} onEditTodo={onEditTodo} editCheck={editCheck}/>}
        </div>
    </div>
        
    );
}
