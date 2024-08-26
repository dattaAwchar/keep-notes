const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the Notes using : GET "/api/notes/fetchallnotes" - Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route 2: Add a new Note using : POST "/api/notes/addnote" - Login required
router.post('/addnote', fetchuser, [
    body('title', 'Title must be at least 3 characters long').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // If there are validation errors, return a Bad Request response
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create and save the new note
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await note.save();
        res.status(201).json(savedNote); // 201 Created status
    } catch (error) {
        console.error("Error adding note:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route 3: Update an existing Note : PUT "/api/notes/updatenote/:id" - Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create a newNote object
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ error: "Note not found" });

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized to update this note" });
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error("Error updating note:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route 4: Delete an existing Note : DELETE "/api/notes/deletenote/:id" - Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ error: "Note not found" });

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized to delete this note" });
        }

        await Notes.findByIdAndDelete(req.params.id);
        res.json({ message: "Note has been deleted" });
    } catch (error) {
        console.error("Error deleting note:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
