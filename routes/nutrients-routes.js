//Imports express npm
const express = require('express');

//calls the express.router method
const router = express.Router();

const db = require('../models');
const axios = require('axios');

//This route will return all the nutrients available in the nutrients table
router.get("/api/nutrientCodes", function (req, res) {

  db.Nutrients.findAll({}).then(function (dbNutrients) {

    console.log("inside get response");

    res.json(dbNutrients);
  });
});

router.post("/api/nutrients/:nutrients", function (req, res) {

  console.log("User has searched for " + req.params.nutrients);

  const queryURL = `https://api.edamam.com/search?q=chicken&app_id=08b4fa57&app_key=8531f8a5f6847b98f73396ab5968aed9&nutrients%5B${req.params.nutrients}%5D=20%2B`

  db.Searches.findOne({
    where: {
      searchQuery: queryURL
    },
  }).then(function(dbSearchExist) {

    //If SQL query doesn't not find a search
    if(!dbSearchExist) {
      console.log("if")

      db.Searches.create({
        searchQuery: queryURL,
        NutrientCode: req.params.nutrients 
      }).then(function() {

        console.log("past search create");

        //Perform an axios
        axios.get(queryURL).then(function (apiRecipes) {

          //The resp obj from the api has a setup that requires to navigate to .data then .hits inorder to get the array of recpe objects
          const recipesArr = apiRecipes.data.hits
          //The ingredient lines is also an array of strings
          const ingredientsArr = recipesArr[0].recipe.ingredientLines
          

          //Custom function that grabs the array of recipes returned fro maxios call and creates an array of objects from them
          //The object is specified by variable obj.  This obj matches the columns for recipes table
          //That way the obj can be placed in array by map() method and then that array can be used to bulk insert recipes
          const createArr = recipesArr.map(recipes => {
            const obj = {
              searchQuery: queryURL,
              recipeLabel: recipes.recipe.label,
              recipeUrl: recipes.recipe.url,
              recipeImg: recipes.recipe.image,
              recipeIngredients: ingredientsArr,
              //This is a rather large array of objects that is just stringified to be saved into database so it can be pulled and parses if we need it
              recipeNutritionalData: recipes.recipe.digest
            }
            return obj
          })
          
          //This group of code takes the above array of objects and does a bulkInsert into the recipes table.
          //Since the objects were formated above to match table columns array can be inserted as parameter
          db.Recipes.bulkCreate(createArr)
            .then(function () {
              //Now that recipes have been saved to database they can be rendered into a html string with handlebars
              //Then send back to the frontend
              res.render('recipes', { layout: false, recipe: recipesArr });
            }).catch(error => {
              console.error(error)
            });
        });
      })

    //If SQL query finds a search
    }else {
      console.log("else")
      console.log(dbSearchExist.dataValues.id);
    

    }
  });
});

router.post("/api/recipes", function (req, res) {

})

module.exports = router;









//saved code that was used in axios call in previous set-up
// Used for rendering recipe html string straight from api call response without the bulkCreate
//_______________________________________
//   .catch(function(err) {
            //     res.status(401).json(err);
            //   });
            // console.log('in axios');
            // console.log(apiRecipes.data.hits);
            // const recipes = {
            //   layout: false,
            //   recipe: apiRecipes.data.hits
            // }
            // console.log('in axios2');
        
            // res.render('recipes', recipes, function(err, html) {
            //   if(err) {
            //     throw err
            //   } else {
        
            //   res.send(html);
            //   // console.log(html);
            //   }
            // });