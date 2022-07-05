import React from "react"
import TodoListItem from "../TodoListItem/TodoListItem.js"
import styles from "./TodoList.module.css"
import PropTypes from "prop-types"

export function TodoList({
  tableID,
  searchTerm,
  todoList,
  onRemoveTodo,
  onEditTodo,
  editCheck,
}) {
  //filter todoList
  const filterList = todoList.filter((item) => {
    return item.fields.title.toLowerCase().includes(searchTerm.toLowerCase())
  })
  console.log("filteredList", filterList)

  return (
    <ul className={styles.list}>
      {filterList.map((todo) => {
        return (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onEditTodo={onEditTodo}
            editCheck={editCheck}
            tableID={tableID}
          />
        )
      })}
    </ul>
  )
}

TodoList.propTypes = {
  tableID: PropTypes.string,
  searchTerm: PropTypes.string,
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
  editCheck: PropTypes.func,
}

//   searchTerm==="" ? todoList :
// todoList.filter((item) => {
//   return (item.fields.title.toLowerCase().includes(searchTerm.toLowerCase()))
//
