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

export default function TVShowDetails({ videoType }) {
  const { id } = useParams();
  const [TV, setTV] = useState([]);
  const [TVvideo, setTVVideo] = useState([]);
  const [TVcast, setTVCast] = useState([]);
  const [TVcrew, setTVCrew] = useState([]);
  const [TVsimilar, setTVSimilar] = useState([]);
  const [VideoSlidesPerView, setVideoSlidesPerView] = useState([3]);
  const [CastSlidesPerView, setCastSlidesPerView] = useState([8]);
  const [SimilarSlidesPerView, setSimilarSlidesPerView] = useState([6]);

  const {
    name,
    tagline,
    genres,
    backdrop_path,
    poster_path,
    vote_average,
    status,
    overview,
    first_air_date,
    last_air_date,
    number_of_episodes,
    number_of_seasons,
  } = TV;

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
        setTV(data);

        const videoRes = await fetch(
          `https://api.themoviedb.org/3/${videoType}/${id}/videos?api_key=8d87d908f771e658d8db29f94c80440f`,
        );
        const videoData = await videoRes.json();
        console.log(videoData);
        setTVVideo(videoData.results);

        const castRes = await fetch(
          `https://api.themoviedb.org/3/${videoType}/${id}/credits?api_key=8d87d908f771e658d8db29f94c80440f`,
        );
        const castData = await castRes.json();
        console.log(castData);
        setTVCast(castData.cast);

        const crewRes = await fetch(
          `https://api.themoviedb.org/3/${videoType}/${id}/credits?api_key=8d87d908f771e658d8db29f94c80440f`,
        );
        const crewData = await crewRes.json();
        console.log(crewData);
        setTVCrew(crewData.crew);

        const similarRes = await fetch(
          `https://api.themoviedb.org/3/${videoType}/${id}/similar?api_key=8d87d908f771e658d8db29f94c80440f`,
        );
        const similarData = await similarRes.json();
        console.log(similarData);
        setTVSimilar(similarData.results);
      } catch (error) {
        console.error("error fetching details has occured", error);
      }
    };
    fetchMovies();
  }, [id]);

  const backgroundImageStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
  };

  const trailer = TVvideo.find((trailer) =>
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
                {name}{" "}
                <span className="font-size-sm font-weight-400">
                  ({first_air_date && first_air_date.substring(0, 4)})
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
                <h1 className="video-details-colorWhite">
                  Trailer Unavailable
                </h1>
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
                First Air Date:{" "}
                <span className="video-details-spancolor">
                  {" "}
                  {first_air_date}
                </span>
              </p>
              <p className="video-details-colorWhite font-weight-500">
                Number of Episodes:
                <span className="video-details-spancolor">
                  {" "}
                  {number_of_episodes}
                </span>
              </p>

              <p className="video-details-colorWhite font-weight-500">
                Number of Seasons:
                <span className="video-details-spancolor">
                  {" "}
                  {number_of_seasons}
                </span>
              </p>
            </div>
            <div className="video-details-director">
              {TVcrew.find(
                (person) => person.known_for_department === "Directing",
              ) ? (
                <p className="video-details-colorWhite font-weight-500">
                  Director:{" "}
                  <span className="video-details-spancolor">
                    {
                      TVcrew.find(
                        (person) => person.known_for_department === "Directing",
                      ).name
                    }
                  </span>
                </p>
              ) : (
                <p className="video-details-colorWhite font-weight-500">
                  Director: Unknown
                </p>
              )}
            </div>
            <div className="video-details-writer">
              {TVcrew.find(
                (person) => person.known_for_department === "Writing",
              ) ? (
                <p className="video-details-colorWhite font-weight-500">
                  Writer:{" "}
                  <span className="video-details-spancolor">
                    {
                      TVcrew.find(
                        (person) => person.known_for_department === "Writing",
                      ).name
                    }
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

      {TVcast && TVcast.length > 0 && (
        <section className="video-cast">
          <h1>Cast</h1>
          <Swiper
            spaceBetween={30}
            slidesPerView={CastSlidesPerView}
            modules={[Autoplay]}
            autoplay={{ delay: 6000 }}
          >
            <div>
              {TVcast.map((cast) => (
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

      {TVvideo && TVvideo.length > 0 && (
        <section className="video-officialVideos">
          <h1>Official Videos</h1>
          <Swiper
            spaceBetween={0}
            slidesPerView={VideoSlidesPerView}
            modules={[Autoplay]}
            autoplay={{ delay: 8000 }}
          >
            <div className="video-officialVideos-wrapper">
              {TVvideo.map((vid) => (
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

      {TVsimilar && TVsimilar > 0 && (
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
                {TVsimilar.map((similarMovie) => (
                  <SwiperSlide>
                    <VideoCard
                      star={"../images/star.png"}
                      type={`/tv/${similarMovie.id}`}
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
