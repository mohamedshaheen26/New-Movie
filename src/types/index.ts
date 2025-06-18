export interface Movie {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  runtime?: number;
  poster_path?: string;
  genres?: string[];
}