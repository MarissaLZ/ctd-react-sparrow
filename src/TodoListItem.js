import React from 'react'
import "./style.css"
import EditInput from './EditInput'
//can access anything for this todo object instance!
export default function TodoListItem ({todo, onRemoveTodo, onEditTodo}) {

    const [isToggled, setToggle] = React.useState(false)
    //inital value is the todo already added
    const [todoTitle, setTodoTitle] = React.useState(todo.fields.title)
    
    const handleRemove = () => {
        onRemoveTodo(todo.id)
    }

    const handleToggle = () => {
        setToggle(!isToggled)
    }
    const handleTitleChange = (e) => {
        setTodoTitle(e.target.value)
    }

    const handleEditedTodo = (e) => {
        e.preventDefault()
        //pass id of todo item and a new object 
        onEditTodo(todo.id, {fields: {title: todoTitle}})
        setToggle(!isToggled)
    }
    return (
        <li>
            {isToggled ?
                <EditInput value={todoTitle} onEditTodo={onEditTodo} handleTitleChange={handleTitleChange} handleEditedTodo={handleEditedTodo}/> :
                <p onDoubleClick={handleToggle}>{todo.fields.title}</p>
            }
            <button type="button" onClick={handleRemove}>Remove</button>
        </li>
    );
}