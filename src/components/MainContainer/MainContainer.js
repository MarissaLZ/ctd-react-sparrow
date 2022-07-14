import React from "react"
import { TodoList } from "../TodoList/TodoList.js"
import { AddTodoForm } from "../AddTodoForm/AddTodoForm.js"
import styles from "./MainContainer.module.css"
import Search from "../Search/Search.js"
import { TbArrowsSort } from "react-icons/tb"
import PropTypes from "prop-types"

export default function MainContainer({
  tableName,
  isLoading,
  todoList,
  onAddTodo,
  onRemoveTodo,
  onEditTodo,
  editCheck,
  handleSort,
  openNav,
}) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isSorted, setIsSorted] = React.useState(false)

  // useEffect- use for data or a delay or animations.
  //If it is some type of user interaction then it would be better to handle this within an event handler function
  // useEffect(() => {
  //   handleSort(isSorted)
  // }, [isSorted])

  const handleClick = () => {
    setIsSorted((s) => !s)
    handleSort(!isSorted)
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const completeList = todoList.filter((item) => {
    return (
      item.fields.complete === "true" &&
      item.fields.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const incompleteList = todoList.filter((item) => {
    return (
      item.fields.complete === "false" &&
      item.fields.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div
      className={
        openNav
          ? `${styles.MainContainer} ${styles.MainContainerShortened}`
          : `${styles.MainContainer} ${styles.MainContainerExpanded}`
      }
    >
      <div className={styles.subcontainer}>
        <h1 className={styles.header}>{tableName}</h1>
        <Search handleSearch={handleSearch}></Search>
        <AddTodoForm tableName={tableName} onAddTodo={onAddTodo} />
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <>
            <button className={styles.button} onClick={handleClick}>
              <TbArrowsSort className={styles.icon} size="1.0rem" />
            </button>
            <TodoList
              tableName={tableName}
              searchTerm={searchTerm}
              todoList={incompleteList}
              onRemoveTodo={onRemoveTodo}
              onEditTodo={onEditTodo}
              editCheck={editCheck}
              handleSort={handleSort}
              title=""
            />
            {completeList.length > 0 && (
              <TodoList
                tableName={tableName}
                searchTerm={searchTerm}
                todoList={completeList}
                onRemoveTodo={onRemoveTodo}
                onEditTodo={onEditTodo}
                editCheck={editCheck}
                handleSort={handleSort}
                title="Completed"
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
MainContainer.propTypes = {
  tableName: PropTypes.string,
  isLoading: PropTypes.bool,
  todoList: PropTypes.array,
  onAddTodo: PropTypes.func,
  onRemoveTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
  editCheck: PropTypes.func,
  handleSort: PropTypes.func,
  openNav: PropTypes.bool,
}
