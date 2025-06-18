import React from "react";
import type { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isSelected: boolean | null;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  isSelected,
}) => {
  const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  return (
    <div
      className={`movie-card ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(movie)}
    >
      <img src={posterUrl} alt={movie.title || movie.name} />
    </div>
  );
};

export default MovieCard;
