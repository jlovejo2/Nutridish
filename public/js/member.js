$(document).ready(function () {

  const searchButton = $('#searchButton');
  const saveRecipeButton = $('.saveRecipe');

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.ajax("/api/user_data", {
    type: "GET"
  }).then(function (data) {
    $(".member-name").text(data.email);
    $("#recipesDiv").attr('data-useremail', data.email);
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

  $.ajax("/api/healthCodes", {
    type: "GET"
  }).then(function (data) {
    console.log(data);
    const healthSelectDiv = $('#healthInputGroup')

    for (let health of data) {
      let inputOption = $('<option>').attr({ "class": "health-item" })

      inputOption.attr({ "value": `${health.healthApiCode}` })
      inputOption.text(health.healthApiCode)
      healthSelectDiv.append(inputOption);
    }
  })

  //This code starts the click event listener on the search button
  searchButton.on("click", function (event) {

    const userEmail1 = $(".member-name").html()

    // console.log($('#nutrientInputGroup')[0].value);
    const nutrientApiCode = $('#nutrientInputGroup')[0].value;
    const healthApiCode =  $('#healthInputGroup')[0].value;
    console.log('onlclick')
    //This code runs a get request to our api with the value of the selected nutrient sent as a parameter in the url
    $.ajax("/api/nutrients/" + nutrientApiCode + '/' + healthApiCode, {
      type: "GET",
    }).then(function (data) {
      
      console.log('got response')
      console.log(data);

    window.location.href = "/api/nutrients/" + userEmail1 + "/" + nutrientApiCode
  })
});
  //This code starts the click event listener 
  $('#recipesDiv').on("click", function (event) {

    if (event.target.className.includes("saveRecipe")) {
      console.log(event);
      const userEmail2 = $('#recipesDiv').data().useremail;

      const selectedRecipeId = event.target.dataset.recipeid;
      console.log("found it!");
      console.log(selectedRecipeId);

      $.ajax("/saveRecipe/" + userEmail2 + "/" + selectedRecipeId, {
        type: 'put'
    }).then(function (){
      console.log('recipe Saved!!');
    })

    }
  })
});


