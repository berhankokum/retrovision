import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { account, databases, users } from "../appwrite";
import "../styles/MovieDetail.css";
import { Query, Permission, Role } from "appwrite";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const [movieRating, setMovieRating] = useState({ average: 0, count: 0 });
  const [isAdmin, setIsAdmin] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const commentsPerPage = 5; 
  
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

useEffect(() => {
  const fetchUser = async () => {
    try {
      const session = await account.get();
      setUser(session);

      
      const response = await databases.listDocuments(
        "6786af350005fff9f376",
        "678796df0025d777ad05", 
        [Query.equal("user_id", session.$id)]
      );

      setIsAdmin(response.documents.length > 0);
    } catch (error) {
      console.error("Kullanıcı bilgileri alınırken hata:", error);
    }
  };
  fetchUser();
}, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Film detayları alınırken hata:", error);
      }
    };

      
    const fetchComments = async () => {
        try {
          const response = await databases.listDocuments(
            "6786af350005fff9f376",
            "6786cd6f0015c093ae57",
            [
              Query.equal("movie_id", Number(id)),
              Query.limit(commentsPerPage), 
              Query.offset((currentPage - 1) * commentsPerPage), 
            ]
          );
  
          const totalCommentsResponse = await databases.listDocuments(
            "6786af350005fff9f376",
            "6786cd6f0015c093ae57",
            [Query.equal("movie_id", Number(id))]
          );
  
          setComments(response.documents);
          setTotalPages(Math.ceil(totalCommentsResponse.documents.length / commentsPerPage));
        } catch (error) {
          console.error("Yorumlar alınırken hata:", error);
        }
      };
      
      
      

    const fetchFavorite = async () => {
      if (user) {
        try {
          const response = await databases.listDocuments(
            "6786af350005fff9f376",
            "6786ce93000db270abd3",
            [
              Query.equal("user_id", user.$id),
              Query.equal("movie_id", Number(id)),
            ]
          );
          setIsFavorite(response.documents.length > 0);
        } catch (error) {
          console.error("Favori kontrolü yapılırken hata:", error);
        }
      }
    };

    fetchMovieDetails();
    fetchComments();
    fetchFavorite();
  }, [id, user, currentPage]);

  
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await databases.createDocument("6786af350005fff9f376", "6786cd6f0015c093ae57", "unique()", {
        user_id: user.$id,
        user_name: user.name,
        movie_id: Number(id),
        comment: newComment,
      });
      setComments([...comments, { userName: user.name || user.email, movie_id: id, comment: newComment }]);
      setNewComment("");
    } catch (error) {
      console.error("Yorum eklenirken hata:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) {
      alert("Yorumu silmek için giriş yapmalısınız.");
      return;
    }
  
    try {
      
      const hasDeletePermission = user.roles?.includes("admin") || comments.some(comment => comment.user_id === user.$id);
  
      if (hasDeletePermission) {
        await databases.deleteDocument(
          "6786af350005fff9f376", 
          "6786cd6f0015c093ae57", 
          commentId
        );
        setComments(comments.filter((comment) => comment.$id !== commentId));
        alert("Yorum başarıyla silindi!");
      } else {
        alert("Bu yorumu silme yetkiniz yok.");
      }
    } catch (error) {
      console.error("Yorum silinirken hata:", error);
    }
  };
  
  const handleBlockUser = async (userId) => {
    try {
      // Kullanıcının admin olup olmadığını kontrol et
      const adminCheckResponse = await databases.listDocuments(
        "6786af350005fff9f376", // Veritabanı ID'si
        "678796df0025d777ad05", // Admin collection ID
        [Query.equal("user_id", user.$id)] // Giriş yapan kullanıcının ID'si
      );
      
      if (adminCheckResponse.documents.length === 0) {
        alert("Bu işlemi gerçekleştirme yetkiniz yok.");
        return;
      }
  
      // Kullanıcı admin ise bloklama işlemini gerçekleştir
      await users.updateStatus(userId, false); // Kullanıcıyı blokla (false: bloklu)
      alert("Kullanıcı başarıyla bloklandı!");
    } catch (error) {
      console.error("Kullanıcı bloklanırken hata:", error);
      alert("Kullanıcı bloklanamadı.");
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await databases.listDocuments(
        "6786af350005fff9f376",
        "6786cf160024bc208fcb",
        [Query.equal("movie_id", Number(id))]
      );

      if (response.documents.length > 0) {
        const totalRatings = response.documents.reduce((sum, doc) => sum + doc.rate, 0);
        const averageRating = (totalRatings / response.documents.length).toFixed(1);
        setMovieRating({ average: averageRating, count: response.documents.length });
      } else {
        setMovieRating({ average: "N/A", count: 0 });
      }
    } catch (error) {
      console.error("Puanlar alınırken hata:", error);
    }
  };
  fetchRatings();
  const handleRateMovie = async () => {
    if (rating < 1 || rating > 10) return;
  
    try {
      // Daha önce puan verilip verilmediğini kontrol et
      const response = await databases.listDocuments(
        "6786af350005fff9f376", 
        "6786cf160024bc208fcb", 
        [
          Query.equal("user_id", user.$id),
          Query.equal("movie_id", Number(id)),
        ]
      );
  
      if (response.documents.length > 0) {
        alert("Bu filme daha önce puan verdiniz!");
        return; 
      }
  
      
      await databases.createDocument("6786af350005fff9f376", "6786cf160024bc208fcb", "unique()", {
        user_id: user.$id,
        movie_id: Number(id),
        rate: Number(rating),
      });
  
      alert("Puanlama başarılı!");
    } catch (error) {
      console.error("Puanlama yapılırken hata:", error);
    }
  };


  
  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        const response = await databases.listDocuments(
          "6786af350005fff9f376",
          "6786ce93000db270abd3",
          [
            Query.equal("user_id", user.$id),
            Query.equal("movie_id", Number(id)),
          ]
        );
        if (response.documents.length > 0) {
          await databases.deleteDocument("6786af350005fff9f376", "6786ce93000db270abd3", response.documents[0].$id);
          setIsFavorite(false);
        }
      } else {
        await databases.createDocument("6786af350005fff9f376", "6786ce93000db270abd3", "unique()", {
          user_id: user.$id,
          movie_id: Number(id),
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Favori işlemi sırasında hata:", error);
    }
  };
  
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="movie-detail">
      {movie && (
        <>
          <div className="movie-header">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div className="movie-info">
              <h1>{movie.title}</h1>
              <p><strong>Tür:</strong> {movie.genres?.map((g) => g.name).join(", ") || "Bilinmiyor"}</p>
              <p><strong>Yıl:</strong> {movie.release_date}</p>
              <p><strong>IMDB:</strong> {movie.vote_average}</p>
              <p>
                <strong>Ortalama Puan:</strong> {movieRating.average}
                <span> ({movieRating.count} kişi oyladı)</span>
              </p>
            </div>
          </div>

          {user ? (
            <>
              <div className="user-actions">
                <button onClick={handleToggleFavorite}>
                  {isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                </button>
                <div className="rate-section">
                  <span>Puan Ver:</span>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <button onClick={handleRateMovie}>Gönder</button>
                </div>
              </div>
              <div className="comment-section">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Yorum yazın..."
                />
                <button onClick={handleAddComment}>Yorum Yap</button>
              </div>
            </>
          ) : (
            <p>Yorum yapmak için giriş yapmalısınız.</p>
          )}

<div className="comments">
  <h2>Yorumlar</h2>
  {comments.map((comment, index) => (
    <div key={index} className="comment-item">
      <p>
        <strong>{comment.user_name}:</strong> {comment.comment}
      </p>
      {user && (
        <button
          className="block-button"
          onClick={() => handleBlockUser(comment.user_id)}
        >
          Kullanıcıyı Blokla
        </button>
      )}
      {/* Yalnızca giriş yapan kullanıcılar için buton */}
      {user && (
        <button
        className="delete-button"
        onClick={() => handleDeleteComment(comment.$id)}
        >
          Sil
        </button>
      )}
    </div>))}
    <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Önceki
              </button>
              <span>
                Sayfa {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Sonraki
              </button>
            </div>
</div>


    </>
      )}
    </div>
  );
};

export default MovieDetail;
