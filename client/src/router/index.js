import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import MovieDetail from "../pages/MovieDetail";
import SearchMovieDetail from "../pages/SearchMovieDetail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <MovieDetail />,
        path: "/movie/:id",
      },
      {
        element: <SearchMovieDetail />,
        path: "/movie-detail/:id",
      },
    ],
  },
]);

export default router;
