import React from 'react';
import '../styles/Home.css';

const Home = ({ user }) => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Film ve Dizi Öneri Platformuna Hoş Geldiniz</h1>
                <p>
                    Ruh halinize ve hava durumuna göre filmler keşfedin. Binlerce film
                    arasından size özel öneriler alın!
                </p>
                <div className="hero-buttons">
                    <button onClick={() => (window.location.href = '/movies')}>Filmleri Keşfet</button>
                    <button onClick={() => (window.location.href = '/recommendations')}>
                        Ruh Haline Göre Film Önerisi
                    </button>
                </div>
            </div>
            <div className="features-section">
                <h2>Öne Çıkan Özellikler</h2>
                <div className="features">
                    <div className="feature">
                        <img src="/assets/cloud.png" alt="Hava Durumuna Göre Öneriler" />
                        <h3>Hava Durumuna Göre Öneriler</h3>
                        <p>Günlük hava durumuna uygun film önerileri alın.</p>
                    </div>
                    <div className="feature">
                        <img src="/assets/happy-face.png" alt="Ruh Haline Göre Öneriler" />
                        <h3>Ruh Haline Göre Öneriler</h3>
                        <p>Mutlu, üzgün veya heyecanlı hissediyorsanız doğru filmi bulun.</p>
                    </div>
                    <div className="feature">
                        <img src="/assets/pen.png" alt="Yorum ve Puanlama" />
                        <h3>Yorum ve Puanlama</h3>
                        <p>Filmler hakkında yorum yapın ve diğer kullanıcıların yorumlarını okuyun.</p>
                    </div>
                </div>
            </div>
            <div className="cta-section">
                <h2>Sinemanın Tadını Çıkarın</h2>
                <p>
                    Film ve dizi dünyasına adım atın, keşfedin ve eğlenin. Şimdi kayıt olun ve
                    favori filmlerinizi bulun!
                </p>
                {!user && ( // Eğer kullanıcı giriş yapmamışsa butonu göster
                    <button onClick={() => (window.location.href = '/register')}>Şimdi Kayıt Ol</button>
                )}
            </div>
        </div>
    );
};

export default Home;
