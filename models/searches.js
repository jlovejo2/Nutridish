module.exports = function (sequelize, DataTypes) {
  //This lien of code uses sequelize to begin the defining of a table for the database.
  //Table name is "Nutrients"
  const Searches = sequelize.define('Searches', {
    //Below lines of code are defining the columns in Searches table
    searchQuery: DataTypes.TEXT,
    qParameter: DataTypes.STRING,
    NutrientCode: DataTypes.STRING,
    NutrientAmt: DataTypes.INTEGER,
    HealthApiCode: DataTypes.STRING,
    ProteinApiCode: DataTypes.STRING,
    createdAt: {
      //code aid from from yan
      //This column had to be made null because sequelize automatically creates this column on user input
      //This data is populated into the database in order to be pulled for users to select for externa api call
      type: DataTypes.DATE(),
      notNull: true
    },
    updatedAt: {
      type: DataTypes.DATE(),
      notNull: true
    }
  });

  Searches.associate = function (models) {
    // Associating Searches with Recipes
    Searches.belongsToMany(models.Recipes, {
      through: 'Searches_Recipes'
    });
  };

  //Code being saved to attempt the ability for searches to be saved under a user
  // Searches.associate = function (models) {
  //   // Associating Searches with User
  //   Searches.belongsToMany(models.User, {
  //     through: 'User_Searches'
  //   });
  // };

  return Searches;
};
