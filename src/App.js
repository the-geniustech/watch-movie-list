import { useState } from "react";
import NavBar from "./header/navBar";
import Search from "./header/search";
import NumResults from "./header/numResults";
import Logo from "./header/logo";
import Main from "./main/main";
import MovieList from "./main/movieList";
import Box from "./utilities/Box";
import WatchedSummary from "./main/watchedSummary";
import WatchedMoviesList from "./main/watchedMoviesList";
import ErrorMessage from "./main/errorMessage";
import Spinner from "./utilities/Spinner";
import MovieDetails from "./main/movieDetails";
import { useMovies } from "./customHooks/useMovies";
import { useLocalStorage } from "./customHooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [watched, setWatched] = useLocalStorage("watched", []);
  const { movies, isLoading, error } = useMovies(query);

  function handleSelectMovie(Id) {
    setSelectedId((selectedId) => (Id === selectedId ? null : Id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleDeleteWatch(Id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== Id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Spinner />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={setWatched}
              watched={watched}
              key={selectedId}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatch}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
