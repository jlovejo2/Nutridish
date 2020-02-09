$(document).ready(function () {

  const searchButton = $('#searchButton');

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  //This runs a get request when the page is rendered to place the nutrients in nutrient table as options in the pulldown menu
  $.get("/api/nutrients").then(function (data) {
    console.log(data);
    const nutrientSelectDiv = $('#nutrientInputGroup')

    for (let nutrient of data) {
      let inputOption = $('<option>').attr({ "class": "nutrient-item" })

      inputOption.attr({ "value": `${nutrient.nutrientApiCode}` })
      inputOption.text(nutrient.nutrientName)
      nutrientSelectDiv.append(inputOption);
    }

  })

  //This code starts the click event on the search button
  searchButton.on("click", function (event) {

    // console.log($('#nutrientInputGroup')[0].value);
    const nutrientApiCode = $('#nutrientInputGroup')[0].value;

    $.get(`/api/nutrients/${nutrientApiCode}`).then(function (data) {
      console.log(data);

      const allRecipesDiv = $('#recipesDiv');
      let count = 0;
      let rowDiv = $('<div>').attr({ "class": "row m-3" });


      for (let recipe of data) {

          let colDiv = $('<div>').attr({ "class": "col-4" });
          console.log(count);
          console.log(recipe);
          //setting variables from response object to be used in recipe card
          const recipeImg = recipe.recipe.image;
          const recipeTitle = recipe.recipe.label;
          const recipeUrl = recipe.recipe.url;
          const ingrArr = recipe.recipe.ingredientLines;


          //creating divs and classes that will have text and be appended to page below
          const outerCardDiv = $('<div>').attr({ "class": "card p-3", "style": "width: 25rem" });
          const imgDiv = $('<img>').attr({ "class": "card-img-top img-fluid", "src": recipeImg, "alt": "recipe" })
          const cardBody = $('<div>').attr({ "class": "card-body" })
          const titleDiv = $('<h5>').attr({ "class": "card-title" })

          const cardLink = $('<a>').attr({ "href": recipeUrl, "class": "btn btn-primary" })

          //Recipe label is added as title to title div and then it is append to body of bootstrap card
          titleDiv.text(recipeTitle);
          cardBody.append(titleDiv);

          //This loop runs for each ingredient line in ingredient arr
          //Each ingredient line will get its own p tag and be rendered into card body
          for (let ingredient of ingrArr) {

            let cardText = $('<p>').attr({ "class": "card-text" })
            cardText.text(ingredient);
            cardBody.append(cardText);
          }

          //Add the text into the link and then append it to the card
          cardLink.text("See the recipe at its source");
          cardBody.append(cardLink);

          outerCardDiv.append(imgDiv);
          outerCardDiv.append(cardBody);

        if (count < 3) {
          colDiv.append(outerCardDiv);
          rowDiv.append(colDiv);
          count++;
        } else if (count = 3) {

          allRecipesDiv.append(rowDiv);
          count = 1;
          rowDiv = $('<div>').attr({ "class": "row m-3" });
          colDiv.append(outerCardDiv);
          rowDiv.append(colDiv);
        } else {
          allRecipesDiv.append(rowDiv);
        }
        allRecipesDiv.append(rowDiv);
      }
    })

  })






});