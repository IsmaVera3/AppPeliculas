import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiKey = '72a1f42b'; // Tu clave de API de OMDB

  const handleSearch = async () => {
    if (query.trim() === '') return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (error) {
      console.error(error);
      setMovies([]);
      setError('Error al buscar películas');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar Película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="movies-list">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <img src={movie.Poster} alt={`${movie.Title} Poster`} />
            </div>
              
          ))
        ) : (
          <p>No se encontraron películas.</p>
        )}
      </div>
    </div>
  );
}

export default App;
