"use strict";
const mon = require("./mongooseWrap");
const Book = require("./booksschema");
const dbServer = "localhost";
const dbName = "library";
const Bookcopy = require("./bookcopiesschema");
const mongoose = require("mongoose");
const CONSTR = `mongodb://localhost:27017/${dbName}`;
const CONPARAM = {useNewUrlParser:true, useUnifiedTopology: true};


exports.getBooks = async function (que, sort) {
    if (sort === null)
        sort = {sort: {name: 1}};
    try {
        let cs = await mon.retrieve(dbServer, dbName, Book, que, sort); // mon kommer fra mongooseWrap
        return cs;
    } catch (e) {
        console.log(e);
    }
}

exports.postBooks = async function (req) {
   await mongoose.connect(CONSTR, CONPARAM);
   const db = mongoose.connection;
   db.once("open", function() {
       console.log("connected to server by mongoose")
   });

   let author = {
       firstname: req.body.firstname,
       middlename: req.body.middlename,
       lastname: req.body.lastname
   };

   let published = {
       publisher: req.body.publisher,
       place: req.body.place,
       year: req.body.year
   };

   let book = new Book({
       title: req.body.title,
       authors: author,
       copyright: req.body.copyright,
       edition: req.body.edition,
       published: published
   });
   
    Book.create(book, function(error, savedDocument) {  // Laver objekt med number of copies input(?)
        if (error)
            console.log(error);
        console.log(req.body);
        let i = Number(req.body.noofcopies);  // Number of copies of books
        let arr = [];
        while (i > 0) {
            let bookcopy = new Bookcopy({
                bookid: savedDocument._id
            });
            arr.push(bookcopy);
            --i;
        }
        console.log(arr.length);
        let cs = Bookcopy.create(arr, function(err, cops) { // create er en mongoose function der bruges sammen med et skema. Skemaet fortæller hvordan det skal struktureres.
            if (err) {
                console.log(err);
            } db.close();
        })
    });
}



    /* let chk = { title: req.body.title };  // check object for existence
    let book = new Book({                     // create object in db-format
        title: req.body.title,
        id: req.body.id,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        edition: req.body.edition,
        copyright: req.body.copyright,
        publisher: req.body.publisher,
        year: req.body.year,
        place: req.body.place        
    }); */