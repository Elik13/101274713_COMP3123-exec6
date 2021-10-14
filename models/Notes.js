const mongoose = require("mongoose")

let noteSchema = mongoose.Schema({
  noteTitle: String,
  noteDescription: String,
  priority: ['HIGH', 'LOW', 'MEDIUM'],
  dateAdded: Date,
  dateUpdated: Date
});

module.exports = mongoose.model("Note", noteSchema)
