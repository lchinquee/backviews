const router = require('express').Router();
const { filterByQuery, findById, newNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    console.log(notes);
    res.json(notes);
});

// Retrieve info from server
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// Post info to server
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if(!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = newNote(req.body, notes);
        res.json(note);
    }
});

// Delete a note
router.delete('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    const id = req.params.id;
    console.log(id);

    if (result) {
        delete notes[id];
        let newArray = notes.splice(id, 1);
        res.json(newArray);
    } else {
        res.send(404);
    }
});

module.exports = router;