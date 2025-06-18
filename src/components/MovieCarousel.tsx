import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "../types";

interface MovieCarouselProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
  selectedMovie: Movie | null;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  movies,
  onMovieSelect,
  selectedMovie,
}) => {
  const itemsPerView = 10;
  const middleIndex = Math.floor(itemsPerView / 2);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Center the selected movie in the carousel
  const centerSelectedMovie = (movie: Movie) => {
    const selectedIdx = movies.findIndex((m) => m.id === movie.id);
    let newIndex = selectedIdx - middleIndex;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > movies.length - itemsPerView)
      newIndex = Math.max(0, movies.length - itemsPerView);
    setCurrentIndex(newIndex);
  };

  // When selectedMovie changes, center it
  useEffect(() => {
    if (selectedMovie) {
      centerSelectedMovie(selectedMovie);
    }
  }, [selectedMovie, movies]);

  // Auto-select the first movie if none is selected
  useEffect(() => {
    if (movies.length > 0 && !selectedMovie) {
      const firstMovie = movies[0];
      if (firstMovie) {
        onMovieSelect(firstMovie);
      }
    }
  }, [movies, selectedMovie, onMovieSelect]);

  const handlePrevious = () => {
    if (!selectedMovie) return;
    const selectedIdx = movies.findIndex((m) => m.id === selectedMovie.id);
    const prevIdx = selectedIdx > 0 ? selectedIdx - 1 : movies.length - 1;
    const prevMovie = movies[prevIdx];
    if (prevMovie) {
      onMovieSelect(prevMovie);
    }
  };

  const handleNext = () => {
    if (!selectedMovie) return;
    const selectedIdx = movies.findIndex((m) => m.id === selectedMovie.id);
    const nextIdx = selectedIdx < movies.length - 1 ? selectedIdx + 1 : 0;
    const nextMovie = movies[nextIdx];
    if (nextMovie) {
      onMovieSelect(nextMovie);
    }
  };

  const visibleMovies = movies.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className='movie-carousel-container'>
      <div className='carousel-navigation'>
        <button className='nav-arrow' onClick={handlePrevious}>
          <i className='fas fa-chevron-left'></i>
        </button>
        <button className='nav-arrow' onClick={handleNext}>
          <i className='fas fa-chevron-right'></i>
        </button>
      </div>
      <div className='movie-carousel'>
        <div className='carousel-inner'>
          {visibleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isSelected={selectedMovie && selectedMovie.id === movie.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;
