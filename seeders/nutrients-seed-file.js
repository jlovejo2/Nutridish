'use strict';
const nutrientsData = require('../nutrientObj')
/*got the idea of this code from https://gist.github.com/vapurrmaid/a111bf3fc0224751cb2f76532aac2465*/
/*it is a file for seeder code that can be run  */
module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Nutrients', nutrientsData)
    }
    /*
          Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
