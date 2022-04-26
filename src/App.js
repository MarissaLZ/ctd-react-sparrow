import React from 'react';
import TodoList from './TodoList.js'
import AddTodoForm from './AddTodoForm.js'

//custom hook
const useSemiPersistentState = () => {
  console.log("useSemiPersistentState runs")
  //useState hook
  const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList"))|| [])
  //todoList is an array value

  //useEffect hook to store todoList
  React.useEffect( () => {
    localStorage.setItem("savedTodoList" ,JSON.stringify(todoList))
    console.log("effect runs")
    }, [todoList])

  return [todoList, setTodoList]
}
function App() {
  const [todoList, setTodoList] = useSemiPersistentState()

  const addTodo = (newTodo) => {
    console.log("addTodo callback")
    return(
      //updating the todoList array to contain the old todoList objects and the new list object
      setTodoList([...todoList, newTodo])
    )
  }
  return (
  <>
    <h1>Todo List</h1>
    <AddTodoForm onAddTodo={addTodo}/>
    <TodoList todoList={todoList}/>
  </>
  );
}
export default App;