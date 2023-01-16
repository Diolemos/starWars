import React, {useState} from 'react';


import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [moviesList, setMoviesList] = useState([])

  function fetchMoviesHandler(){
    fetch('https://swapi.dev/api/films/').then(
      response=>{
        return response.json();
      }
    ).then(data=>{ setMoviesList(prevResults=>data.results)})
  }

  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={moviesList} />
      </section>
    </React.Fragment>
  );
}

export default App;
