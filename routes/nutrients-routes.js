//Imports express npm
const express = require('express');

//calls the express.router method
const router = express.Router();

const db = require('../models');
const axios = require('axios');

//This route will return all the nutrients available in the nutrients table
router.get('/api/nutrientCodes', function (req, res) {
  db.Nutrients.findAll({}).then(function (dbNutrients) {
    console.log('inside get response');

    res.json(dbNutrients);
  });
});
//This route will return all the health options available in the health table
router.get('/api/healthCodes', function (req, res) {

  db.Health.findAll({ attributes: ['healthApiCode'] }).then(function (dbHealth) {
    console.log('inside get response');
    res.json(dbHealth);
  });
});
//This route will return all the protein options available in the protein table
router.get('/api/proteinCodes', function (req, res) {

  db.Protein.findAll({ attributes: ['proteinApiCode'] }).then(function (dbProtein) {
    console.log('inside get response');
    res.json(dbProtein);
  });
});
//This route will return all the mealType options available in the mealType table
router.get('/api/dietTypeCodes', function (req, res) {

  db.DietType.findAll({ attributes: ['dietTypeCode'] }).then(function (dbDietType) {
    console.log('inside get response');
    res.json(dbDietType);
  });
});
//This route is the biggest aspect of our app and alot is happening in it.
//Esesentially when the user performs a search we check if the search exist in our database.  If it doesn't we got out to the external api 
//and bring back the result, create associations between those recipes and that search, and render the recipes to the page.
//If a search is found in our database then we pull them from our database and render them to the page. 

