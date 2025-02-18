import React, { useState } from "react";

const SortTasks = ({ tasks, setFilteredTasks }) => {
  const [priority, setPriority] = useState("all");

  const handleSortChange = (e) => {
    const selectedPriority = e.target.value;
    setPriority(selectedPriority);

    if (selectedPriority === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.priority === selectedPriority));
    }
  };

  return (
    <div className="my-4">
      <label className="mr-2">Sort by Priority:</label>
      <select value={priority} onChange={handleSortChange} className="p-2 border rounded">
        <option value="all">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
};

export default SortTasks;
