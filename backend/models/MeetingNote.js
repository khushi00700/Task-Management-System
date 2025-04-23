import mongoose from "mongoose";

const singleNoteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    updatedBy: {
      name: { type: String },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  },
  { timestamps: true }
);

const meetingNoteSchema = new mongoose.Schema({
  notes: [singleNoteSchema], 
});

const MeetingNote = mongoose.model("MeetingNote", meetingNoteSchema);
export default MeetingNote;
