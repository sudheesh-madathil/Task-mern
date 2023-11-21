import { useState, useEffect } from "react";
import axios from "axios";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = () => {
    if (newTask) {
      axios
        .post("http://localhost:3000/users", { task: newTask })
        .then((response) => setTasks([...tasks, response.data]))
        .catch((error) => console.error("Error adding task:", error));
      setNewTask("");
    }
  };

  const updateTask = (_id) => {
    axios
      .put(`http://localhost:3000/users/${_id}`, { task: editedTask })
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task._id === _id ? response.data : task
        );
        setTasks(updatedTasks);
        setEditingTaskId(null); // Reset the editing state after updating
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task._id !== id);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <div className="container">
        <input
        
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="list">
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {editingTaskId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button onClick={() => updateTask(task._id)}>Save</button>
                </>
              ) : (
                <>
                  {task.task}
                  <button className="dlt" onClick={() => deleteTask(task._id)}>
                    Delete
                  </button>
                  <button
                    className="edit"
                    onClick={() => {
                      setEditingTaskId(task._id);
                      setEditedTask(task.task);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { Todo };
