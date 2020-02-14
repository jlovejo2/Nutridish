//Imports express npm
const express = require('express');

//calls the express.router method
const router = express.Router();

const db = require('../models');

router.get('/searches', function(req, res) {
  db.Searches.findAll({}).then(function(db) {
    res.json(db);
  });
});

router.get('/api/searches/:id', function(req, res) {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Author
  db.Searches.findOne({
    where: {
      id: req.params.id
    },
    include: [db.savedRecipes]
  }).then(function(db) {
    res.json(db);
  });
});
