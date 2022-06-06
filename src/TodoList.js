import React from 'react';
import TodoListItem from "./TodoListItem"

export default function TodoList({todoList, onRemoveTodo, onEditTodo}) {
    return(
        <ul>
          {todoList.map((todo)=> {
            return( 
            <TodoListItem 
              key={todo.id}
              todo={todo}
              onRemoveTodo={onRemoveTodo}
              onEditTodo={onEditTodo}
            />);
          })}
        </ul>
    );
}
