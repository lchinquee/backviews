const fs = require('fs');
const path = require('path');

function newNote(body, notesArray) {
    const notes = body;
    notesArray.push(notes);

    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notesArray }, null, 2)
    );
    return notes;
}

module.exports = {
    newNote
};