import React from 'react'
import { RiDeleteBack2Line } from "react-icons/ri"
import styles from './TodoListItem.module.css'
//style object reps all properties available from ./TodoListItem.module.css
import EditInput from '../EditInput/EditInput'

//can access anything for this todo object instance!
export default function TodoListItem ({todo, onRemoveTodo, onEditTodo, editCheck}) {

    const [isToggled, setToggle] = React.useState(false)
    //inital value is the todo already added
    const [todoTitle, setTodoTitle] = React.useState(todo.fields.title)
    const [isChecked, setIsChecked] = React.useState(todo.fields.complete==="true")
    //booleean here and string in db

    const handleTitleChange = (e) => {
        setTodoTitle(e.target.value)
    }

    const handleEditedTodo = (e) => {
        e.preventDefault()
        const userInput = todoTitle.trim()
        if ( userInput ==="") {
            setToggle((t) => !t)
            setTodoTitle(todo.fields.title)
        } 
        else {
            const previousTodo =  { 
                fields: {
                    title: todo.fields.title,
                    complete: todo.fields.complete 
                    }
                }

            setToggle((prevState) => !prevState)
            
            onEditTodo(todo.id, previousTodo, 
                { fields:
                    {
                        title: todoTitle,
                        complete: isChecked.toString()
                    }
                })
        }
    }

    const handleRemove = (e) => {
        onRemoveTodo(todo.id)
    }
    const handleToggle = (e) => {
        setToggle((prevState) => !prevState)
    }
    const handleCheck = () => {
        setIsChecked((c) => !c )
        editCheck(todo.id, 
            { fields:
             {
                title: todoTitle,
                 complete: isChecked.toString()
                }
            })
    }
  
    return (
        <li className={styles.listItem}> 
        <input id ="complete" type="checkbox" checked={isChecked} name="complete" onChange={handleCheck} className={styles.checkbox}/>
        <label htmlFor="complete"></label>
            {isToggled ?
                <EditInput value={todoTitle} onEditTodo={onEditTodo} handleTitleChange={handleTitleChange} handleEditedTodo={handleEditedTodo}/>
                : <p className={isChecked ? `${styles.listItemText} ${styles.checked}`: styles.listItemText} onClick={handleToggle}>{todo.fields.title}</p>
            }
            <button type="button" onClick={handleRemove} className={styles.button}><RiDeleteBack2Line className={styles.icon} size="1.2rem"/></button> 
        </li>
    );
}