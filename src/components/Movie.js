import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({
  imdbID,
  title,
  year,
  imdbRating,
  rottenTomatoesRating,
  classification,
  poster,
}) {
  return (
    <div>
      {poster && <img src={poster} alt={`${title} poster`} width={200} />}
      <h2>
        <Link to={`/movie/${imdbID}`}>{title}</Link>
      </h2>
      <ul>
        ({year}) -IMDb:{imdbRating}
        <p>{rottenTomatoesRating}</p>
        <p>{classification}</p>
      </ul>
    </div>
  );
}
Movie.propTypes = {
  imdbID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  imdbRating: PropTypes.number.isRequired,
  rottenTomatoesRating: PropTypes.number,
  classification: PropTypes.string,
};
export default Movie;
