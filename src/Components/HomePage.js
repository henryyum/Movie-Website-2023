import React, { useState, useEffect, useCallback, useContext } from "react";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import Footer from "./Footer/Footer";
import Tabs from "./Tabs";
import VideoCard from "./VideoDetails/VideoCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { SearchContext } from "./Context/SearchContext";
import { Link } from "react-router-dom";
import VideoSection from "./VideoDetails/VideoSection";
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const hasSearched = localStorage.getItem("hasSearched") === "true";
    const storedQuery = localStorage.getItem("query");

    if (hasSearched && storedQuery) {
      setSearchQuery(storedQuery);
    }
  }, []);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=8d87d908f771e658d8db29f94c80440f",
        );
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const backdropPath = data.results[randomIndex].backdrop_path;
        const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
        setBackgroundImage(imageUrl);
      } catch (error) {
        console.error("Error fetching the background image.", error);
      }
    };

    fetchBackgroundImage();
  }, []);

  return (
    <div className="App">
      <div className="header-wrapper"></div>

      <div>
        <Hero
          image={backgroundImage}
          submit1={async (navQuery) => {
            setSearchQuery(navQuery);
          }}
          submit2={async (query) => {
            setSearchQuery(query);
          }}
        />
      </div>

      <div className="section-wrapper">
        <div className="main-wrapper">
          {searchQuery && (
            <VideoSection
              section="search"
              sectionTitle="Search Results"
              queryTypes={[
                { label: "Movie", type: "movie" },
                { label: "TV", type: "tv" },
              ]}
              query={searchQuery}
            />
          )}
        </div>

        <VideoSection
          section="trending"
          sectionTitle="Trending"
          queryTypes={[
            { label: "Day", type: "day" },
            { label: "Week", type: "week" },
          ]}
        />
        <VideoSection
          section="popular"
          sectionTitle="Popular"
          queryTypes={[
            { label: "Movie", type: "movie" },
            { label: "TV", type: "tv" },
          ]}
        />
        <VideoSection
          section="top_rated"
          sectionTitle="Top Rated"
          queryTypes={[
            { label: "Movie", type: "movie" },
            { label: "TV", type: "tv" },
          ]}
        />
      </div>
    </div>
  );
}
