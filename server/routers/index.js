const express = require("express");
const Controller = require("../controllers/user.controller");
const PokemonController = require("../controllers/pokemon.controller");
const authentication = require("../middleware/auth");

const router = express.Router();

const errorHandler = require("../middleware/errhandler");

router.post("/signin", Controller.signIn);
router.post("/signup", Controller.signUp);
router.get("/pokemons-fav", PokemonController.showPokemonFavorite);
router.use(authentication);
router.put("/update-pokemon-fav", PokemonController.updatePokemonFavorite);

router.use(errorHandler);
module.exports = router;
