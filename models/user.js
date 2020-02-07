module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        userName: DataTypes.STRING,
        email: DataTypes.STRING
    })
    return User;
}