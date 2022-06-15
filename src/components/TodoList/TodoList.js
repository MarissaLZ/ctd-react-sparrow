import React from 'react';
import TodoListItem from "../TodoListItem/TodoListItem.js"
import styles from "./TodoList.module.css"

export default function TodoList({searchTerm, todoList, onRemoveTodo, onEditTodo}) {
  
  //filter todoList
  const filterList = todoList.filter((item) => {
    return (item.fields.title.toLowerCase().includes(searchTerm.toLowerCase())) })    

    return(
        <ul className={styles.list}>
          {filterList.map((todo)=> {
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
    
      //   searchTerm==="" ? todoList :
      // todoList.filter((item) => {
      //   return (item.fields.title.toLowerCase().includes(searchTerm.toLowerCase()))
      // 