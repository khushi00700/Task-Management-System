import express from 'express';
import {
  getAllMeetingNotes,
  createMeetingNote,
  updateMeetingNoteById,
  deleteMeetingNoteById,
} from '../controllers/meetingNoteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ensure these routes match the frontend calls
router.get('/', protect, getAllMeetingNotes); // Get all meeting notes
router.post('/', protect, createMeetingNote); // Create a new meeting note
router.put('/:noteId', protect, updateMeetingNoteById); // Update a meeting note by ID
router.delete('/:noteId', protect, deleteMeetingNoteById); // Delete a meeting note by ID

export default router;
