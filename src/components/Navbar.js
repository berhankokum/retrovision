import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { account } from '../appwrite';
const Navbar = ({ user, onLogout }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown görünürlüğü
    const navigate = useNavigate();

const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        localStorage.removeItem("user"); // LocalStorage'daki kullanıcı verisini temizle
        window.location.reload(); // Sayfayı yeniden yükle (isteğe bağlı)
    } catch (error) {
        console.error('Çıkış hatası:', error);
        alert(`Çıkış sırasında bir hata oluştu: ${error.message}`);
    }
};

    return (
        <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate("/")}>
            RetroVision
        </div>
        <ul className="navbar-links">
            <li onClick={() => navigate("/")}>Anasayfa</li>
            <li onClick={() => navigate("/movies")}>Filmler</li>
            <li onClick={() => navigate("/daily-movies")}>Günün Filmleri</li>
            <li onClick={() => navigate("/recommendations")}>Film Önerileri</li>

            {!user ? (
                <>
                    <li onClick={() => navigate("/login")}>Giriş Yap</li>
                    <li onClick={() => navigate("/register")}>Kayıt Ol</li>
                </>
            ) : (
                <div className="navbar-user">
                    <img
                        src="/assets/user.png" // Kullanıcı simgesi
                        alt="Kullanıcı"
                        className="user-icon"
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                    />
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <p onClick={() => navigate("/favorites")}>Favorilerim</p>
                            <p onClick={logoutUser}>Çıkış Yap</p>
                        </div>
                    )}
                </div>
            )}
        </ul>
    </nav>
    );
};

export default Navbar;
