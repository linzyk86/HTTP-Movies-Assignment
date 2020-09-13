import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateForm from './UpdateForm';
import { Route, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";



function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
    const { push } = useHistory();


  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div>
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
    <div>
      <Route path='/update-movie/:id' render={()=> <UpdateForm movie={movie} setMovie={setMovie}/>}
        />
      {/* <Link to="/update-movie/:id">Update</Link> */}
        <button onClick={()=> 
        push(`/update-movie/${movie.id}`)
        }>Update</button>
    </div>
    </div>
  );
}

export default Movie;
