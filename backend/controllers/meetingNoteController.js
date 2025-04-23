import MeetingNote from "../models/MeetingNote.js";

// Ensure there's always one doc holding all notes
const ensureMeetingNoteDoc = async () => {
  let doc = await MeetingNote.findOne();
  if (!doc) {
    doc = await MeetingNote.create({ notes: [] });
  }
  return doc;
};

// GET all notes
export const getAllMeetingNotes = async (req, res) => {
  const doc = await ensureMeetingNoteDoc();
  res.json(doc.notes.reverse()); // latest first
};

// POST new note
export const createMeetingNote = async (req, res) => {
  const { content } = req.body;
  const user = req.user;

  const doc = await ensureMeetingNoteDoc();
  const newNote = {
    content,
    updatedBy: { name: user.name, userId: user._id },
  };

  doc.notes.push(newNote);
  await doc.save();

  res.status(201).json(doc.notes[doc.notes.length - 1]);
};

// PUT update a specific note
export const updateMeetingNoteById = async (req, res) => {
  const { noteId } = req.params;
  const { content } = req.body;
  const user = req.user;

  const doc = await ensureMeetingNoteDoc();
  const note = doc.notes.id(noteId);

  if (!note) return res.status(404).json({ message: "Note not found" });

  note.content = content;
  note.updatedBy = { name: user.name, userId: user._id };
  await doc.save();

  res.json(note);
};

// DELETE a specific note
export const deleteMeetingNoteById = async (req, res) => {
  const { noteId } = req.params;

  const doc = await ensureMeetingNoteDoc();
  const note = doc.notes.id(noteId);

  if (!note) return res.status(404).json({ message: "Note not found" });

  doc.notes.pull(noteId);
  await doc.save();

  res.json({ message: "Note deleted" });
};
