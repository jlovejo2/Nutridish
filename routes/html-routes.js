//Imports express npm
const express = require('express');

//calls the express.router method
const router = express.Router();

// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");


  router.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render('search');
    }
    // res.sendFile(path.join(__dirname, "../public/main.html"));
    res.render('index');
  });
  
  router.get("/sign-up", function(req, res) {
    res.render('signup');
  });



  router.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render('index');
  });

  // // Here we've add our isAuthenticated middleware to this route.
  // // If a user who is not logged in tries to access this route they will be redirected to the signup page
  router.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  module.exports = router;