import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCast } from "../../API";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  // console.log(cast);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoader(true);
        const res = await getCast(movieId);

        setCast(res.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <>
      {loader && <Loader />}

      <ul>
        {cast.map(({ profile_path, name, character, cast_id }) => {
          return (
            <li key={cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                alt=""
              />
              <p>{name}</p>
              <p>{character}</p>
            </li>
          );
        })}
      </ul>
      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default MovieCast;
