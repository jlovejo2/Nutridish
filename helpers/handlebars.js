// Used below link as reference for this set-up to get my handlebar helpers availbe on frontend
//  https://stackoverflow.com/questions/32707322/how-to-make-a-handlebars-helper-global-in-expressjs/42224612#42224612

function hbsHelpers(hbs) {
  return hbs.create({
    default: 'main',
    helpers: {
      stringifyRecipe: function(property) {
        return JSON.stringify(property);
      }
      // stringifyRecipe: function (property1, property2, property3, property4, property5){
      //     const image = "recipe_Img: " + property1;
      //     const url = "recipe_Url: " + property2;
      //     const label = "recipe_Label: " + property3;
      //     const ingredients = "recipe_Ingredients: " + property4.toString();
      //     const nutrionalData = "recipe_Nutritional_Data: " + property5.toString();

      //     return image + "; " + url + "; " + label + "; " + ingredients + "; " + nutrionalData + "; ";

      //     }
    }
  });
}

module.exports = hbsHelpers;
