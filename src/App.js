import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Todolist from "./components/Todolist";




export default function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  function filterHandler ()  {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true))
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  function saveLocalTodos () {
      if (todos.length > 0) {
        localStorage.setItem("todos", JSON.stringify(todos));
      }   
  }

  function getLocalTodos () {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));  
      setTodos(todoLocal);
    }
  }
  
  return (
    <div className="App">
      <header>
        <h1>To do List</h1>
      </header>
      <Form 
        inputText={inputText} 
        setInputText={setInputText} 
        todos={todos} setTodos={setTodos} 
        setStatus={setStatus} 
        status={status} />
      <Todolist 
        setTodos={setTodos} 
        todos={todos}
        filteredTodos={filteredTodos}/>
    </div>
  );
}

