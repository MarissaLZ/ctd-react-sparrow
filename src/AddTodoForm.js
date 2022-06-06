import React from "react";
import InputWithLabel from "./InputWithLabel";

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
        <form onSubmit={handleAddTodo} >
            <InputWithLabel todoTitle= {todoTitle} handleTitleChange={handleTitleChange}>Todo Title</InputWithLabel>
            <button type="submit">Add</button>
        </form> 
    )
}

