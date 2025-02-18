import { useState, useEffect } from "react";
import { createTask, fetchUsers } from "../api";

const CreateTask = ({ tasks, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]); 

  // Gets JWT token from local storage
  const token = localStorage.getItem("token");

  // Fetch users from backend
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await fetchUsers(token);
        setUsers(Array.isArray(userList) ? userList : []); 
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); 
      }
    };

    loadUsers();
  }, [token]);

  // Hanldes on click CreateTask btn
  const handleCreateTask = async () => {
    if (!title.trim() || !description.trim() || !deadline || !assignedTo) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await createTask(
        { title, description, deadline, priority, assignedTo },
        token
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);

      setTitle("");
      setDescription("");
      setDeadline("");
      setPriority("Medium");
      setAssignedTo("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Create Task</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">Assign to...</option>
        {Array.isArray(users) &&
          users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
      </select>

      <button
        onClick={handleCreateTask}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Create Task
      </button>
    </div>
  );
};

export default CreateTask;
