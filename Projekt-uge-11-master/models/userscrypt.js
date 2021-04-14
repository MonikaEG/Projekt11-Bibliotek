'use strict';
const bcrypt = require('bcryptjs'); 
const fs = require('fs').promises;
const handleuser = require('handleUser');
const saltRounds = 10;
let myPlaintextPassword = req.body.password;
// const UFILE = __dirname + '/../data/users.json';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    console.log(hash);
});

