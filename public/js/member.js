$(document).ready(function() {

  const searchButton = $('#searchButton');

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);
    });

    //This runs a get request when the page is rendered to place the nutrients in nutrient table as options in the pulldown menu
    $.get("/api/nutrients").then(function(data){
      console.log(data);
      const nutrientSelectDiv = $('#nutrientInputGroup')
      
      for ( let nutrient of data) {
        let inputOption = $('<option>').attr({"class":"nutrient-item"})

        inputOption.attr({"value":`${nutrient.nutrientApiCode}`})
        inputOption.text(nutrient.nutrientName)
        nutrientSelectDiv.append(inputOption);
      }

    //This code starts the click event on the search button
    searchButton.on("click", function(event){
      
      // console.log($('#nutrientInputGroup')[0].value);
      const nutrientApiCode = $('#nutrientInputGroup')[0].value;

      $.get(`/api/nutrients/${nutrientApiCode}`).then(function(data){
        console.log(data);
      })

    })
    


    
    })

  });