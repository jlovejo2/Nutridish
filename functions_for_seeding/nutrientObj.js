const functions = require('../functions_for_seeding/functions');
const nutrientCodeArr = ['CA', 'CHOCDF', 'CHOLE', 'FAMS', 'FAPU', 'FASAT', 'FAT', 'FATRN', 'FE', 'FIBTG', 'FOLDFE', 'K', 'MG', 'NA', 'NIA', 'P', 'PROCNT', 'RIBF', 'SUGAR', 'THIA', 'TOCPHA', 'VITA_RAE', 'VITB12', 'VITB6A', 'VITC', 'VITD', 'VITK1', 'ZN'];
const nutrientNameArr = ['calcium', 'carbs', 'cholesterol', 'monounsaturated', 'polyunsatured', 'saturated', 'fat', 'trans', 'iron', 'fiber', 'folate', 'potassium', 'magnesium', 'sodium', 'energy', 'niacin', 'phosphorus', 'protein', 'riboflavin', 'sugars', 'thiamin', 'vitamin E', 'vitamin A', 'vitamin B12', 'vitamin B6', 'viatmin C', 'vitamin D', 'Viatmin K'];
const nutrientUnitArr = [];
const nutrientKeysArr = ["nutrientName", "nutrientApiCode"];

//This line of code calls the createObj() function in the functions.js file.  This function will create an object with the based on the values of the two
//arrays   
const nutrientsArr = functions.createObj(nutrientNameArr, nutrientCodeArr, nutrientKeysArr)


module.exports = nutrientsArr;