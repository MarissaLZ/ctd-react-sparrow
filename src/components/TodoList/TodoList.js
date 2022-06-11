import React from 'react';
import TodoListItem from "../TodoListItem/TodoListItem.js"
import styles from "./TodoList.module.css"

export default function TodoList({todoList, onRemoveTodo, onEditTodo}) {
    return(
        <ul className={styles.list}>
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
