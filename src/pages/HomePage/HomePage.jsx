import { trendingMovies } from "../../API";
import { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";

import Loader from "../../components/Loader/Loader";

import { useLocation, useParams } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [homePage, setHomePage] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    setLoader(true);

    const fetchTrendingMovies = async () => {
      try {
        const { results, page } = await trendingMovies({
          controller: controller,
        });

        setHomePage(results);
        setPage(page);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(error.message);
        }
      } finally {
        setLoader(false);
      }
    };

    fetchTrendingMovies();

    return () => {
      controller.abort();
    };
  }, [page]);

  return (
    <>
      {loader && <Loader />}

      {homePage.length > 0 && <MovieList movies={homePage} />}

      {error && <ErrorMessage message={error} />}
    </>
  );
}
