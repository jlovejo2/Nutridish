//This is require the bcrypt module that is used to encrypt the password in the database
const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {

    const User = sequelize.define("User", {
        //The below code creates the column names for the user table
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        userName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
          },
          // The password cannot be null
          password: {
            type: DataTypes.STRING,
            allowNull: false
          }
    })

    User.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      User.belongsToMany(models.Recipes, {
        through: 'user_Recipes'
      });
    };

      // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

    return User;
};