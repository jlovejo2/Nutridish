module.exports = function(sequelize, DataTypes) {
    //This lien of code uses sequelize to begin the defining of a table for the database.  
    //Table name is "Nutrients"
    const Recipes = sequelize.define("Recipes", {
        //Below lines of code are defining the columns in Nutrients table
        recipeObj: DataTypes.STRING,
        recipeLabel: DataTypes.STRING,
        recipeUrl: DataTypes.STRING, 
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
        
    })

    Recipes.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Recipes.belongsToMany(models.User, {
          through: 'user_Recipes'
        });
      };
    return Recipes;
};