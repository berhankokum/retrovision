import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import DailyMovies from './pages/DailyMovies';
import Recommendations from './pages/Recommendations';
import Register from './pages/Register';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import MovieDetail from './components/MovieDetails';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Kullanıcı bilgisini sakla
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user"); // Kullanıcı bilgisini temizle
    };

    return (
        <Router>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home user={user} />} />   
                <Route path="/movies" element={<Movies />} />
                <Route path="/daily-movies" element={<DailyMovies />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/movie/:id" element={<MovieDetail user={user} />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </Router>
    );
};

export default App;
