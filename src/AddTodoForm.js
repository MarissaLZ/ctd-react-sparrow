import React from "react";

export default function AddTodoForm({onAddTodo}) {
    //state hook
    const [todoTitle, setTodoTitle] = React.useState("")

    //triggers every time something is typed into search bar
    const handleTitleChange = (event)=> {
        const newTodoTitle = event.target.value
        console.log(newTodoTitle)
        setTodoTitle(newTodoTitle) //updates state every time something typed
    }
    //triggers when form submitted
    //lifting state/event handler passes state info to share with state in app component
    const handleAddTodo = (event) => {
        event.preventDefault()
        onAddTodo({ title: todoTitle, id: Date.now() })
        setTodoTitle("") //updates state when form submitted
    }  
 
    return (
        <form onSubmit={handleAddTodo} > 
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" type="text" name="title" value={todoTitle} onChange={handleTitleChange}/>
            <button type="submit">Add</button>
        </form> 
    )
}

