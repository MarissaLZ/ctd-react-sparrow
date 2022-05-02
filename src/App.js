import React from 'react';
import TodoList from './TodoList.js'
import AddTodoForm from './AddTodoForm.js'

//custom hook
const useSemiPersistentState = () => {
  //useState hook
  const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList"))|| [])
  //todoList is an array value

  //useEffect hook to store todoList
  React.useEffect( () => {
    localStorage.setItem("savedTodoList" ,JSON.stringify(todoList))
    }, [todoList])

  return [todoList, setTodoList]
}
function App() {
  const [todoList, setTodoList] = useSemiPersistentState()

  const addTodo = (newTodo) => {
    return(
      //updating the todoList array to contain the old todoList objects and the new list object
      setTodoList([...todoList, newTodo])
    )
  }

  const removeTodo = (id) => {
    //remove item w/ a given id
    //locate item with given id and then remove
    const newTodoList = todoList.filter( (item)=> id!==item.id)
    setTodoList(newTodoList)

  }
  return (
  <>
    <h1>Todo List</h1>
    <AddTodoForm onAddTodo={addTodo}/>
    <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
  </>
  );
}
export default App;