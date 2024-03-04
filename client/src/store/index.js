import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../store/slice/movieSlice";
export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});
