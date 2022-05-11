import React from 'react'

export default function TodoListItem ({todo, onRemoveTodo}) {
    
    return (
        <li>{todo.fields.Title} <button type="button" onClick={ () => {onRemoveTodo(todo.id)}}>Remove</button></li>
    );
}