const express = require('express');
const router = express.Router();
const Notes = require('../modules/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ✅ Route: Get all notes of a user
router.post('/userAllNote', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("userAllNote Error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// ✅ Route: Add a new note
router.post('/addNotes', fetchuser, [
  body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id
    });

    const saveNote = await note.save();
    res.json(saveNote);
  } catch (error) {
    console.error("addNotes Error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// ✅ Route: Update a note
router.put('/updateNote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // 🛠️ Find the note by ID
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // 🔐 Check if user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    // ✅ Update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error("updateNote Error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");

    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Unauthorized");

    await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note deleted successfully", note });
  } catch (error) {
    console.error("deleteNote Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
