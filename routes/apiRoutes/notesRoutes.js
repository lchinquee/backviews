const router = require('express').Router();
const { newNote, findById } = require('../../lib/notes');
const { notes } = require('../../data/db');

router.get('/db', (req, res) => {
    console.log(notes);
    return res.json(notes);
});

router.get('./db/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('./db', (req, res) => {
    req.body.id = notes.length.toString();

    const note = newNote(req.body, notes);
    res.json(note);
})

module.exports = router;