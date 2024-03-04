"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/pokemons_fav.json");
    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Pokemons", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pokemons", null, {});
  },
};
