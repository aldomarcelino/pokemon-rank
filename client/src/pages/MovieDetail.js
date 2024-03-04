import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { MdPhotoLibrary, MdVideoLibrary } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { AiOutlineDown, AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getTheMovie, selectMovie } from "../store/slice/movieSlice";

const key = process.env.REACT_APP_TMDBKEY;

export default function MovieDetail() {
  const [movie, setMovie] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const theMovie = useSelector(selectMovie);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("Succes:", res);
        setMovie(res);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  useEffect(() => {
    if (movie) {
      dispatch(getTheMovie(movie.imdb_id));
      movieTrailer(movie?.title || "")
        .then((url) => {
          const ulrParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(ulrParams.get("v"));
        })
        .catch((error) => console.log(error));
    } else setTrailerUrl("");
  }, [movie]);

  return (
    <div className="mx-[16%] mt-10 text-teal-50 font-semibold">
      {movie ? (
        <div>
          <div className="flex flex-row justify-between">
            <div>
              <h1 className="text-white sm:text-xl md:text-3xl lg:text-5xl">
                {movie.title}
              </h1>
              <div className="flex flex-row text-gray-300 gap-1 text-sm my-3">
                <p>{movie.release_date.substr(0, 4)}</p>
                <p>•</p>
                {movie.adult ? <p>R</p> : <p>PG-13</p>}
                <p>•</p>
                <span>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 ">
              <div className="flex flex-col justify-center items-center">
                <p className="text-gray-400">IMDb RATING</p>
                <div className="flex gap-2 items-center">
                  <AiFillStar className="w-7 h-7 text-yellow-500" />
                  {theMovie.imdbRating}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-gray-400">POPULARITY</p>
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    className="text-[#67AD4B]"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-2.6 0-5-1.3-6.4-3.3l2.8-3.4 1.3 1.5c.4.4 1 .4 1.3 0l2.9-3.2 1.3 1.4c.3.3.8.1.8-.3V8.5c0-.3-.2-.5-.5-.5h-4c-.4 0-.6.5-.3.8l1.3 1.4-2.2 2.5L9 11.3c-.4-.4-1-.4-1.3 0L4.6 15c-.4-.9-.6-1.9-.6-3 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"></path>
                  </svg>
                  {movie.popularity}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <div className="w-[200px] sm:w-[220px] md:w-[250px] lg:w-[280px]">
              <img
                className="w-full h-auto block rounded-sm"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            {trailerUrl ? (
              <YouTube
                className="w-[800px] sm:w-[820px] md:w-[840px] lg:w-[860px]"
                videoId={trailerUrl}
                opts={{
                  height: "100%",
                  width: "100%",
                  playerVars: {
                    autoplay: 0,
                  },
                }}
              />
            ) : (
              <div className="h-full w-full bg-[#171717]" />
            )}
            <div className="w-[200px] flex flex-col gap-1 text-white text-sm">
              <div className="bg-[#0f0e0e] w-[100%] h-full items-center justify-center flex flex-col gap-2">
                <MdVideoLibrary className="h-10 w-10" />
                <p>MORE VIDEOS</p>
              </div>
              <div className="bg-[#0f0e0e] w-[100%] h-full items-center justify-center flex flex-col gap-2">
                <MdPhotoLibrary className="h-10 w-10" />
                <p>PHOTOS</p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-row justify-between">
            <div className="w-[65%]">
              <div className="flex flex-row gap-3">
                {movie?.genres.map((genre) => (
                  <div
                    className="rounded-3xl py-1 px-3 border-2 border-gray-500 "
                    key={genre.id}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
              <div className="mt-5 border-b pb-3 border-gray-500 ">
                <p>{movie.overview}</p>
              </div>
              <div className="flex mt-3 border-b pb-3 border-gray-500 gap-5">
                Directors <p className="text-[#5799ef]">{theMovie.Director}</p>
              </div>
              <div className="flex mt-3 border-b pb-3 border-gray-500 gap-5">
                Writers <p className="text-[#5799ef]">{theMovie.Writer}</p>
              </div>
              <div className="flex mt-3 border-b pb-3 border-gray-500 gap-5">
                Actors <p className="text-[#5799ef]">{theMovie.Actors}</p>
              </div>
              <div className="flex mt-3 gap-5">
                Language & Country{" "}
                <span className="text-[#5799ef]">
                  {theMovie.Language} • {theMovie.Country}
                </span>
              </div>
            </div>
            <div className="w[25%] flex flex-col gap-2">
              <div className="flex flex-row gap-1">
                <div className="sm:w-[200px] sm:h-[24px] md:w-[300px] md:h-[36px] lg:w-[375px] lg:h-[48px] bg-[#0f0e0e] flex flex-row items-center pl-4 gap-2">
                  <HiPlus />
                  Add to Wacthlist
                </div>
                <div className="sm:w-[24px] sm:h-[24px] md:w-[36px] md:h-[36px] lg:w-[48px] lg:h-[48px] bg-[#0f0e0e] flex justify-center items-center">
                  <AiOutlineDown />
                </div>
              </div>
              <div className="border-l-4 border-yellow-500 pl-2">
                RELEASED <p className="">{theMovie.Released}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
