import React, { useEffect, useState } from "react";
import {
  getAllMeetingNotes,
  createMeetingNote,
  updateMeetingNoteById,
  deleteMeetingNoteById,
} from "../api";

const MeetingSpot = ({ role }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteContent, setEditNoteContent] = useState("");
  const token = localStorage.getItem("token");

  const isEditorOrAdmin = role === "admin" || role === "editor";

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getAllMeetingNotes(token);
        setNotes(res.data);
      } catch (error) {
        console.error("Error loading meeting notes", error);
      }
    };

    fetchNotes();
  }, [token]);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      const res = await createMeetingNote(newNote, token);
      setNotes([res.data, ...notes]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMeetingNoteById(id, token);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  const handleEdit = (note) => {
    setEditNoteId(note._id);
    setEditNoteContent(note.content);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await updateMeetingNoteById(
        editNoteId,
        editNoteContent,
        token
      );
      setNotes(
        notes.map((note) => (note._id === editNoteId ? res.data : note))
      );
      setEditNoteId(null);
      setEditNoteContent("");
    } catch (error) {
      console.error("Error updating note", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-5xl mx-auto mt-10">
      {/* Left - Add New Note */}
      {isEditorOrAdmin && (
        <div className="bg-white shadow-lg rounded p-4">
          <h2 className="text-lg font-semibold mb-2">
            ✍️ Add New Meeting Note
          </h2>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full border rounded p-2 h-32"
            placeholder="Write your note here..."
          />
          <button
            onClick={handleAddNote}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Note
          </button>
        </div>
      )}

      {/* Right - Notes List */}
      <div className="bg-gray-50 shadow-inner rounded p-4 overflow-auto max-h-[400px]">
        <h2 className="text-lg font-semibold mb-2">📄 Meeting Notes</h2>

        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="mb-4 border-b pb-2">
              {editNoteId === note._id ? (
                <>
                  <textarea
                    value={editNoteContent}
                    onChange={(e) => setEditNoteContent(e.target.value)}
                    className="w-full border rounded p-2 h-24"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditNoteId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="whitespace-pre-wrap">{note.content}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    By <strong>{note.updatedBy?.name || "Unknown"}</strong> on{" "}
                    {new Date(note.updatedAt).toLocaleString()}
                  </p>
                  {isEditorOrAdmin && (
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => handleEdit(note)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MeetingSpot;
