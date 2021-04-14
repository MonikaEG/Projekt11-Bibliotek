var express = require('express');
var router = express.Router();
const TITLE = 'Library Project';
const handlebooks = require('../models/handleBooks');
const handleuser = require('../models/handleUser');
const handlebookcopies = require('../models/handlebookcopies');
const login = require('../models/login');
const loans = require('../models/Loan');
const reserve = require('../models/Reservation');
const session = require('express-session');
//const page = require('../public/javascript/page');
// Require til handlers m.m.

//Get home page
router.get('/', function(req, res, next){
    res.render('index', {
      title: TITLE, 
      subtitle: 'Front Page',
      authenticated: req.session && req.session.authenticated});
});

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/showbooks', async function(req, res, next) {
  let books = await handlebooks.getBooks({}, {sort: {title: 1}});
  
  res.render('showbooks', { 
    title: TITLE, 
    subtitle: 'Display Books', 
    authenticated: req.session && req.session.authenticated,
    books});
});

router.post('/showbooks', async function(req, res, next) {
  let books = await handlebooks.getBooks();
});

router.get('/bookform', function(req, res, next) {
  res.render('bookform', { 
    title: TITLE, 
    subtitle: 'Book Entry Form',
    authenticated: req.session && req.session.authenticated });
});

router.post('/bookform', async function(req, res, next) {
  await handlebooks.postBooks(req, res, next);
  res.redirect('/showbooks');
});



//User

router.get('/showuser', async function(req, res, next) {
  let users = await handleuser.getUsers({}, {sort: {title: 1}});
  res.render('showuser', { 
    title: TITLE,
    subtitle: 'Display User',
    authenticated: req.session && req.session.authenticated,
    users });
});

router.post('/showuser', async function(req, res, next) {
  let users = await handleuser.getUsers();
});

router.get('/userform', function(req, res, next) {
  res.render('userform', {
    title: TITLE,
    subtitle: 'User form',
    authenticated: req.session && req.session.authenticated });
});

router.post('/userform', function(req, res, next) {
  handleuser.postUsers(req, res, next);
  res.redirect('/showuser');
});

// Login
router.get('/', function(req, res, next){
  res.render('login', {
      title: TITLE,
      subtitle: 'Login',
      authenticated: req.session && req.session.authenticated});
});

router.post('/', async function(req, res, next) {
await login.getLogin(req)
  .then( function (rc) {
    if (!rc)
      res.render('index', { title: 'Login', tf: "Login failed", returnCode: rc });// tf hvis bruger ikke findes
    else	
      res.render('index', { title: 'Login', tf: "Logged in successfully", 
      authenticated: req.session && req.session.authenticated, returnCode: rc });
      });
});

//Logud
router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.render('logout');
});

// router.get('public/javascripts/page', function(req, res, next){
// })

//Reserve and loan books
router.get('/loan', async function(req, res, next){
  let loanable = await loans.getBooksWithUnloanedCopies();
  let books = await handlebooks.getBooks();

  res.render('loan', {
    title: TITLE,
    subtitle: 'Display Books for Loan', 
    authenticated: req.session && req.session.authenticated,
    books});
});

//post loans router her
router.post('/loan', function(req, res, next) {
  loans.postLoans(req, res, next);
  res.redirect('/loan');
});

router.get('/reserve', async function(req, res, next){
  let reservable = await handleBooks.getBooksWithAllLoanedCopies();
  res.render('reserve', {
    title: TITLE,
    subtitle: 'Display Books for Reservation',
    authenticated: req.session && req.session.authenticated,
    reservable});
});


/*Bookcopies
router.get('/showbookcopies', async function(req, res, next) {
  let bookcopies = await handlebookcopies.getBookcopies({}, {sort: {title: 1}});
  res.render('showbookcopies', { title: TITLE, subtitle: 'Display Copies', bookcopies});
});

router.post('/showbookcopies', async function(req, res, next) {
  let bookcopies = await handlebookcopies.getBookcopies();
});

router.get('/bookcopiesform/:bks', async function(req, res, next) {
  let books = await handlebooks.getBooks({}, {sort: {title: 1}});
  res.json(books);
});

router.get('/bookcopiesform', function(req, res, next) {
  res.render('bookcopiesform', {title: TITLE, subtitle: 'Bookcopies form' });
});

router.post('/bookcopiesform', function(req, res, next) {
  handlebookcopies.postBookcopies(req, res, next);
  res.redirect('/showbookcopies');
});*/

module.exports = router;
