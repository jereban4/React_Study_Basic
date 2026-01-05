import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Detail() {
  const { imdbID } = useParams();
  const getMovie = async () => {
    const res = await fetch(`http://4.237.58.241:3000/movies/data/${imdbID}`);
    const json = await res.json();
    console.log(json);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return <h1>Detail</h1>;
}

export default Detail;
