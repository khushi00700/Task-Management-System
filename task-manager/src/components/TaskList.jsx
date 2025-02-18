import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, setTasks, role }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} setTasks={setTasks} role={role} />
      ))}
    </div>
  );
};

export default TaskList;
