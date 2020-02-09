//Imports express npm
const express = require('express');

//calls the express.router method
const router = express.Router();

const db = require('../models');
const axios = require('axios');

    //This route will return all the nutrients available in the nutrients table
  router.get("/api/nutrients", function(req, res) {
 
    db.Nutrients.findAll({}).then(function(dbNutrients) {
        
        console.log("inside get response");

        res.json(dbNutrients);
    });
  });

  router.get("/api/nutrients/:nutrients", function(req,res) {
      console.log("User has searched for" + req.params.nutrients);

      const queryURL = `https://api.edamam.com/search?q=chicken&app_id=08b4fa57&app_key=8531f8a5f6847b98f73396ab5968aed9&nutrients%5B${req.params.nutrients}%5D=20%2B`

      axios.get(queryURL).then(function(apiRecipes){
          console.log(apiRecipes);
          console.log(apiRecipes.data.hits[0]);

         res.json(apiRecipes.data.hits);
        });
      });

  router.post("/api/recipes", function(req,res){
      
    
  })


//   app.get("/api/authors/:id", function(req, res) {
//     // Here we add an "include" property to our options in our findOne query
//     // We set the value to an array of the models we want to include in a left outer join
//     // In this case, just db.Post
//     db.Author.findOne({
//       where: {
//         id: req.params.id
//       },
//       include: [db.Post]
//     }).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });

//   app.post("/api/authors", function(req, res) {
//     db.Author.create(req.body).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });

//   app.delete("/api/authors/:id", function(req, res) {
//     db.Author.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbAuthor) {
//       res.json(dbAuthor);
//     });
//   });


module.exports = router;
