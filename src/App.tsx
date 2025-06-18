import { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.tsx";
import HeroSection from "./components/HeroSection.tsx";
import axios from "axios";
import type { Movie } from "./types/index.ts";

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[] | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [_genres, setGenres] = useState<{ [id: number]: string }>({});
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = "https://api.themoviedb.org/3";
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        if (!apiKey) throw new Error("TMDB API key not found.");

        const genreRes = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );

        const genreMap: { [id: number]: string } = {};
        genreRes.data.genres.forEach((g: any) => {
          genreMap[g.id] = g.name;
        });

        setGenres(genreMap);

        const trendingResponse = await axios.get(
          `${baseUrl}/trending/movie/week?api_key=${apiKey}`
        );
        const baseMovies = trendingResponse.data.results;

        const moviesWithDetails: Movie[] = await Promise.all(
          baseMovies.map(async (movie: any) => {
            const detailRes = await axios.get(
              `${baseUrl}/movie/${movie.id}?api_key=${apiKey}`
            );
            return {
              ...movie,
              runtime: detailRes.data.runtime,
              genres: movie.genre_ids.map((id: number) => genreMap[id]),
            };
          })
        );

        setTrendingMovies(moviesWithDetails);
        if (moviesWithDetails.length > 0) {
          setSelectedMovie(moviesWithDetails[0] ?? null);
        }
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching trending movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  if (loading) {
    return (
      <div className='loader-container'>
        <div className='loader'>Loading</div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <BrowserRouter>
      <Header />
      <HeroSection
        movie={selectedMovie}
        movies={trendingMovies || []}
        onMovieSelect={handleMovieSelect}
        selectedMovie={selectedMovie}
      />
    </BrowserRouter>
  );
};

export default App;
