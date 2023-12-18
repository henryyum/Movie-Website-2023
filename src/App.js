import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage";
import MoviesPage from "./Components/Movies/MoviesPage";
import TVShowsPage from "./Components/TvShows/TVShowsPage";
import { SearchProvider } from "./Components/Context/SearchContext";
import MovieDetails from "./Components/VideoDetails/MovieDetails";
import TVShowDetails from "./Components/VideoDetails/TVShowDetails";

export default function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="movie" element={<MoviesPage />} />
            <Route
              path="movie/:id"
              element={<MovieDetails videoType="movie" />}
            />
            <Route path="tv" element={<TVShowsPage />} />
            <Route path="tv/:id" element={<TVShowDetails videoType="tv" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}
