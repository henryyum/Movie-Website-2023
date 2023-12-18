import React from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css";

export default function VideoCard(props) {

  return (
    <div className="VideoCard">
      <Link to={props.type}>
        <img
          className="VideoCard-image"
          src={
            props.image
              ? `https://image.tmdb.org/t/p/w500${props.image}`
              : "../images/no-poster.png"
          }
          alt=""
        />
      </Link>
      <div className="VideoCard-text">
        <h3>{props.movieTitle}</h3>
        <p className="VideoCard-rating">
          <img className="star-icon" src={props.star} alt="star-icon" />
          {props.rating?.toFixed(1)} / 10{" "}
        </p>
        <p>{props.movieRelease}</p>
      </div>
    </div>
  );
}
