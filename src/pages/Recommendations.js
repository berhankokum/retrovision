import React, { useState } from 'react';
import MovieList from '../components/MovieList'; // Film listesi bileşeni
//import MoodSelector from '../components/MoodSelector'; // Mood seçici bileşeni
import { useNavigate } from 'react-router-dom';
import '../styles/Recommendations.css';
const Recommendations = () => {
    const [selectedMood, setSelectedMood] = useState(''); // Kullanıcı ruh halini saklar
    const [movies, setMovies] = useState([]); // Önerilen filmleri saklar
    const [loading, setLoading] = useState(false); // Yüklenme durumu

    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY; // TMDB API anahtarınız

    // Ruh haline göre film türü eşleştirme
    const getGenreByMood = (mood) => {
        switch (mood) {
            case 'mutlu':
                return 35; // Komedi
            case 'üzgün':
                return 18; // Drama
            case 'heyecanlı':
                return 28; // Aksiyon
            case 'romantik':
                return 10749; // Romantik
            case 'korkmuş':
                return 27; // Korku
            case 'macera':
                return 12; // Macera
            default:
                return null;
        }
    };

    // TMDB API'den filmleri çek
    const fetchMovies = async (genreId) => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
            );
            const data = await response.json();
            setMovies(data.results.slice(0, 4)); // İlk 4 filmi al
            setLoading(false);
        } catch (error) {
            console.error('Filmler alınırken bir hata oluştu:', error);
            setMovies([]);
            setLoading(false);
        }
    };

    // Kullanıcı bir ruh hali seçtiğinde tetiklenir
    const handleMoodSelect = (mood) => {
        setSelectedMood(mood); // Ruh halini sakla
        const genreId = getGenreByMood(mood); // Ruh haline uygun tür ID'si
        if (genreId) {
            fetchMovies(genreId); // Filmleri al
        }
    };

    return (
        <div className="recommendations-container">
            <h1>Film Önerileri</h1>
            <p>Ruh halinizi seçin ve size uygun filmleri önerelim!</p>
            <div className="mood-buttons">
                {['mutlu', 'üzgün', 'heyecanlı', 'romantik', 'korkmuş', 'macera'].map((mood) => (
                    <button
                        key={mood}
                        onClick={() => handleMoodSelect(mood)}
                        className={selectedMood === mood ? 'selected' : ''}
                    >
                        {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </button>
                ))}
            </div>

            {loading ? (
                <p>Yükleniyor...</p>
            ) : movies.length > 0 ? (
                <div className="movies-list">
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h3>{movie.title}</h3>
                            <p>Ortalama Puan: {movie.vote_average}</p>
                        </div>
                    ))}
                </div>
            ) : (
                selectedMood && <p>Bu ruh haline uygun film bulunamadı.</p>
            )}
        </div>
    );
};

export default Recommendations;

