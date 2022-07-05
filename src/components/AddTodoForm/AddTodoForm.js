import React from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import styles from "./AddTodoForm.module.css"
import { BsPlusSquare } from 'react-icons/bs'
import PropTypes from "prop-types";

export function AddTodoForm({ tableID, onAddTodo}) {
    const [todoTitle, setTodoTitle] = React.useState("")

    //triggers every time something is typed into search bar
    const handleTitleChange = (event)=> {
         setTodoTitle(event.target.value)
    }
    //triggers when form submitted
    const handleAddTodo = (e) => {
        e.preventDefault()
        const userInput = todoTitle.trim()
        if (userInput==="") {
            console.log("user input spaces")
        }
        else {
            onAddTodo(tableID, { fields: {title: todoTitle, complete: "false"} }) //passes object literal
            setTodoTitle("") //updates state when form submitted
        }
    }  
    return (
        <div className={styles.container}>
            <form onSubmit={handleAddTodo} className={styles.form}>
                <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}></InputWithLabel>
                <button type="submit" className={styles.button}><BsPlusSquare className={styles.icon} size="1.2rem"/></button>
            </form>
        </div> 
    )

}

AddTodoForm.propTypes = {
        onAddTodo: PropTypes.func,
        tableId: PropTypes.string
}

