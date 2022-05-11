import React from 'react';
import ReactDOM from 'react-dom';
import TodoListItem from "./TodoListItem"

export default function TodoList({todoList, onRemoveTodo}) {
    return(
        <ul>
          {todoList.map((todo)=> {
            console.log(todo)
            return( <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo}/>);
          })}
        </ul>
    );
}
