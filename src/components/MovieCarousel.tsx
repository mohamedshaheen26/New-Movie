import { useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 10;

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, movies.length - itemsPerView)
        : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= movies.length - itemsPerView ? 0 : prevIndex + 1
    );
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
              onClick={onMovieSelect}
              isSelected={selectedMovie && selectedMovie.id === movie.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;