router.get('/api/nutrients/:userEmail/:nutrients/:healthCode/:proteinCode/:dietTypeCode', function (req, res) {

  console.log(
    req.params.userEmail + 'has searched for ' + req.params.nutrients + ' & ' + req.params.healthCode + ' & ' + req.params.proteinCode + ' & ' +req.params.dietTypeCode
  );

  // const userEmail = req.params.userEmail;

  const queryURL = `https://api.edamam.com/search?q=${req.params.proteinCode}&app_id=08b4fa57&app_key=8531f8a5f6847b98f73396ab5968aed9&nutrients%5B${req.params.nutrients}%5D=20%2B&health=${req.params.healthCode}&diet=${req.params.dietTypeCode}`;

  //This code is checking if the search query made by the user exists in the search table in our datbase
  db.Searches.findOne({
    where: {
      searchQuery: queryURL
    }
  }).then(function (dbSearchExist) {

    //If SQL query doesn't not find a search then we create a search
    if (!dbSearchExist) {
      console.log('if');

      //The search is saved into our database as a new search
      db.Searches.create({
        searchQuery: queryURL,
        NutrientCode: req.params.nutrients,
        HealthApiCode: req.params.healthCode,
        qParameter: req.params.proteinCode,
        DietTypeApiCode: req.params.dietTypeCode,
      }).then(function (newSearch) {
        console.log('past search create');

        //This line of code is associating the search that was just made with the user that is logged in making the search
        // loggedInUser.addSearch(newSearch).then(function () {
        //   console.log('user and search associated');
        // });
        //Perform an axios call to Edamam based on query url specified above
        axios.get(queryURL).then(function (apiRecipes) {
          //The resp obj from the api has a setup that requires to navigate to .data then .hits inorder to get the array of recpe objects
          const recipesApiArr = apiRecipes.data.hits;

          //Custom function that grabs the array of recipes returned from axios call and creates an array of objects from them
          //The object is specified by variable obj.  This obj matches the columns for recipes table
          //That way the obj can be placed in array by map() method and then that array can be used to bulk insert recipes
          const createArr = recipesApiArr.map(recipes => {
            const obj = {
              searchQuery: queryURL,
              label: recipes.recipe.label,
              url: recipes.recipe.url,
              img: recipes.recipe.image,
              ingredientLines: recipes.recipe.ingredientLines,
              //This is a rather large array of objects that we do not use all the info from
              //Therefore the data is set to an array of objects grabs the data we want from the api so it can be saved in database.
              //Digest was chosen because it matches the external api naming convention
              digest: recipes.recipe.digest.map(nutrientDataArr => {
                const nutrientObj = {
                  label: nutrientDataArr.label,
                  total: nutrientDataArr.total,
                  daily: nutrientDataArr.daily,
                  unit: nutrientDataArr.unit
                };
                return nutrientObj;
              })
            };
            return obj;
          });

          //This group of code takes the above array of objects and does a bulkInsert into the recipes table.
          //Since the objects were formated above to match table columns array can be inserted as parameter
          db.Recipes.bulkCreate(createArr).then(function (createdRecipes) {
            //addRecipes is a method automatically generated by sequelize through the associations made in models folder
            //see https://sequelize.org/v3/api/associations/belongs-to-many/
            newSearch.addRecipes(createdRecipes).then(function (resp) {

              //This function grabs the response from the recipes being associated to searches and gets the raw data
              //This makes it much easier to navigate and render into handlebars
              const recipeData = resp.map(Recipe =>
                Recipe.get({ plain: true })
              );

              //These lines of code grab our array of createArr of objects made from the recipes from the api
              //It also grabs the raw data from the associations that were made in lines above
              //The goal is for it to add a {id: recipeId} key value pair to the createdArr of objects.  This recipeId value is pulled from the raw data of the recipe associations
              const updatedCreateArr = createArr.map((RecipesToAdd, indexOfRecipeData) => {
                const justAddedRecipeFromDB = recipeData[indexOfRecipeData];

                RecipesToAdd.id = justAddedRecipeFromDB.RecipeId;
                return RecipesToAdd;
              }
              );

              //Now that recipes have been saved to database they can be rendered into a html string with handlebars
              //Then send back to the frontend
              res.render('recipes', {
                layout: 'main.handlebars',
                recipe: updatedCreateArr
              });
            })
              .catch(error => {
                console.error(error);
              });
          });
        });

      });

    }
    //If SQL query finds a search
    else {
      console.log('else');
      const foundSearchId = dbSearchExist.dataValues.id;

      //This line of code looks through the search that matches the one that user just executed.
      //It then uses the association between it an recipes and brings back all the recipes associated with that search
      db.Searches.findOne({
        where: { id: foundSearchId },
        include: { model: db.Recipes }
      })
        .then(function (dbRecipes) {
          const recipeData = dbRecipes.dataValues.Recipes.map(Recipe =>
            Recipe.get({ plain: true })
          );

          //The handles bars for recipes from database is slightly different because of format of api object
          res.render('recipes', {
            layout: 'main.handlebars',
            recipe: recipeData
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});

//This route adds the ability for a user to save a recipe
router.put('/saveRecipe/:userEmail/:recipeId', function (req, res) {
  console.log('entered save recipe to user');
  console.log(req.params.userEmail);
  console.log(req.params.recipeId);

  //This code finds the user that send this request because email was delivered in the url
  db.User.findOne({ where: { email: req.params.userEmail } }).then(function (savingUser) {
    savingUser.addRecipe([req.params.recipeId]).then(function (likeRecipe) {
      console.log('entered .then of add association');
      res.json(likeRecipe);
    })
      .catch(err => {
        console.log(err);
      });
  });
});

//This code will grab all the recipes from the database
router.get('/api/recipes', function (req, res) {
  console.log('***************  api recipes');
  db.Recipes.findAll({}).then(function (dbRecipes) {
    res.json(dbRecipes);
  });
});

//This is to return all the recipes a user has saved
router.get('/recipes/:userEmail', function (req, res) {
  console.log('user wants saved recipes');
  db.User.findOne({ where: { email: req.params.userEmail } }).then(function (dbUser) {
    // console.log(dbUser);
    dbUser.getRecipes().then(function (dbUserRecipes) {
      // console.log(dbUserRecipes);

      const savedRecipeData = dbUserRecipes.map(Recipe =>
        Recipe.get({ plain: true })
      );

      res.render('recipes', {
        layout: 'main.handlebars',
        recipe: savedRecipeData
      });
    });
  });
});

//This is to return all the searches a user has saved
router.get('/searches/:userEmail', function (req /*, res*/) {
  // eslint-disable-next-line
  db.User.getRecipes({ where: { email: req.params.userEmail } }).then(function () {

  });
});

//This is to return all recipes for the search
module.exports = router;