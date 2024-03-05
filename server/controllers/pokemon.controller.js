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

  static async updatePokemonFavorite(req, res, next) {
    try {
      const { pokemonFavorite, idBefore } = req.body;
      await User.update(
        { favoriteId: pokemonFavorite },
        { where: { id: req.user.id } }
      );

      await Pokemon.update(
        {
          vote: sequelize.literal(`"vote" - 1`),
        },
        {
          where: { url: idBefore },
          returning: true,
          plain: true,
        }
      );

      await Pokemon.update(
        {
          vote: sequelize.literal(`"vote" + 1`),
        },
        {
          where: { url: pokemonFavorite },
          returning: true,
          plain: true,
        }
      );

      res.status(201).json({
        message: "pokemon favorite updated successfully",
        favoriteId: pokemonFavorite,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PokemonController;
