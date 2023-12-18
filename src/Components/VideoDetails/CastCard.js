import React from "react";
import "./CastCard.css";

export default function CastCard(props) {
  return (
    <div className="cast-card">
      <img className="cast-img" src={props.castImage} alt="" />
      <h2>{props.castName}</h2>
      <p>{props.castCharacter}</p>
    </div>
  );
}
