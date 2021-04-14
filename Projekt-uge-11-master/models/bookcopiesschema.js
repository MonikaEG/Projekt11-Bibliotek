"use strict";

const mongoose = require('mongoose');

const bookcopiesSchema = mongoose.Schema ({
    bookid: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    // bookid: Number,
    // id: Number
});

module.exports = mongoose.model("Bookcopy", bookcopiesSchema, 'bookcopies') //bookcopies refererer til en collection i databasen 