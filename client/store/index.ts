import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slice/pokemonSlice';
import userReducer from './slice/useSlice';
export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    user: userReducer
  }
});
