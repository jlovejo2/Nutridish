module.exports = function(sequelize, DataTypes) {
    const Nutrients = sequelize.define("Nutrients", {
        nutrientName: DataTypes.STRING,
        nutrientApiCode: DataTypes.STRING,
        createdAt: {
            //code aid from from yan
            type: DataTypes.DATE(),
            notNull: true
        },
        updatedAt: {
            type: DataTypes.DATE(),
            notNull: true
        }
    })
    return Nutrients;
}