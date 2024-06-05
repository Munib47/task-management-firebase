import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import "./App.css";

const generateRandomId = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const idRef = useRef(1);

  // Load tasks and dark mode state from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }

    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (storedDarkMode) {
      setDarkMode(storedDarkMode);
      document.body.classList.add("dark");
    }
  }, []);

  // Save dark mode state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const addTask = useCallback((task) => {
    setTasks((prevTasks) => {
      const taskExists = prevTasks.some(
        (t) => t.description.toLowerCase() === task.description.toLowerCase()
      );
      if (taskExists) {
        alert("Task already added!");
        return prevTasks; // No need to update state if task already exists
      }
  
      const newTask = { id: generateRandomId(), ...task };
      const newTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  }, []);
  

  const editTask = useCallback((id, updatedTask) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    } else {
      return tasks;
    }
  }, [tasks, filter]);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <h1>Task Management App</h1>
      <label className="theme-toggle">
        <p>Light</p>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span className="slider round"></span>
        <p>Dark</p>
      </label>
      <TaskForm addTask={addTask} />
      <Filter setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
