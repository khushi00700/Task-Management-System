import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },

    description: String,

    assignedTo: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      default: null
    },

    deadline: Date,

    priority: { 
      type: String, 
      enum: ["High", "Medium", "Low"], 
      default: "Medium" 
    },

    status: { 
      type: String, 
      enum: ["pending", "in progress", "completed"], 
      default: "pending" 
    },
    
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
