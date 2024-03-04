import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function PokemonCard({ pokemon, index }) {
  return (
    <NavLink
      to={`pokemon/${index}`}
      className="w-[220px] sm:w-[220px] md:w-[220px] lg:w-[220px] xl:w-[200px] inline-block cursor-pointer relative p-2"
    >
      <img
        className="w-full h-auto block rounded-sm"
        src={pokemon?.url}
        alt={pokemon?.name}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 duration-300 opacity-0 hover:opacity-100 text-white m-1">
        <p className="white-opacity-normal text-sm md:text-sm font-bold flex justify-center items-center h-full text-center">
          {pokemon?.name}
        </p>
        <div className="flex flex-row gap-1 items-center absolute top-4 left-4 text-gray-300">
          <AiFillStar />
          {pokemon.vote}
        </div>
      </div>
    </NavLink>
  );
}
