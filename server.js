//On the below link I found that I could the npm dotenv to read env files in my code
//https://www.freecodecamp.org/news/heres-how-you-can-actually-use-node-environment-variables-8fdf98f53a0a/
require('dotenv').config();

//Require npms
const express = require('express');
const session = require("express-session");
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || process.env.MY_PORT;

// Require the entire contents of model folders.  Grabbing the tables created.  This is important for sequelize functionality
const db = require('./models');

// Requiring passport.js file in config folder which is used with user authentication
const passport = require("./config/passport");

//Requiring the html-routes.js file which is used below to render routes for handlebars
const routes = require('./routes/html-routes.js');
const routes1 = require('./routes/login-routes.js');
const routes2 = require('./routes/nutrients-routes.js');

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
// require('./routes/nutrients-routes.js')(app);
// require("./routes/html-routes.js")(app);
// require("./routes/login-routes")(app);

//Handlerbars server code
//==============================
var handlebars = require('./helpers/handlebars.js')(exphbs)
app.engine('handlebars', handlebars.engine );
app.set('view engine', 'handlebars');

// exphbs({ defaultLayout: 'main', helpers: require("./helpers/handlebars.js").helpers})
app.use(routes);
app.use(routes1);
app.use(routes2);


//Syncing our sequelize models created in model folder.
// This line of code also starts our express app
//==============================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT)
    });
});

// {force: true}