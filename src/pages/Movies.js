import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Movies.css';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState(''); 
    const [sort, setSort] = useState('popularity.desc');
    const [page, setPage] = useState(1); 
   const navigate = useNavigate(); 

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY; 
    const BASE_URL = 'https://api.themoviedb.org/3';

    
    const fetchMovies = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sort}&page=${page}`
            );
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error('Filmler alınırken bir hata oluştu:', error);
        }
    };

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`); 
    };

    useEffect(() => {
        fetchMovies();
    }, [sort, page]); 

 
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="movies-container">
            <h1>Filmler</h1>
            <div className="filter-sort">
                <input
                    type="text"
                    placeholder="Film adıyla ara..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <select onChange={(e) => setSort(e.target.value)}>
                    <option value="popularity.desc">Popülerlik (Azalan)</option>
                    <option value="popularity.asc">Popülerlik (Artan)</option>
                    <option value="release_date.desc">Çıkış Tarihi (Yeni)</option>
                    <option value="release_date.asc">Çıkış Tarihi (Eski)</option>
                    <option value="vote_average.desc">Puan (Yüksek)</option>
                    <option value="vote_average.asc">Puan (Düşük)</option>
                </select>
            </div>
            <div className="movies-list">
                {filteredMovies.map((movie) => (
                    <div 
                        key={movie.id} 
                        className="movie-card"
                        onClick={() => handleMovieClick(movie.id)}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h3>{movie.title}</h3>
                        <p>IMDB: {movie.vote_average}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Önceki
                </button>
                <span>Sayfa: {page}</span>
                <button onClick={() => setPage((prev) => prev + 1)}>Sonraki</button>
            </div>
        </div>
    );
};

export default Movies;