const Note = require('../models/Notes.js');
const express = require('express');
const app = express.Router()

//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    const note = new Note({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateAdded: Date.now(),
        dateUpdated: Date.now()
    })
    await Note.save(note);
    res.send(note);
});

//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.send(notes);
});

//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await Note.findOne({_id: req.params.noteId});
        res.send(note);
    } catch (error) {
        res.status(404)
        res.send({ error: "Note doesn't exist!" })
    }
});

//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    try {
        let note = await Note.findOne({_id: req.params.noteId});
        note = req.body;
        note.id = noteId;
        await Note.save(note);
        res.send(note);
    } catch {
        res.status(404)
        res.send({error: "Note doesn't exist!"})
    }
});

//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async (req, res) => {
    try {
        await Note.deleteOne({_id: req.params.noteId})
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({error: "Note doesn't exist!"})
    }
});

module.exports = app;

