import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import DailyMovies from './pages/DailyMovies';
import Recommendations from './pages/Recommendations';
import Register from './pages/Register';
import Login from './pages/Login';
import LogoutButton from './components/LogoutButton';
//import Account from './pages/Account';
import Favorites from './pages/Favorites';
import MovieDetail from './components/MovieDetails';
import logoutUser from './services/logoutUser';
//import AdminPanel from './pages/AdminPanel';
const App = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Kullanıcıyı state'e ata
        }
    }, []);

    const handleLogin = (userData, rememberMe) => {
        setUser(userData);
        // Eğer 'rememberMe' seçeneği işaretlenmişse, bilgileri localStorage'a kaydet
        if (rememberMe) {
            localStorage.setItem("user", JSON.stringify(userData));
        }
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
