import { useEffect, useState } from "react";
import StarRating from "../utilities/StartRating";
import Spinner from "../utilities/Spinner";
import { KEY } from "../utilities/config";
import ErrorMessage from "./errorMessage";
import { useKeyPress } from "../customHooks/useKeyPress";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime ? Number(runtime.split(" ").at(0)) : 0,
      userRating,
    };

    onAddWatched((watched) => [...watched, newWatchedMovie]);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res) throw new Error("Something went wrong with the fetching!");

          const data = await res.json();

          if (data.Response === "False")
            throw new Error("Movie not found for the selected ID");

          setMovie(data);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        }
      }

      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => (document.title = "Movie List");
  });

  useKeyPress("Escape", onCloseMovie);

  return (
    <div className="details">
      {error && <ErrorMessage />}
      {isLoading && <Spinner />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>You rated this movie {watchedUserRating}⭐</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starrring {actors}</p>
            <p>Directed by {director}</p>
            <p>Released in {year}</p>
          </section>
        </>
      )}
    </div>
  );
}
