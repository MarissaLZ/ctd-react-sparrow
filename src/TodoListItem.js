import React from 'react'


export default function TodoListItem ({todo}) {
    console.log("TodoListItem component")
    return (
        <li>{todo.title}</li>
        );
}