import React from 'react';
import ReactDOM from 'react-dom';
import TodoListItem from "./TodoListItem"

export default function TodoList({todoList}) {
  console.log("TodoList component")
    return(
        <ul>
          {todoList.map((todo)=> {
            return( <TodoListItem key={todo.id} todo={todo}/>);
          })}
        </ul>
    );
}
