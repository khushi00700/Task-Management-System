import React, { useState, useEffect } from "react";
import { getTasks, deleteTask } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskOverview from "../components/TaskOverview";
import SortTasks from "../components/SortTasks";
import CreateTask from "../components/CreateTask";
import EditTaskPopup from "../components/EditTaskPopup";
import TaskFilterTabs from "../components/TaskFilterTabs";
import TaskCard from "../components/TaskCard";
import SearchTasks from "../components/SearchTasks";
import MeetingSpot from "../components/MeetingSpot";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await getTasks(token);
        setTasks(response.data);
        setFilteredTasks(response.data); // ✅ Initialize filtered tasks
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchTasks();
  }, [navigate, token]);

  useEffect(() => {
    let filtered = tasks;
    if (selectedTab === "pending") {
      filtered = tasks.filter((task) => task.status !== "completed");
    } else if (selectedTab === "completed") {
      filtered = tasks.filter((task) => task.status === "completed");
    }
    setFilteredTasks(filtered);
  }, [tasks, selectedTab]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setIsEditing(false);
    setSelectedTask(null);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <MeetingSpot role={role} />
      <TaskOverview tasks={tasks} />
      {role === "admin" && <CreateTask tasks={tasks} setTasks={setTasks} />}
      <SortTasks tasks={tasks} setFilteredTasks={setFilteredTasks} />
      <TaskFilterTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {/* ✅ Added Search Component */}
      <SearchTasks tasks={tasks} setFilteredTasks={setFilteredTasks} />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            setTasks={setTasks}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {isEditing && selectedTask && (
        <EditTaskPopup
          task={selectedTask}
          setTasks={setTasks}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
