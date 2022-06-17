import React from 'react';
import TodoListContainer from './components/TodoListContainer/TodoListContainer.js'
import SideBar from './components/SideBar/SideBar.js'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styles from "./App.module.css"
/*
Router- component used to encompass all of the diff components in
the application that will exist in the BrowseRouter system
Routes-determines where in router systmen where you want to have routes
*/

function App() {
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className={styles.container}>
            <TodoListContainer/> 
          </div>
        }
        />
        <Route path="/new" element={<h1>New Todo List</h1>}/>
      </Routes>
    </Router>
  );
}
export default App;
