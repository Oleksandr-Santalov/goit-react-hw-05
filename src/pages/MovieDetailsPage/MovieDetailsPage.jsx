import { useEffect, useState, useRef } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieId } from "../../API";
import css from "./MovieDetailsPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const location = useLocation();
  const backLink = useRef(location.state);
  // console.log(location);
  // console.log(movieDetails);

  useEffect(() => {
    const fetchId = async () => {
      try {
        setLoader(true);
        const resp = await getMovieId(movieId);

        setMovieDetails(resp);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchId();
  }, [movieId]);

  // console.log(movieId);

  return (
    <>
      {loader && <Loader />}

      {movieId.length > 0 && (
        <div>
          <NavLink to={backLink.current}>Go back</NavLink>

          <div className={css.details}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
              alt=""
            />

            <ul className={css.description}>
              <li>
                <h2>{movieDetails.title}</h2>
              </li>
              <li className={css["description-item"]}>
                <h3 className={css.subtitle}>Popularity:</h3>
                {movieDetails.popularity}
              </li>
              <li className={css["description-item"]}>
                <h3 className={css.subtitle}>Overview:</h3>
                {movieDetails.overview}
              </li>
              <li className={css["description-item"]}>
                <h3 className={css.subtitle}>Rating:</h3>
                {movieDetails.vote_average}
              </li>
            </ul>
          </div>

          <div className={css.additional}>
            <h2>Additional information:</h2>

            <div className={css["additional-item"]}>
              <NavLink to="cast" state={location.state} className={css.link}>
                Cast
              </NavLink>
              <NavLink to="reviews" state={location.state} className={css.link}>
                Reviews
              </NavLink>
            </div>
          </div>

          <Outlet />
        </div>
      )}
      {error && <ErrorMessage message={error} />}
    </>
  );
}
