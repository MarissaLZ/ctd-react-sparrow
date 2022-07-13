import React from "react"
import TodoListItem from "../TodoListItem/TodoListItem.js"
import styles from "./TodoList.module.css"
import PropTypes from "prop-types"

export function TodoList({
  tableName,
  todoList,
  onRemoveTodo,
  onEditTodo,
  editCheck,
  title,
}) {
  return (
    <>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.list}>
        {todoList.map((todo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onRemoveTodo={onRemoveTodo}
              onEditTodo={onEditTodo}
              editCheck={editCheck}
              tableName={tableName}
            />
          )
        })}
      </ul>
    </>
  )
}

TodoList.propTypes = {
  tableName: PropTypes.string,
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
  editCheck: PropTypes.func,
}

//   searchTerm==="" ? todoList :
// todoList.filter((item) => {
//   return (item.fields.title.toLowerCase().includes(searchTerm.toLowerCase()))
//
