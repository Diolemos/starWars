import React, {useState} from 'react';


import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [moviesList, setMoviesList] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  function fetchMoviesHandler(){
    setIsLoading(true)
    fetch('https://swapi.dev/api/films/').then(
      response=>{
        return response.json();
      }
    ).then(data=>{ 
      const transformedMovies = data.results.map(movieData => {
        return{
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      
      setMoviesList(prevResults=>transformedMovies)})
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={moviesList} />
      </section>
    </React.Fragment>
  );
}

export default App;
