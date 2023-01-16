import React, {useState} from 'react';
import loopImg from './assets/swloop.gif'

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
      
      setMoviesList(prevResults=>transformedMovies)
      setIsLoading(false)
    })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        
      {!isLoading && moviesList.length>0 &&  <MoviesList movies={moviesList} />}
      {!isLoading&&moviesList==0&& <p>sorry, found no movies</p>}
      {isLoading &&( <div>
        <img alt='loading' src={loopImg} />
       <p>Loding...</p></div>)}
      </section>
    </React.Fragment>
  );
}

export default App;
