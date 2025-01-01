import logo from './logo.svg';
import './App.css';
import TodoList from './components/Todo-List/TodoList';
import { data } from "./Data";
import { useState } from "react";
import { TodoContext } from './components/contexts/context';

function App() {
  const [todo, setTodo] = useState(data);
  return (
    <div className="App" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", direction: "rtl" }}>
      <TodoContext.Provider value={{ todo, setTodo }}>
        <TodoList />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
