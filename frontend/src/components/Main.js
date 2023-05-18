import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Main.css";
import { Link } from "react-router-dom";
const App = () => {
  //   const [user, setUser] = useState("");
  //   const [password, setPassword] = useState("");
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchLists();
    fetchTasks();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await fetch("http://localhost:3000/list/get");
      const data = await response.json();

      console.log(data.list);
      setLists(data.list);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/task/get");
      const data = await response.json();
      console.log(data.tasks);
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskDrag = async (taskId, newListId) => {
    try {
      await axios.put(`/api/tasks/${taskId}`, { listId: newListId });
      // Handle successful task update
      console.log("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleTaskCompletion = async (taskId) => {
    try {
      await fetch(`http://localhost:3000/task/delete/${taskId}`, {
        method: "DELETE",
      });
      // Handle successful task deletion
      console.log("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <Link to="/add-task" title="add task">
          <h1>Add New Task </h1>
        </Link>
        <Link to="/add-list" title="add task">
          <h1>Add New List </h1>
        </Link>
      </div>

      <h1>Task Management App</h1>
      <div className="lists-container">
        {lists.map((list) => (
          <div className="list" key={list._id}>
            <h2>{list.listTitle}</h2>
            <ul>
              {tasks
                .filter((task) => task.listId === list._id)
                .map((task) => (
                  <li
                    key={task._id}
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", task._id)
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const taskId = e.dataTransfer.getData("text/plain");
                      handleTaskDrag(taskId, list._id);
                    }}
                  >
                    <h4>{task.taskDescription}</h4>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
