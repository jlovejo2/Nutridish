$(document).ready(function () {

  const searchButton = $('#searchButton');

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

  //This code starts the click event on the search button
  searchButton.on("click", function (event) {

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

      $('#recipesDiv').html(data);

      // console.log(data);

      // Handlebars.compile(data);

    })
  })
});