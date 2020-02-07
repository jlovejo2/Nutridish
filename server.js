const express = require('express');
const db = require('./models');

const PORT = process.env.PORT || 8080;
const app = express();


//Routes
// ==============================

require('./routes/nutrients-routes.js')(app);

//Syncing our sequelize models created in model folder.
// This line of code also starts our express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT)
    });
});

// {force: true}