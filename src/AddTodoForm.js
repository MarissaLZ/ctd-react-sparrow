import React from "react";
import { useEffect } from "react/cjs/react.production.min";
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
    //event handler passes state info to share with state in app component
    const handleAddTodo = (event) => {
        event.preventDefault()
        onAddTodo({id: Date.now(), title: todoTitle}) //passes object literal
        setTodoTitle("") //updates state when form submitted
    }  
    return (
        <form onSubmit={handleAddTodo} >
            <InputWithLabel todoTitle= {todoTitle} handleTitleChange={handleTitleChange}>Title Test</InputWithLabel>
            <button type="submit">Add</button>
        </form> 
    )
}

