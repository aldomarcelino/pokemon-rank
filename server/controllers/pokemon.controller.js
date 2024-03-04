const { Pokemon, User, sequelize } = require("../models");

class PokemonController {
  static async showPokemonFavorite(req, res, next) {
    try {
      let data = await Pokemon.findAll({
        order: [[sequelize.literal('"vote" DESC')]],
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PokemonController;
