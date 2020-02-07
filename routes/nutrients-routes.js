const db = require('../models');
const axios = require('axios');


module.exports = function(app) {

    //This route will return all the nutrients available in the nutrients table
  app.get("/api/nutrients", function(req, res) {
 
    db.Nutrients.findAll({}).then(function(dbNutrients) {
        
        console.log("inside get response");

        res.json(dbNutrients);
    });
  });

  app.get("/nutrients/:nutrients", function(req,res) {
      console.log("User has searched for" + req.params.nutrients);

      const queryURL = "https://api.edamam.com/search?q=chicken&app_id=08b4fa57&app_key=8531f8a5f6847b98f73396ab5968aed9&nutrients%5BFE%5D=20%2B"

      axios.get(queryURL).then(function(apiRecipes){

          res.json(apiRecipes.hits);
        });
      });


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

};
