import React, { useEffect, useState, useContext } from "react";
import VideoCard from "../VideoDetails/VideoCard";
import GenreSelector from "../Services/GenreSelector";
import { SearchContext } from "../Context/SearchContext";
import "../TvShows/VideosPage.css";

export default function MoviesPage() {
  const [allMovies, setAllMovies] = useState([]);
  const [movieQuery, setMovieQuery] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovieGenre, setSelectedMovieGenre] = useState("");
  const { searchIsOpen, handleClick, styles, isLoading, setIsLoading } =
    useContext(SearchContext);

  async function getGenreList(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.genres);
    return data.genres;
  }

  useEffect(() => {
    getGenreList(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=8d87d908f771e658d8db29f94c80440f",
    ).then((data) => {
      setMovieGenres(data);
    });
  }, []);

  async function getAllMovies(url, page = 1, genre = "") {
    if (genre) {
      url += `&with_genres=${genre}`;
    }
    url += `&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  }

  useEffect(() => {
    getAllMovies(
      "https://api.themoviedb.org/3/discover/movie?api_key=8d87d908f771e658d8db29f94c80440f",
    ).then((data) => {
      setAllMovies(data);
      setIsLoading(false);
    });
  }, []);

  const fetchMoreMovies = async () => {
    setIsLoading(true);
    try {
      const newMovies = await getAllMovies(
        "https://api.themoviedb.org/3/discover/movie?api_key=8d87d908f771e658d8db29f94c80440f",
        page + 1,
      );
      setPage((prevPage) => prevPage + 1);
      setAllMovies((prevMovies) => [...prevMovies, ...newMovies]);
    } catch (error) {
      console.error("Error fetching more movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

    const triggerThreshold = 80;

    if (scrollPercentage > triggerThreshold && !isLoading) {
      fetchMoreMovies();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  useEffect(() => {
    if (selectedMovieGenre) {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=8d87d908f771e658d8db29f94c80440f&with_genres=${selectedMovieGenre}`;
      getAllMovies(url, 1, selectedMovieGenre).then((data) => {
        setAllMovies(data);
        setIsLoading(false);
      });

      if (movieQuery.length > 0 && selectedMovieGenre) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=8d87d908f771e658d8db29f94c80440f&with_genres=${selectedMovieGenre}`;
        getAllMovies(url, 1, selectedMovieGenre).then((data) => {
          setMovieQuery(data);
          setIsLoading(false);
        });
      }
    }
  }, [selectedMovieGenre]);

  const movies = allMovies?.map((movie) => {
    <VideoCard
      image={movie.poster_path}
      movieTitle={movie.title}
      movieRelease={movie.release_date}
    />;
  });

  const handleSubmit = (e) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const onSearch = (searchTerm) => {
    const query = encodeURIComponent(searchTerm);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=8d87d908f771e658d8db29f94c80440f&query=${query}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieQuery(data.results);
        console.log(movieQuery);
      });
  };

  return (
    <div className="VideosPage">
      <div className="Hero-navSearch">
        <form style={styles} className="form" onSubmit={handleSubmit}>
          <input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            id="hero-input"
            placeholder="Search Here.."
            autoComplete="off"
          ></input>
          <button className="Hero-navSearchBtn" onClick={handleClick}>
            X
          </button>
        </form>
      </div>

      <div className="GenreSelector">
        <h1>Explore Movies</h1>

        <select
          className="videoGenre-selector"
          value={selectedMovieGenre}
          onChange={(e) => setSelectedMovieGenre(e.target.value)}
        >
          <option value="" disabled>
            Select genres
          </option>
          {movieGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="VideoCard-wrapper VideosDisplay">
        {(movieQuery && movieQuery.length > 0 ? movieQuery : allMovies).map(
          (movie) => (
            <VideoCard
              star={"../images/star.png"}
              type={`/movie/${movie.id}`}
              image={movie.poster_path}
              movieTitle={movie.title}
              movieRelease={movie.release_date}
              rating={movie.vote_average}
            />
          ),
        )}
      </div>
    </div>
  );
}
