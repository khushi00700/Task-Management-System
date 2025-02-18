import React from "react";
import { updateTask } from "../api";

const TaskCard = ({ task, setTasks, onEdit, onDelete }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const markAsCompleted = async () => {
    try {
      const updatedTask = await updateTask(
        task._id,
        { status: "completed" },
        token
      );
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === task._id ? { ...t, status: "completed" } : t
        )
      );
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="font-bold">Priority: {task.priority}</p>

      {task.assignedTo && (
        <p className="text-sm font-semibold text-gray-700">
          Assigned to: {task.assignedTo.name} ({task.assignedTo.role})
        </p>
      )}

      <p
        className={`mt-2 font-semibold ${
          task.status === "completed" ? "text-green-600" : "text-yellow-500"
        }`}
      >
        Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
      </p>

      {task.status !== "completed" && (
        <button
          onClick={markAsCompleted}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
        >
          Mark as Completed
        </button>
      )}

      {role !== "viewer" && (
        <div className="mt-2">
          {(role === "admin" || role === "editor") && (
            <button
              onClick={() => onEdit(task)}
              className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
            >
              Edit
            </button>
          )}
          {role === "admin" && (
            <button
              onClick={() => onDelete(task._id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
