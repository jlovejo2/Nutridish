module.exports = function(sequelize, DataTypes) {
    const Nutrients = sequelize.define("Nutrients", {
        nutrientName: DataTypes.STRING,
        nutrientApiCode: DataTypes.STRING,
    })
    return Nutrients;
}