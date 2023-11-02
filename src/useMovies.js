import { useEffect, useState } from "react";

export function useMovies(query, callback) {
  const key = "2bf4313";
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoadding] = useState(false);
  const [error, seterror] = useState("");
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoadding(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`
          );
          const data = await res.json();
          if (data.Response == "False") throw new Error("check your status");
          setMovies(data.Search);
          setIsLoadding(false);
        } catch (error) {
          seterror(error.message);
        } finally {
          setIsLoadding(false);
        }
        if (query.length < 3) {
          seterror("");
        }
      }

      fetchMovies();
      callback?.();
    },
    [query]
  );
  return { movies, isLoading, error };
}
