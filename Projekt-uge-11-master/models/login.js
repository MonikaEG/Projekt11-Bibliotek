'use strict';
const mon = require("./mongooseWrap");
const User = require("./usersschema");
const bcrypt = require('bcryptjs'); 
const session = require('express-session');
const mongoose = require("mongoose");
const { compileClientWithDependenciesTracked } = require("pug");
const dbName = "library";
const CONSTR = `mongodb://localhost:27017/${dbName}`;
const CONPARAM = {useNewUrlParser:true, useUnifiedTopology: true};
const dbServer ='localhost';


// const UFILE = __dirname + '/../data/users.json';

exports.getLogin = async function (req) {
	await mongoose.connect(CONSTR, CONPARAM);
	const db = mongoose.connection;
	db.once("open", function() {
		console.log("connected to server by mongoose")
	});
	// let userid;
	let success = false;
    /*if (sort === null)
        sort = {sort: {name: 1}};*/
    try {
        /*let users = await mon.retrieve(dbServer, dbName, User, que, sort); // await er asynkront og venter, til den får info
		console.log(users);*/

		let users = await User.find({
				email: req.body.email
		},null,{});
		let user = users[0]; //find returnerer array, derfor bruger vi et index

		//console.log(`abc: ${user}`);
		
			success = await bcrypt.compare(req.body.password, user.password);
			if (success) {
				req.session.authenticated = true;
				//req.session.user = user.firstName;
			} else {
				req.session.destroy(); //Kan bruges til logout
			}
			return success;
		
    }catch(e) {
		console.log(e.message);
	}
}
