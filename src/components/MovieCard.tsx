import React from "react";
import type { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  isSelected: boolean | null;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isSelected }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  return (
    <div className={`movie-card ${isSelected ? "selected" : ""}`}>
      <img src={posterUrl} alt={movie.title || movie.name} />
      <div className='movie-card-overlay'></div>
    </div>
  );
};

export default MovieCard;
