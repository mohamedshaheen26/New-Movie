import React, { useState } from "react";
import MovieCarousel from "./MovieCarousel";
import type { Movie } from "../types";
import { formatRuntime } from "../utils/formatRuntime";

interface HeroSectionProps {
  movie: Movie | null;
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
  selectedMovie: Movie | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  movie,
  movies,
  onMovieSelect,
  selectedMovie,
}) => {
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

  if (!movie) {
    return <div className='hero-section'>Loading movie details...</div>;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  const toggleOverview = () => {
    setIsOverviewExpanded(!isOverviewExpanded);
  };

  const truncatedOverview = movie.overview
    ? movie.overview.substring(0, 150) + "..."
    : "";

  const displayOverview = isOverviewExpanded
    ? movie.overview
    : truncatedOverview;

  return (
    <div
      className='hero-section'
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className='container'>
        <div className='overlay'></div>
        <div className='hero-content'>
          <h1>{movie.title || movie.name}</h1>
          <div className='movie-meta'>
            <span>
              <span className='bg-warning text-black p-2 fw-bolder rounded-2 me-2'>
                IMDb
              </span>
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
            <span>
              •{" "}
              {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
            </span>
            <span>| {formatRuntime(movie.runtime)}</span>
            <span>| {movie.genres?.[0] || "Unknown"}</span>
          </div>
          <p className='description'>
            {displayOverview}
            {movie.overview && movie.overview.length > 150 && (
              <button className='see-more-btn' onClick={toggleOverview}>
                {isOverviewExpanded ? "See less" : "See more"}
              </button>
            )}
          </p>
          <div className='hero-buttons'>
            <button className='watch-trailer-btn'>Watch trailer</button>
            <button className='watch-now-btn'>Watch now</button>
          </div>
        </div>
        <MovieCarousel
          movies={movies}
          onMovieSelect={onMovieSelect}
          selectedMovie={selectedMovie}
        />
      </div>
    </div>
  );
};

export default HeroSection;
