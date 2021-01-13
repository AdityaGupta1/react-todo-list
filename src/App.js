import React from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, uncompleteTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        {
          todo.isCompleted ? <button onClick={() => uncompleteTodo(index)}>Uncomplete</button> :
            <button onClick={() => completeTodo(index)}>Complete</button>
        }
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      return;
    }
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function Counts({ incomplete, complete }) {
  return (
    <div>
      Incomplete: {incomplete} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Completed: {complete}
    </div>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  const [counts, setCounts] = React.useState([3, 0]);

  function updateCounts(incomplete, complete) {
    const newCounts = [...counts];
    newCounts[0] += incomplete;
    newCounts[1] += complete;
    setCounts(newCounts);
  }

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    updateCounts(1, 0);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
    updateCounts(-1, 1);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    if (todos[index].isCompleted) {
      updateCounts(0, -1);
    } else {
      updateCounts(-1, 0);
    }
  };

  const uncompleteTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
    updateCounts(1, -1);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            uncompleteTodo={uncompleteTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
      <Counts incomplete={counts[0]} complete={counts[1]} />
    </div>
  );
}

export default App;