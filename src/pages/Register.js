import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUser from '../services/registerUser';
import "../styles/Register.css";
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        registerUser(email, password, username);
        navigate('/login'); 
    };

    return (
        <div className="auth-container">
        <h1>Kayıt Ol</h1>
        <form className="auth-form" onSubmit={handleRegister}>
            <input
                type="text"
                placeholder="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="E-posta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Kayıt Ol</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
    </div>
    );
};

export default Register;
