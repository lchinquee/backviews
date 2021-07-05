const fs = require('fs');
const path = require('path');

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;

    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
}
function newNote(body, notesArray) {
    const notes = body;
    notesArray.push(notes);

    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notesArray }, null, 2)
    );
    return notes;
}

function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
}

module.exports = {
    newNote,
    findById
};