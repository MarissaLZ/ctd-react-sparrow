import React from 'react'
import { RiDeleteBack2Line } from "react-icons/ri"
import styles from './TodoListItem.module.css'
//style object reps all properties available from ./TodoListItem.module.css
import EditInput from '../EditInput/EditInput'

//can access anything for this todo object instance!
export default function TodoListItem ({todo, onRemoveTodo, onEditTodo}) {

    const [isToggled, setToggle] = React.useState(false)
    //inital value is the todo already added
    const [todoTitle, setTodoTitle] = React.useState(todo.fields.title)
    
    const handleRemove = (e) => {
        onRemoveTodo(todo.id)
    }
    const handleToggle = (e) => {
        setToggle((prevState) => !prevState)
    }
    const handleTitleChange = (e) => {
        setTodoTitle(e.target.value)
    }
    const handleEditedTodo = (e) => {
        e.preventDefault()
        //pass id of todo item and a new object 
        setToggle((prevState) => !prevState)
        onEditTodo(todo.id, {fields: {title: todoTitle}})
        setTodoTitle("")
    }
    return (
        <li className={styles.listItem}>
            {isToggled ?
                <EditInput value={todoTitle} onEditTodo={onEditTodo} handleTitleChange={handleTitleChange} handleEditedTodo={handleEditedTodo}/>
                : <p className={styles.listItemText} onClick={handleToggle}>{todo.fields.title}</p>
            }
            <button type="button" onClick={handleRemove} className={styles.button}><RiDeleteBack2Line className={styles.icon} size="1.2rem"/></button> 
        </li>
    );
}