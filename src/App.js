import React, {useCallback, useState} from 'react';
import { useEffect } from 'react';
import loopImg from './assets/swloop.gif'

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [moviesList, setMoviesList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetch('https://react-http-e49eb-default-rtdb.firebaseio.com/movies.json')
    .then(response => {
    if (!response.ok) {
    throw new Error('Something went wrong');
    }
    return response.json();
    })
    .then(data => {
    const transformedMovies = data.results.map(movieData => {
    return {
    id: movieData.episode_id,
    title: movieData.title,
    openingText: movieData.opening_crawl,
    releaseDate: movieData.release_date
    };
    });
    setMoviesList(prevResults => transformedMovies);
    setIsLoading(false);
    })
    .catch(error => {
    setError(error.message);
    setIsLoading(false);
    });
    }, []);
  useEffect(()=>fetchMoviesHandler(), []);
    
 async function addMovieHandler(movie){
      const response = await fetch('https://react-http-e49eb-default-rtdb.firebaseio.com/movies.json',{
        method: 'POST',
        body:  JSON.stringify(movie),
        headers: {'content-type':'application/json'}
      })

      const data = await response.json();
      console.log(data);
    }
 

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        
      {!isLoading && moviesList.length>0 &&  <MoviesList movies={moviesList} />}
      {!isLoading&&moviesList===0&& <p>sorry, found no movies</p>}
      {isLoading &&( <div>
        <img alt='loading' src={loopImg} />
       <p>Loding...</p></div>)};
      {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
