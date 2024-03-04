import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  getMoviesTmdb,
  getPokemons,
  selectMovies,
  selectPokemons,
} from "../store/slice/movieSlice";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const dispatch = useDispatch();

  const movies = useSelector(selectMovies);
  const pokemons = useSelector(selectPokemons);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page) dispatch(getMoviesTmdb(page));
    dispatch(getPokemons());
  }, []);

  console.log(pokemons, "<<pokemons");

  const handlePage = (page) => {
    console.log("current page", page);
    setPage(page);
  };

  return (
    <div>
      <div className="mt-10 mx-auto sm:px-6 lg:max-w-[74%] lg:px-12">
        <h1 className="text-white font-extrabold text-3xl">Pokemon Univers</h1>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
          {pokemons &&
            pokemons.map((item, index) => (
              <PokemonCard pokemon={item} index={index} key={`poke-${index}`} />
            ))}
        </div>
        <Pagination handlePage={handlePage} />
      </div>
    </div>
  );
}
