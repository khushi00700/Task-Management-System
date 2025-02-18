import React from "react";

const TaskFilterTabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => setSelectedTab("all")}
        className={`px-4 py-2 rounded ${
          selectedTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        All Tasks
      </button>
      <button
        onClick={() => setSelectedTab("pending")}
        className={`px-4 py-2 rounded ${
          selectedTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Pending/In Progress
      </button>
      <button
        onClick={() => setSelectedTab("completed")}
        className={`px-4 py-2 rounded ${
          selectedTab === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilterTabs;
