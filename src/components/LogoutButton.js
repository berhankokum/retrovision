import React from 'react';
import logoutUser from '../services/logoutUser';

const LogoutButton = () => {
    const handleLogout = () => {
        logoutUser();
    };

    return <button onClick={handleLogout}>Çıkış Yap</button>;
};

export default LogoutButton;
