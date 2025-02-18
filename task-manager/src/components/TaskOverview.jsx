import React from "react";

const TaskOverview = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const pendingTasks = tasks.filter(task => task.status !== "completed").length;

  return (
    <div className="bg-gray-200 p-4 rounded shadow-md flex justify-between">
      <p>Total Tasks: <strong>{totalTasks}</strong></p>
      <p>Completed: <strong>{completedTasks}</strong></p>
      <p>Pending: <strong>{pendingTasks}</strong></p>
    </div>
  );
};

export default TaskOverview;
