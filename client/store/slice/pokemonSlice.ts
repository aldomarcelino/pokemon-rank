import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pokemon: [],
  pokeFav: ''
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
    setPokemonFav: (state, action) => {
      state.pokeFav = action.payload;
    }
  }
});

export const { setPokemon, setPokemonFav } = pokemonSlice.actions;

export const selectPokemons = (state: any) => state.pokemon.movies;

export default pokemonSlice.reducer;
