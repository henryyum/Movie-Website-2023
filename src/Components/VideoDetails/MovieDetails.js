import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./VideoDetails.css";
import CastCard from "./CastCard";
import VideoCard from "./VideoCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import VideoModal from "./VideoModal";

export default function MovieDetails({ videoType }) {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [video, setVideo] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [VideoSlidesPerView, setVideoSlidesPerView] = useState([3]);
  const [CastSlidesPerView, setCastSlidesPerView] = useState([8]);
  const [SimilarSlidesPerView, setSimilarSlidesPerView] = useState([6]);

  const {
    title,
    tagline,
    genres,
    backdrop_path,
    poster_path,
    vote_average,
    status,
    overview,
    release_date,
    runtime,
  } = movie;

  const updateSlidesPerView = () => {
    if (window.matchMedia("(max-width: 550px ").matches) {
      setCastSlidesPerView(3);
      setSimilarSlidesPerView(2);
    } else if (window.matchMedia("(max-width: 800px)").matches) {
      setVideoSlidesPerView(1);
      setCastSlidesPerView(4);
      setSimilarSlidesPerView(3);
    } else if (window.matchMedia("(max-width: 1000px)").matches) {
      setVideoSlidesPerView(2);
      setCastSlidesPerView(6);
      setSimilarSlidesPerView(4);
    } else if (window.matchMedia("(max-width: 1200px)").matches) {
      setVideoSlidesPerView(3);
      setCastSlidesPerView(8);
      setSimilarSlidesPerView(6);
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${videoType}/${id}?api_key=8d87d908f771e658d8db29f94c80440f`,
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);

        const videoRes = await fetch(
          `https://api.themoviedb.org/3/${videoType}/${id}/videos?api_key=8d87d908f771e658d8db29f94c80440f`,
        );
        const videoData = await videoRes.json();
        console.log(videoData);
        setVideo(videoData.results);

        const castRes = await fetch(
          `https://api.themoviedb.org/3/${videoType}/${id}/credits?api_key=8d87d908f771e658d8db29f94c80440f`,
        );
        const castData = await castRes.json();
        console.log(castData);
        setCast(castData.cast);

        const crewRes = await fetch(
          `https://api.themoviedb.org/3/${videoType}/${id}/credits?api_key=8d87d908f771e658d8db29f94c80440f`,
        );
        const crewData = await crewRes.json();
        console.log(crewData);
        setCrew(crewData.crew);

        const similarRes = await fetch(
          `https://api.themoviedb.org/3/${videoType}/${id}/similar?api_key=8d87d908f771e658d8db29f94c80440f`,
        );
        const similarData = await similarRes.json();
        console.log(similarData);
        setSimilar(similarData.results);
      } catch (error) {
        console.error("error fetching details has occured", error);
      }
    };
    fetchMovies();
  }, [id]);

  const backgroundImageStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
  };

  const trailer = video.find((trailer) =>
    trailer.name.toLowerCase().includes("trailer"),
  );

  return (
    <div className="video-details" style={backgroundImageStyle}>
      <div>
        <main className="video-details-wrapper">
          <img
            className="video-details-img"
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt=""
          />

          <div className="video-details-main">
            <div className="video-details-title">
              <h1 className="video-details-colorWhite font-weight-500">
                {title || movie.name}{" "}
                <span className="font-size-sm font-weight-400">
                  (
                  {(release_date && release_date.substring(0, 4)) ||
                    (movie.first_air_date &&
                      movie.first_air_date.substring(0, 4))}
                  )
                </span>
              </h1>
              <p>
                <span className="video-details-spancolor italic">
                  {tagline}
                </span>
              </p>
              <div className="video-details-genre">
                <ul className="video-details-genre-list">
                  {genres &&
                    genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
                </ul>
              </div>
            </div>

            <div className="video-details-trailer">
              <h1 className="video-details-colorWhite star-rating">
                <img
                  className="video-details-star-icon"
                  src="/images/star.png"
                  alt=""
                />
                {vote_average && vote_average.toFixed(1)} / 10{" "}
              </h1>

              {trailer ? (
                <div>
                  <VideoModal
                    videoKey={trailer.key}
                    videoName="Watch Trailer"
                    isTrailer={true}
                  />
                </div>
              ) : (
                <h1 className="video-details-colorWhite">Trailer Unavailable</h1>
              )}
            </div>

            <div className="video-details-overview">
              <h2 className="video-details-colorWhite font-weight-500">
                Overview:
              </h2>
              <h3 className="video-details-colorWhite">{overview}</h3>
            </div>

            <div className="video-details-release">
              <p className="video-details-colorWhite font-weight-500">
                Status:{" "}
                <span className="video-details-spancolor"> {status}</span>
              </p>
              <p className="video-details-colorWhite font-weight-500">
                Release Date:{" "}
                <span className="video-details-spancolor"> {release_date}</span>
              </p>
              <p className="video-details-colorWhite font-weight-500">
                Runtime:{" "}
                <span className="video-details-spancolor">
                  {runtime} Minutes
                </span>
              </p>
            </div>
            <div className="video-details-director">
              {crew.find((person) => person.job === "Director") ? (
                <p className="video-details-colorWhite font-weight-500">
                  Director:{" "}
                  <span className="video-details-spancolor">
                    {crew.find((person) => person.job === "Director").name}
                  </span>
                </p>
              ) : (
                <p className="video-details-colorWhite font-weight-500">
                  Director: Unknown
                </p>
              )}
            </div>
            <div className="video-details-writer">
              {crew.find((person) => person.job === "Writer") ? (
                <p className="video-details-colorWhite font-weight-500">
                  Writer:{" "}
                  <span className="video-details-spancolor">
                    {crew.find((person) => person.job === "Writer").name}
                  </span>
                </p>
              ) : (
                <p className="video-details-colorWhite font-weight-500">
                  Writer:{" "}
                  <span className="video-details-spancolor">Unknown </span>
                </p>
              )}
            </div>
          </div>
        </main>
      </div>

      {cast && cast.length > 0 && (
        <section className="video-cast">
          <h1>Cast</h1>
          <Swiper
            spaceBetween={30}
            slidesPerView={CastSlidesPerView}
            modules={[Autoplay]}
            autoplay={{ delay: 6000 }}
          >
            <div>
              {cast.map((cast) => (
                <SwiperSlide key={cast.id}>
                  <CastCard
                    castImage={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                        : "https://moviea.vercel.app/assets/avatar-bd5ec287.png"
                    }
                    castName={cast.name}
                    castCharacter={cast.character}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </section>
      )}

      {video && video.length > 0 && (
        <section className="video-officialVideos">
          <h1>Official Videos</h1>
          <Swiper
            spaceBetween={0}
            slidesPerView={VideoSlidesPerView}
            modules={[Autoplay]}
            autoplay={{ delay: 8000 }}
          >
            <div className="video-officialVideos-wrapper">
              {video.map((vid) => (
                <SwiperSlide key={vid.key}>
                  <VideoModal
                    videoKey={vid.key}
                    videoName={vid.name}
                    isTrailer={false}
                    videoImage={`https://img.youtube.com/vi/${vid.key}/0.jpg`}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </section>
      )}

      {similar && similar.length > 0 && (
        <section className="video-similar">
          <h1>Similar Shows</h1>
          <div>
            <Swiper
              spaceBetween={25}
              slidesPerView={SimilarSlidesPerView}
              modules={[Autoplay]}
              autoplay={{ delay: 8000 }}
            >
              <div className="VideoCard-wrapper">
                {similar.map((similarMovie) => (
                  <SwiperSlide>
                    <VideoCard
                      star={"../images/star.png"}
                      type={`/movie/${similarMovie.id}`}
                      key={similarMovie.id}
                      image={similarMovie.poster_path}
                      movieTitle={
                        similarMovie.title
                          ? similarMovie.title
                          : similarMovie.name
                      }
                      movieRelease={
                        similarMovie.release_date
                          ? similarMovie.release_date
                          : similarMovie.first_air_date
                      }
                      rating={similarMovie.vote_average}
                    />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </section>
      )}
    </div>
  );
}
