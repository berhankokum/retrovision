import React, { useState, useEffect } from 'react';
import '../styles/DailyMovies.css';

const DailyMovies = () => {
    const [city, setCity] = useState('Istanbul'); 
    const [weather, setWeather] = useState(null); 
    const [movies, setMovies] = useState([]); 
    const [loading, setLoading] = useState(false); 

    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY; 
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 

    // Hava durumuna göre film türü eşleştirme
    const getGenreByWeather = (weatherDescription) => {
        if (weatherDescription.includes('clear')) return [35, 12]; // Güneşli: Komedi, Macera
        if (weatherDescription.includes('rain')) return [18, 10749]; // Yağmurlu: Drama, Romantik
        if (weatherDescription.includes('clouds')) return [9648, 53]; // Bulutlu: Gizem, Gerilim
        if (weatherDescription.includes('snow')) return [10751, 14]; // Karlı: Aile, Fantastik
        return [28]; 
    };

    
    const fetchWeather = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
            );
            const data = await response.json();
            setWeather(data);
            console.log(data);
            return data.weather[0].description; 
        } catch (error) {
            console.error('Hava durumu alınırken bir hata oluştu:', error);
            setWeather(null);
        }
    };

    
    const fetchMovies = async (genres) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genres.join(
                    ','
                )}&sort_by=popularity.desc`
            );
            const data = await response.json();
            setMovies(data.results.slice(0, 5)); 
        } catch (error) {
            console.error('Filmler alınırken bir hata oluştu:', error);
            setMovies([]);
        }
    };

   
    useEffect(() => {
        const fetchData = async () => {
            if (!city) return;
            setLoading(true);
            const weatherDescription = await fetchWeather(); 
            if (weatherDescription) {
                const genres = getGenreByWeather(weatherDescription); 
                await fetchMovies(genres); 
            }
            setLoading(false);
        };

        fetchData();
    }, [city]); 

    return (
        <div className="daily-movies-container">
            <h1>Günün Filmleri</h1>
            <div className="city-selection">
                <label htmlFor="city">Şehir Seçin:</label>
                <input
                    type="text"
                    id="city"
                    placeholder="Şehir adı girin..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            {loading ? (
                <p>Yükleniyor...</p>
            ) : weather ? (
                <>
                    <div className="weather-info">
                        <h2>Hava Durumu: {weather.weather[0].description}</h2>
                        <p>Sıcaklık: {weather.main.temp}°C</p>
                        <p>Şehir: {weather.name}</p>
                    </div>
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
                </>
            ) : (
                <p>Hava durumu bilgisi alınamadı. Lütfen geçerli bir şehir adı girin.</p>
            )}
        </div>
    );
};

export default DailyMovies;