"use strict";
const mon = require("./mongooseWrap");
const Book = require("./booksschema");
const dbServer = "localhost";
const dbName = "library";
const Bookcopy = require("./bookcopiesschema");
const mongoose = require("mongoose");
const CONSTR = `mongodb://localhost:27017/${dbName}`;
const CONPARAM = {useNewUrlParser:true, useUnifiedTopology: true};


exports.getBooksWithUnloanedCopies = async function (que, sort) {
    if (sort === null)
        sort = {sort: {name: 1}};
    try {
        let cs = await mon.retrieve(dbServer, dbName, Bookcopy, que, sort); // mon kommer fra mongooseWrap
        console.log(cs);
        /*for (ids in bookid) {
            if (bookid === bookid) {
                
            }
        }*/
        //her kan vi returnere antal tilgængelige eksemplare i DB
        //vi skal også hente fra books så vi kan vise en title
        return cs;
    } catch (e) {
        console.log(e);
    }
}

exports.postLoans = async function (req) {
   await mongoose.connect(CONSTR, CONPARAM); //constr er både url og databasenavn. conparam er nogle options du kan sætte på.
   const db = mongoose.connection;
   db.once("open", function() {
       console.log("connected to server by mongoose")
   });
   console.log("hello");
   //her skal vi poste den lånte bog til loans databasen, lånerens id fra persons og et timestamp

   
}


