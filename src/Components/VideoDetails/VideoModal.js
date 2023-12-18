import React, { useState, useRef } from "react";
import "./VideoModal.css";

export default function VideoModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialog = useRef(null);
  const iframeRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
    if (dialog.current) {
      dialog.current.showModal();
    }
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${props.videoKey}?autoplay=1`;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (dialog.current) {
      dialog.current.close();
    }

    if (iframeRef.current) {
      iframeRef.current.src = "";
    }
  };

  return (
    <div>
      {props.isTrailer ? (
        <div className="watch-trailer" onClick={openModal}>
          <button className="watch-trailer-btn">
            {props.videoName}
            <img className="video-play-icon" src="../images/play-button.png" />
          </button>
        </div>
      ) : (
        <div className="video-thumbnail" onClick={openModal}>
          <img className="video-image" src={props.videoImage} alt="" />
        </div>
      )}

      <div className="modal-backdrop">
        <dialog className="video-modal" ref={dialog}>
          <h1 className="close-modal-btn" onClick={closeModal}>
            Close
          </h1>
          <iframe
            ref={iframeRef}
            className="video-iframe"
            title={props.videoName}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </dialog>
      </div>
    </div>
  );
}
