import Task from "../models/Task.js";
import User from "../models/User.js";

// Create a task
export const createTask = async (req, res) => {
  try {
    // Destructure the request body
    const { title, description, assignedTo, deadline, priority } = req.body;

    // Check if assigned user exsists
    let assignedUser = null;
    if (assignedTo) {
      assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(400).json({ error: "Assigned user does not exist" });
      }
    }

    // Create and save new task
    const task = new Task({ 
      title, 
      description, 
      deadline, 
      priority,
      assignedTo: assignedUser ? assignedUser._id : null 
    });
    await task.save();

    res.status(201).json(task);
  } 
  catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Tasks
export const getTasks = async (req, res) => {
  try {
    // Retrieve all tasks from db and fetch name role mail of assigned user
    const tasks = await Task.find().populate("assignedTo", "name role email");
    res.json(tasks);
  } 
  catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update any task
export const updateTask = async (req, res) => {
  try {
    // Check if assigned user exsists
    const { assignedTo } = req.body;
    if (assignedTo) {
      const userExists = await User.findById(assignedTo);
      if (!userExists) {
        return res.status(400).json({ error: "Assigned user does not exist" });
      }
    }
    //Find and update task by ID and retuns new task
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } 
  catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete exsisting task
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } 
  catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


