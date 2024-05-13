import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <main className={css.main}>
      <ul className={css["list-item"]}>
        {movies.map((movie) => {
          return (
            <li className={css.item} key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt=""
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default MovieList;
