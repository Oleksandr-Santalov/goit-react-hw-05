import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovie } from "../../API";
import { useLocation, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Please write something in the field!");

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [queryMovies, setQueryMovies] = useState([]);
  // const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const params = searchParams.get("query") ?? "";

  // const changeParams = (newParams) => {
  //   searchParams.set("query", newParams);
  //   setSearchParams(searchParams);
  // };

  const changeParams = (newParams) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("query", newParams);
    setSearchParams(newSearchParams);
  };

  const onSubmit = (query) => {
    setQueryMovies([]);
    setTotalPage(0);
    // setQuery(query);
    setError("");
    changeParams(query);
  };

  useEffect(() => {
    if (!params) return;

    setLoader(true);

    const fetchQuery = async () => {
      try {
        const { total_pages, results, page } = await searchMovie(params);
        setTotalPage(total_pages);
        setQueryMovies(results);
        setPage(page);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchQuery();
  }, [params]);

  // useEffect(() => {
  //   if (params) {
  //     onSubmit(params);
  //   }
  // }, [params]);

  return (
    <>
      <SearchBar
        // changeParams={changeParams}
        onSubmit={onSubmit}
        onEmpty={() => {
          notify();
        }}
      />

      {loader && <Loader />}

      {queryMovies.length > 0 && <MovieList movies={queryMovies} />}

      {error && <ErrorMessage message={error} />}

      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        }}
      />
    </>
  );
}
