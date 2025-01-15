import React, { useState } from 'react';
import loginUser from '../services/loginUser';
import { account } from "../appwrite";
import "../styles/Login.css";
const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const session = await loginUser(email, password);
        if (session) {
            onLogin(session); // Üst bileşene oturum bilgisini ilet
        }
    };

    return (
<div className="auth-container">
            <h1>Giriş Yap</h1>
            <form className="auth-form" onSubmit={handleLogin}>
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
                <button type="submit">Giriş Yap</button>
            </form>
            {message && <p className="auth-message">{message}</p>}
        </div>
    );
};

export default Login;
