import React from 'react';
import '../styles/MovieList.css'; // Stil dosyası

const MovieList = ({ movies, onMovieClick }) => {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <div key={movie.id} className="movie-item" onClick={() => onMovieClick(movie.id)}>
                    <h3>{movie.title}</h3>
                    <p>Puan: {movie.rating}</p>
                </div>
            ))}
        </div>
    );
};

export default MovieList;