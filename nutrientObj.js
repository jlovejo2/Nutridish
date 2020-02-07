const functions = require('./functions');
const nutrientNameArr = ['CA', 'CHOCDF', 'CHOLE', 'FAMS', 'FAPU', 'FASAT', 'FAT', 'FATRN', 'FE', 'FIBTG', 'FOLDFE', 'K', 'MG', 'NA', 'NIA', 'P', 'PROCNT', 'RIBF', 'SUGAR', 'THIA', 'TOCPHA', 'VITA_RAE', 'VITB12', 'VITB6A', 'VITC', 'VITD', 'VITK1', 'ZN']
const nutrientCodeArr = ['calcium', 'carbs', 'cholesterol', 'monounsaturated', 'polyunsatured', 'saturated', 'fat', 'trans', 'iron', 'fiber', 'folate', 'potassium', 'magnesium', 'sodium', 'energy', 'niacin', 'phosphorus', 'protein', 'riboflavin', 'sugars', 'thiamin', 'vitamin E', 'vitamin A', 'vitamin B12', 'vitamin B6', 'viatmin C', 'vitamin D', 'Viatmin K']
const nutrientUnitArr = []
const nutrientKeysArr = ["name", "code"]


const nutrientsArr = functions.createObj(nutrientNameArr, nutrientCodeArr, nutrientKeysArr)




module.exports = nutrientsArr;