const express = require('express');
const session = require("express-session");
const db = require('./config/models');

const passport = require("./config/passport");

const PORT = process.env.PORT || 8080;
const app = express();
var db = require("./config/models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync({force: true}).then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT)
    });
});