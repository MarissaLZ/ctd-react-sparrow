import React from 'react';
import TodoList from './TodoList.js'
import AddTodoForm from './AddTodoForm.js'
import { useState } from 'react/cjs/react.production.min';

function App() {
  //useState hook
  const [todoList, setTodoList] = React.useState([])
  //todoList is an array value

  const addTodo = (newTodo) => {
    return(
      //updating the todoList array to contain the old todoList objects and the new list object
      setTodoList([...todoList, newTodo])
    )
  }
  return (
  <div>
    <h1>Todo List</h1>
    <AddTodoForm onAddTodo={addTodo}/>
    <TodoList todoList={todoList}/>
  </div>
  );
}
export default App;