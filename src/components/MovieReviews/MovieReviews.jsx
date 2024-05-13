import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../../API";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  // console.log(reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoader(true);
        const res = await getReviews(movieId);

        setReviews(res.results);
      } catch (error) {
        if (error.code !== "The resource you requested could not be found.") {
          setError(error.message);
        }
      } finally {
        setLoader(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <>
      {loader && <Loader />}

      <ul>
        {reviews.map(({ author, content, id }) => {
          return (
            <li key={id}>
              <h4>{author}</h4>
              <p>{content}</p>
            </li>
          );
        })}
      </ul>
      {reviews.length === 0 && <p>No reviews yet!</p>}
      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default MovieReviews;
