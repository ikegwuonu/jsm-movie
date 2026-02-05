const url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTA2ZDRjN2I3MTBkMDU5N2IyMTAzNGZlNzcxN2ZjZiIsIm5iZiI6MTc0NzEyOTgyMC4wMjcsInN1YiI6IjY4MjMxNWRjNTgzNGFlNThmNDVhMzFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhcIP7TN-mOL8VJtxF87geyy7MdwmDOiDgSZdVatbhY",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error(err));

export const TMDB_CONFIG = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: process.env.EXPO_PUBLIC_TMDB_READ_ACCESS,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_READ_ACCESS}`,
  },
  imageBaseUrl: "https://image.tmdb.org/t/p/w500",
};
export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : `/discover/movie?sort_by=popularity.desc`;
  const res = await fetch(TMDB_CONFIG.baseUrl + endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.statusText}`);
  }
  const data = await res.json();
  return data.results;
};

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  try {
    const res = await fetch(`${TMDB_CONFIG.baseUrl}/movie/${id}`, {
      headers: TMDB_CONFIG.headers,
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch movie details: ${res.statusText}`);
    }
    const data = await res.json();
    return data as MovieDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
