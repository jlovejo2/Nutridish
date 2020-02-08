//On the below link I found that I could the npm dotenv to read env files in my code
//https://www.freecodecamp.org/news/heres-how-you-can-actually-use-node-environment-variables-8fdf98f53a0a/
require('dotenv').config();

const express = require('express');
const session = require("express-session");
const db = require('./models');

const passport = require("./config/passport");

const PORT = process.env.PORT || process.env.MY_PORT;
const app = express();

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
//=======================
require('./routes/nutrients-routes.js')(app);
require("./routes/html-routes.js")(app);
require("./routes/login-routes")(app);

//Syncing our sequelize models created in model folder.
// This line of code also starts our express app
//==============================
db.sequelize.sync({force: true}).then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT)
    });
});

// {force: true}
