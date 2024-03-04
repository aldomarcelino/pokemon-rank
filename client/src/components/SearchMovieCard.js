import { useEffect, useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";
const key = process.env.REACT_APP_OMDBKEY;

export default function SearchMovieCard({ movie, setOff }) {
  const [theMovie, setTheMovie] = useState("");

  useEffect(() => {
    if (movie)
      fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${key}`)
        .then((res) => res.json())
        .then((res) => {
          console.log("Succes:", res);
          setTheMovie(res);
        })
        .catch((err) => {
          console.error("Error:", err);
        });
  }, [movie]);
  return (
    <div className="flex gap-5 w-[30%]">
      <NavLink
        to={`movie-detail/${movie.imdbID}`}
        className="w-[50%] inline-block cursor-pointer relative p-2"
        onClick={() => setOff()}
      >
        <img
          className="w-full h-auto block rounded-sm"
          src={movie.Poster}
          alt={movie.Title}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 duration-300 opacity-0 hover:opacity-100 text-white m-1">
          <span className="white-opacity-normal text-sm md:text-sm font-bold flex justify-center items-center h-full text-center">
            more <BsBoxArrowUpRight />
          </span>
        </div>
      </NavLink>
      {theMovie ? (
        <div className="flex flex-col w-[70%] gap-2">
          <NavLink
            to={`movie-detail/${movie.imdbID}`}
            className="text-3xl"
            onClick={() => setOff()}
          >
            {theMovie.Title}
          </NavLink>
          <span className="text-md text-gray-500">
            {theMovie.Language}•{theMovie.Year}
          </span>
          <div className="w-[80%]">
            <p className="text-md text-gray-500">
              {theMovie.Plot.slice(0, 100).concat("...")}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
