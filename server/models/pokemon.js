"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    // static associate(models) {
    //   Pokemon.belongsTo(models.User, {
    //     foreignKey: "authorId",
    //   });
    // }
  }
  Pokemon.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "name is required" },
          notNull: { msg: "name is required" },
        },
      },
      poster: DataTypes.TEXT,
      banner: DataTypes.TEXT,
      vote: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pokemon",
    }
  );
  return Pokemon;
};
