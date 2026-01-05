import { useState, useEffect } from "react";
import Movie from "../components/Movie";
function Home() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  const getMovies = async () => {
    const response = await fetch("http://4.237.58.241:3000/movies/search");
    const json = await response.json();
    const first = json.data.slice(0, 12);

    const addPoster = await Promise.all(
      first.map(async (m) => {
        try {
          const detailRes = await fetch(
            `http://4.237.58.241:3000/movies/data/${m.imdbID}`
          );
          const detailJson = await detailRes.json();
          return { ...m, poster: detailJson.poster };
        } catch {
          return { ...m, poster: "" }; // 실패해도 진행
        }
      })
    );

    setMovie(addPoster, json);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log("first poster:", movie[0]?.poster);
  console.log(movie);
  return (
    <div>
      {loading ? (
        <h1>Loaing...</h1>
      ) : (
        <div>
          {movie.map((movie) => (
            <Movie
              key={movie.imdbID}
              imdbID={movie.imdbID}
              title={movie.title}
              year={movie.year}
              imdbRating={movie.imdbRating}
              rottenTomatoesRating={movie.rottenTomatoesRating}
              classification={movie.classification}
              poster={movie.poster}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
