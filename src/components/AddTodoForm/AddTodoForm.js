import React from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import styles from "./AddTodoForm.module.css"
import { BsPlusSquare } from 'react-icons/bs'
export default function AddTodoForm({onAddTodo}) {
    //state hook
    const [todoTitle, setTodoTitle] = React.useState("")

    //triggers every time something is typed into search bar
    const handleTitleChange = (event)=> {
        const newTodoTitle = event.target.value
        setTodoTitle(newTodoTitle) //updates state every time something typed
    }
    //triggers when form submitted
    const handleAddTodo = (event) => {
        event.preventDefault()
        onAddTodo({ fields: {title: todoTitle} }) //passes object literal
        setTodoTitle("") //updates state when form submitted
    }  
    return (
        <div className={styles.container}>
            <form onSubmit={handleAddTodo} className={styles.form}>
                <InputWithLabel todoTitle= {todoTitle} handleTitleChange={handleTitleChange}></InputWithLabel>
                <button type="submit" className={styles.button}><BsPlusSquare className={styles.icon} size="1.2rem"/></button>
            </form>
        </div> 
    )
}

