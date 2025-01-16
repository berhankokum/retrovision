import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account, databases } from "../appwrite"; 
import "../styles/Favorites.css";
import {  Query } from "appwrite";
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {    
      try {
        const session = await account.get();
        const userId = session.$id;

        const response = await databases.listDocuments(
          "6786af350005fff9f376", 
          "677e8663003123c5abbf", 
          [Query.equal("user_id", userId)]
        );

        const favoriteMovies = await Promise.all(
          response.documents.map(async (favorite) => {
            const movieResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${favorite.movie_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
            );
            return await movieResponse.json();
          })
        );

        setFavorites(favoriteMovies);
      } catch (error) {
        console.error("Favoriler alınırken hata:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites">
      <h1>Favorilerim</h1>
      <div className="favorites-list">
        {favorites.map((movie) => (
          <div
            key={movie.id}
            className="favorite-item"
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
