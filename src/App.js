import { useDebugValue, useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStoragestate } from "./uselocalstorage";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const key = "2bf4313";
function App() {
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");

  const tempquery = "iron man";

  // const [watchmovie, setWatchMovie] = useState(function () {
  //   const storedvalue = localStorage.getItem("watched");
  //   return JSON.parse(storedvalue);
  // });
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watchmovie, setWatchMovie] = useLocalStoragestate([], "watched");

  function handledeletewatch(id) {
    setWatchMovie((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  function handleSelectedMovie(id) {
    setSelectedId(selectedId == id ? null : id);
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatchMovie((watched) => [...watchmovie, movie]);
  }

  return (
    <div>
      <NavBar>
        <Logo />
        <Serach query={query} setQuery={setQuery} />
        <NumResults movie={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && (
            <p className="error">
              <span>❌</span> {error}
            </p>
          )}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watchmovie}
              onaddwatched={handleAddWatched}
              oncloseMovie={handleCloseMovie}
              selectedId={selectedId}
            />
          ) : (
            <>
              <WatchedSummary watched={watchmovie} key={watchmovie.imdbID} />
              <WatchedMovieList
                watched={watchmovie}
                ondeletewatch={handledeletewatch}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

function Loader() {
  return <h2 className="loader">Loading....</h2>;
}
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h2>usePopcorn</h2>
    </div>
  );
}
function Serach({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(
    function () {
      inputEl.current.focus();
    },
    [query]
  );
  return (
    <input
      ref={inputEl}
      className="search"
      value={query}
      type="text"
      placeholder="search movies.."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movie }) {
  return <p className="num-results">Found {movie.length} Results</p>;
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ children }) {
  const [isopen, setOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={(e) => setOpen((isopen) => !isopen)}
      >
        {isopen ? "-" : "+"}
      </button>
      {isopen && children}
    </div>
  );
}
// function WatchBox() { const [watchmovie, setWatc hMovie] = useState(tempWatchedData);
//   const [isOpen2, setIsopen2] = useState(true);
//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={(e) => setIsopen2((isOpen2) => !isOpen2)}
//       >
//         {isOpen2 ? "-" : "+"}
//       </button>
//       {isOpen2 && (
// <WatchedSummary watched={watchmovie} key={watchmovie.imdbID} />
// )}
// <WatchedMovieList watched={watchmovie} />
//     </div>
//   );
// }
function MovieList({ movies, onSelectedMovie, oncloseMovie }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movie
          onSelectedMovie={onSelectedMovie}
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </ul>
  );
}
function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      {movie.imdbRating}
      <img src={movie.Poster} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>{" "}
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const userratingaverage = average(watched.map((movie) => movie.userRating));
  const averageruntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movie You watched</h2>
      <div>
        <p>
          <span>{watched.length}</span>
          <span>movies</span>
        </p>
        <p>
          <span>⭐</span>
          <span>{userratingaverage}</span>
        </p>
        <p>
          <span>❤️</span>
          <span>{averageruntime} min</span>
        </p>
      </div>
    </div>
  );
}

function MovieDetails({ selectedId, oncloseMovie, onaddwatched, watched }) {
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("10");
  const countRating = useRef(0);
  useEffect(
    function () {
      if (userRating) countRating.current = countRating.current + 1;
    },
    [userRating]
  );
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: release,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedmovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: Number(userRating),
      ratingDecision: countRating.current,
    };
    onaddwatched(newWatchedmovie);

    oncloseMovie();
  }
  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        const data = await res.json();

        setMovie(data);
      }

      getMovieDetails();
    },
    [selectedId]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Usepopcorn| ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },

    [title]
  );

  return (
    <div className="details">
      <header>
        <button onClick={oncloseMovie} className="btn-back">
          &larr;
        </button>
        <img src={poster}></img>
        <div className="details-overview">
          <p>{title}</p>
          <p>
            {release} &bull; {runtime}
          </p>
          <p>Genre: {genre}</p>
          <p> Rating:⭐{imdbRating}</p>
        </div>
      </header>

      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating onsetRating={setUserRating} maxrating={5} size={20} />
              <button onClick={handleAdd} className="btn-add">
                Add
              </button>
            </>
          ) : (
            <p>you already rate this movie </p>
          )}
        </div>
        <p>
          <em>{plot}</em>
          <p>Starring: {actors}</p>
          <p>Directed By: {director}</p>
        </p>
      </section>
    </div>
  );
}
function WatchedMovieList({ watched, ondeletewatch }) {
  return (
    <ul className="list">
      {watched.map((movies) => (
        <WatchedMovie
          ondeletewatch={ondeletewatch}
          movies={movies}
          key={movies.imdbID}
        />
      ))}
    </ul>
  );
  function WatchedMovie({ movies }) {
    return (
      <li>
        <img src={movies.poster} />
        <h3>{movies.title}</h3>
        <div>
          <p>
            <span>🤑</span>
            <span>{movies.imdbRating}</span>
          </p>
          <p>
            <span>⭐</span>
            <span>{movies.userRating}</span>
          </p>
          <p>
            <span>🏃‍♂️</span>
            <span>{movies.runtime} min</span>
          </p>
          <button
            className="btn-delete"
            onClick={() => ondeletewatch(movies.imdbID)}
          >
            ❌
          </button>
        </div>
      </li>
    );
  }
}

export default App;
