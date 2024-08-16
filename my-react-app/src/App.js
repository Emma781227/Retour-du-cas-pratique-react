import React, { useState, useMemo } from 'react';
import './App.css';

// Import des images
// import inceptionImg from './images/inception.jpg';
// import godfatherImg from './images/godfather.jpg';
// import pulpFictionImg from './images/pulpfiction.jpg';

function App() {
  const initialMovies = [
    {
      title: 'Inception',
      category: 'Science Fiction',
      likes: 1500,
      dislikes: 300,
      liked: null,
      // image: inceptionImg,
    },
    {
      title: 'The Godfather',
      category: 'Drama',
      likes: 2000,
      dislikes: 100,
      liked: null,
      // image: godfatherImg,
    },
    {
      title: 'Pulp Fiction',
      category: 'Crime',
      likes: 1700,
      dislikes: 200,
      liked: null,
      // image: pulpFictionImg,
    },
    {
      title: 'Pulp Fiction',
      category: 'Crime',
      likes: 1700,
      dislikes: 200,
      liked: null,
      // image: pulpFictionImg,
    },
    {
      title: 'Pulp Fiction',
      category: 'Crime',
      likes: 1700,
      dislikes: 200,
      liked: null,
      // image: pulpFictionImg,
    },
    {
      title: 'Pulp Fiction',
      category: 'Crime',
      likes: 1700,
      dislikes: 200,
      liked: null,
      // image: pulpFictionImg,
    },
    {
      title: 'Pulp Fiction',
      category: 'Crime',
      likes: 1700,
      dislikes: 200,
      liked: null,
      // image: pulpFictionImg,
    },
    {
      title: 'Pulp Fiction',
      category: 'Crime',
      likes: 1700,
      dislikes: 200,
      liked: null,
      // image: pulpFictionImg,
    },
    {
      title: 'Pulp Fiction',
      category: 'Crime',
      likes: 1700,
      dislikes: 200,
      liked: null,
      // image: pulpFictionImg,
    },
    {
      title: 'Pulp Fiction',
      category: 'Crime',
      likes: 1700,
      dislikes: 200,
      liked: null,
      // image: pulpFictionImg,
    },
    {
      title: 'Pulp Fiction',
      category: 'Crime',
      likes: 1700,
      dislikes: 200,
      liked: null,
      // image: pulpFictionImg,
    },
    {
      title: 'Pulp Fiction',
      category: 'Crime',
      likes: 1700,
      dislikes: 200,
      liked: null,
      // image: pulpFictionImg,
    },
    
    // Ajoutez plus de films ici...
  ];

  const [movies, setMovies] = useState(initialMovies);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Extraire les catégories uniques
  const categories = useMemo(() => {
    const allCategories = movies.map(movie => movie.category);
    return [...new Set(allCategories)];
  }, [movies]);

  // Fonction de filtrage
  const filteredMovies = useMemo(() => {
    if (selectedCategories.length === 0) return movies;
    return movies.filter(movie => selectedCategories.includes(movie.category));
  }, [movies, selectedCategories]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const currentMovies = filteredMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (indexToDelete) => {
    const updatedMovies = movies.filter((_, index) => index !== indexToDelete);
    setMovies(updatedMovies);

    // Filtrer les catégories supprimées
    const newCategories = [...new Set(updatedMovies.map(movie => movie.category))];
    setSelectedCategories(prevCategories => prevCategories.filter(cat => newCategories.includes(cat)));

    // Adjust pagination if needed
    if (currentMovies.length === 1 && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const toggleLikeDislike = (index) => {
    setMovies(movies.map((movie, i) => {
      if (i === index) {
        if (movie.liked === null) {
          return { ...movie, liked: true, likes: movie.likes + 1 };
        } else if (movie.liked === true) {
          return { ...movie, liked: false, likes: movie.likes - 1, dislikes: movie.dislikes + 1 };
        } else {
          return { ...movie, liked: null, dislikes: movie.dislikes - 1 };
        }
      }
      return movie;
    }));
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories(prev => checked ? [...prev, value] : prev.filter(cat => cat !== value));
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to page 1 after changing items per page
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="app">
      <div className="filter">
        <h3>Filter by Category</h3>
        {categories.map(category => (
          <div key={category}>
            <label>
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
              />
              {category}
            </label>
          </div>
        ))}
      </div>

    

      <div className="movie-container">
        {currentMovies.map((movie, index) => (
          <div key={index} className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-category">{movie.category}</p>
            <div className="gauge">
              <div
                className="gauge-bar"
                style={{ width: `${(movie.likes / (movie.likes + movie.dislikes)) * 100}%` }}
              ></div>
            </div>
            <p>{movie.likes} Likes / {movie.dislikes} Dislikes</p>
            <button className="like-button" onClick={() => toggleLikeDislike(index)}>
              {movie.liked === null ? "Like" : movie.liked ? "Dislike" : "Like"}
            </button>
            <button className="delete-button" onClick={() => handleDelete(index)}>Supprimer</button>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        {/* <label>
          Items per page:
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
        </label> */}
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Précédent
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
}

export default App;
