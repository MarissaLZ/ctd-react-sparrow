import React from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import styles from "./AddTodoForm.module.css"
import { BsPlusSquare } from 'react-icons/bs'
export default function AddTodoForm({onAddTodo}) {
    const [todoTitle, setTodoTitle] = React.useState("")

    //triggers every time something is typed into search bar
    const handleTitleChange = (event)=> {
         setTodoTitle(event.target.value)
    }
    //triggers when form submitted
    const handleAddTodo = (event) => {
        event.preventDefault()
        const userInput = todoTitle.trim()
        if (userInput==="") {
            console.log("user input spaces")
            //put message in input?
             //do nothing tell user this is invalid
        }
        else {
            onAddTodo({ fields: {title: todoTitle, complete: "false"} }) //passes object literal
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

