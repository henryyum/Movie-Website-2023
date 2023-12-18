import { useState, useEffect } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Tabs from "../Tabs";
import VideoCard from "./VideoCard";

const fetchMovies = async (section, queryType, query = "") => {
  const baseUrl = "https://api.themoviedb.org/3";
  let url;
  const apiKey = "8d87d908f771e658d8db29f94c80440f";

  switch (section) {
    case "trending":
      url = `${baseUrl}/trending/all/${queryType}?api_key=${apiKey}`;
      break;
    case "search":
      url = `${baseUrl}/search/${queryType}?api_key=${apiKey}&query=${encodeURIComponent(
        query,
      )}`;
      break;
    default:
      url = `${baseUrl}/${queryType}/${section}?api_key=${apiKey}`;

      break;
  }
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies;", error);
  }
};

export default function VideoSection({
  section,
  queryTypes,
  sectionTitle,
  query,
}) {
  const [queryType, setQueryType] = useState(queryTypes[0].type);
  const [movies, setMovies] = useState([]);
  const [slidesPerView, setslidesPerView] = useState(6);

  const getButtonStyles = (buttonTitle) => ({
    backgroundColor: queryType === buttonTitle ? "darkorange" : "white",
    color: queryType === buttonTitle ? "white" : "black",
  });

  useEffect(() => {
    fetchMovies(section, queryType, query).then((data) => {
      console.log(data);
      setMovies(data);
    });
  }, [queryType, query]);

  const updateSlidesPerView = () => {
    if (window.matchMedia("(max-width: 550px)").matches) {
      setslidesPerView(2);
    } else if (window.matchMedia("(max-width: 800px)").matches) {
      setslidesPerView(3);
    } else if (window.matchMedia("(max-width: 1000px)").matches) {
      setslidesPerView(4);
    } else if (window.matchMedia("(max-width: 1200px)").matches) {
      setslidesPerView(5);
    } else {
      setslidesPerView(6);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  return (
    <div>
      <div className="Tabs-wrapper">
        <div>
          <h3>{sectionTitle}</h3>
        </div>
        <Tabs
          handleTabLeft={() => setQueryType(queryTypes[0].type)}
          handleTabRight={() => setQueryType(queryTypes[1].type)}
          TabStyleLeft={getButtonStyles(queryTypes[0].type)}
          TabStyleRight={getButtonStyles(queryTypes[1].type)}
          TabTitleLeft={queryTypes[0].label}
          TabTitleRight={queryTypes[1].label}
        />
      </div>
      <Swiper
        spaceBetween={25}
        slidesPerView={slidesPerView}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 8000 }}
        navigation
      >
        <div className="VideoCard-wrapper">
          {movies?.map((movie) => (
            <SwiperSlide>
              <VideoCard
                star={"./images/star.png"}
                type={`/${movie.media_type ?? queryType}/${movie.id}`}
                key={movie.id}
                image={movie.poster_path}
                movieTitle={movie.title ? movie.title : movie.name}
                movieRelease={
                  movie.release_date ? movie.release_date : movie.first_air_date
                }
                rating={movie.vote_average}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
