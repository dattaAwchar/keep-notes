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
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add a new Note using : POST "/api/notes/addnote" - Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must contain at least 5 characters').isLength({ min: 5 }),
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
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Route 3: Update an existing Note : PUT "/api/notes/updatenote/:id" - Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {


        const { title, description, tag } = req.body;

        //Create a newNote object
        const newNote = {}

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };


        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


// Route 4: Delete an existing Note : DELETE "/api/notes/deletenote/:id" - Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", node: note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;

