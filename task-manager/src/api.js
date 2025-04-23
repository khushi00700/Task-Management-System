import axios from "axios";

const API_URL = "http://localhost:5000/api";

// **Auth API Calls**
export const signup = async (userData) => {
  return await axios.post(`${API_URL}/auth/signup`, userData); // ✅ Sends name, email, password
};

export const login = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
  return response
};

// **Task API Calls**
export const createTask = async (taskData, token) => {
  return await axios.post(`${API_URL}/tasks/`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTasks = async (token) => {
  return await axios.get(`${API_URL}/tasks/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = async (taskId, updatedTask, token) => {
  return await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = async (taskId, token) => {
  return await axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTaskStatus = async (taskId, token) => {
  return await axios.put(
    `${API_URL}/tasks/${taskId}`,
    { status: "completed" },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const fetchUsers = async (token) => {
  const response = await axios.get(`${API_URL}/auth/getUsers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; 
};

export const getAllMeetingNotes = async (token) =>
  axios.get(`${API_URL}/meeting-note`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createMeetingNote = async (content, token) =>
  axios.post(`${API_URL}/meeting-note`, { content }, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateMeetingNoteById = async (noteId, content, token) =>
  axios.put(`${API_URL}/meeting-note/${noteId}`, { content }, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteMeetingNoteById = async (noteId, token) =>
  axios.delete(`${API_URL}/meeting-note/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

