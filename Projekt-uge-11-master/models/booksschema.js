"use strict";

const mongoose = require('mongoose');

const bookSchema = mongoose.Schema ({
    published: [{publisher: String, year: Number, place: String}],
    authors: [{author: String, firstname: String, middlename: String, lastname: String}],
    title: String,
    id: Number,
    edition: String,
    copyright: String
});

module.exports = mongoose.model("Book", bookSchema, 'books') //books refererer til en collection i databasen 