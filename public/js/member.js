

$(document).ready(function () {

  const searchButton = $('#searchButton');
  const saveRecipeButton = $('.saveRecipe');

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.ajax("/api/user_data", {
    type: "GET"
  }).then(function (data) {
    $(".member-name").text(data.email);
  });

  //This runs a get request when the page is rendered to place the nutrients in nutrient table as options in the pulldown menu
  $.ajax("/api/nutrientCodes", {
    type: "GET"
  }).then(function (data) {
    console.log(data);
    const nutrientSelectDiv = $('#nutrientInputGroup')

    for (let nutrient of data) {
      let inputOption = $('<option>').attr({ "class": "nutrient-item" })

      inputOption.attr({ "value": `${nutrient.nutrientApiCode}` })
      inputOption.text(nutrient.nutrientName)
      nutrientSelectDiv.append(inputOption);
    }

  })

  //This code starts the click event listener on the search button
  searchButton.on("click", function (event) {

    // console.log($('#nutrientInputGroup')[0].value);
    const nutrientApiCode = $('#nutrientInputGroup')[0].value;
    console.log('onlclick')
    //This code runs a get request to our api with the value of the selected nutrient sent as a parameter in the url
    $.ajax("/api/nutrients/" + nutrientApiCode, {
      type: "post",
    }).then(function (data) {
      
      console.log('got response')
      // console.log(data);

      // window.location.href = data.trim();
      $('#recipesDiv').html(data);
    })
  })

  // $('#recipesDiv').on("click", function(event){
  //   console.log(event);
  // })
  
  //This code starts the click event listener 
  $('#recipesDiv').on("click", function (event) {
    console.log(event);
    if (event.target.className.includes("saveRecipe")){
    console.log("found it!");
    // JSON.parse(event.target.dataset.recipe);
    console.log(event.target.outerHTML.data());
    }
  })




//___________Saved code_____________
//______________________________

  //Javascript code for rendering recipes to divs
  
      // //These variables are declared outside of the for loop so the recipes in the delivered array can be rendered to the page
      // const allRecipesDiv = $('#recipesDiv');
      // let count = 0;
      // let rowDiv = $('<div>').attr({ "class": "row m-3" });

      // for (let recipe of data) {

      //     let colDiv = $('<div>').attr({ "class": "col-4" });
      //     console.log(count);
      //     console.log(recipe);
      //     //setting variables from response object to be used in recipe card
      //     const recipeImg = recipe.recipe.image;
      //     const recipeTitle = recipe.recipe.label;
      //     const recipeUrl = recipe.recipe.url;
      //     const ingrArr = recipe.recipe.ingredientLines;
      //     const recipeNutrientsArr = recipe.recipe.digest;


      //     //creating divs and classes that will have text and be appended to page below
      //     const outerCardDiv = $('<div>').attr({ "class": "card p-3" });
      //     const imgDiv = $('<img>').attr({ "class": "card-img-top img-fluid", "src": recipeImg, "alt": "recipe" })
      //     const cardBody = $('<div>').attr({ "class": "card-body" })
      //     const titleDiv = $('<h5>').attr({ "class": "card-title" })

      //     const cardLink = $('<a>').attr({ "href": recipeUrl, "class": "btn btn-primary" })

      //     //Recipe label is added as title to title div and then it is append to body of bootstrap card
      //     titleDiv.text(recipeTitle);
      //     cardBody.append(titleDiv);

      //     //This loop runs for each ingredient line in ingredient arr
      //     //Each ingredient line will get its own p tag and be rendered into card body
      //     for (let ingredient of ingrArr) {

      //       let cardText = $('<p>').attr({ "class": "card-text" })
      //       cardText.text(ingredient);
      //       cardBody.append(cardText);
      //     }

      //     //Add the text into the link and then append it to the card
      //     cardLink.text("See the recipe at its source");
      //     cardBody.append(cardLink);

      //     //The image and cardbody are append to the bootstrap card
      //     outerCardDiv.append(imgDiv);
      //     outerCardDiv.append(cardBody);

      //   //The set of if else statements below are set-up to render the right amount of cards into the cols
      //   //This is to maintain responsiveness and spacing of the web page
      //   if (count < 3) {
      //     colDiv.append(outerCardDiv);
      //     rowDiv.append(colDiv);
      //     count++;
      //   } else if (count = 3) {

      //     allRecipesDiv.append(rowDiv);
      //     count = 1;
      //     rowDiv = $('<div>').attr({ "class": "row m-3" });
      //     colDiv.append(outerCardDiv);
      //     rowDiv.append(colDiv);
      //   } else {
      //     allRecipesDiv.append(rowDiv);
      //   }
      //   allRecipesDiv.append(rowDiv);
      // }




});