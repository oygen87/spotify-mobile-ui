import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { Episode } from "../../types/types";
import {
  motion,
  useAnimation,
} from "framer-motion";

interface Props {
  episode: Episode;
  isPlaying: boolean;
}

export const PodcastListItem = ({
  episode,
  isPlaying,
}: Props) => {
  const playerContext = useContext(PlayerContext);
  const control = useAnimation();

  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const startDownload = async () => {
    // Fake download speed
    setIsDownloading(true);
    await control.start({
      strokeDashoffset: 80,
      transition: { duration: 0.8 },
    });
    await control.start({
      strokeDashoffset: 77,
      transition: { duration: 0.8 },
    });
    await control.start({
      strokeDashoffset: 70,
      transition: { duration: 0.7 },
    });
    await control.start({
      strokeDashoffset: 60,
      transition: { duration: 0.3 },
    });
    await control.start({
      strokeDashoffset: 40,
      transition: { duration: 0.6 },
    });
    await control.start({
      strokeDashoffset: 38,
      transition: { duration: 0.4 },
    });
    await control.start({
      strokeDashoffset: 32,
      transition: { duration: 0.2 },
    });
    await control.start({
      strokeDashoffset: 30,
      transition: { duration: 0.5 },
    });
    setIsDownloading(false);
    setIsDownloaded(true);
  };

  const stopDownload = () => {
    control.stop();
    setIsDownloading(false);
  }

  return (
    <div className="list-item">
      <div className="list-item-top">
        <img
          className="list-item-top-img"
          src={episode.img}
          alt={episode.title}
        />
        <div className="list-item-top-title">
          <h4
            className={`list-item-top-title-episode ${
              isPlaying ? "active" : ""
            }`}
          >
            {episode.title}
          </h4>
          <h5 className="list-item-top-title-pod">{episode.podcast}</h5>
        </div>
        <svg
          className="list-item-top-more"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </div>
      <div className="list-item-description">{episode.description}</div>
      <div className="list-item-bottom">
        {isPlaying && playerContext.player.episode.title === episode.title ? (
          <svg
            className="list-item-bottom-play"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() =>
              playerContext.setPlayer((prev) => ({
                ...prev,
                isPlaying: false,
              }))}
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="list-item-bottom-play"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => playerContext.setPlayer({ isPlaying: true, episode: episode })}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span className="list-item-bottom-info">{episode.playInfo}</span>
        {isDownloading ? (<>
          <svg className="list-item-bottom-progress" height="26" width="26" onClick={stopDownload}>
            <motion.circle
              cx="13"
              cy="13"
              r="11"
              stroke="#1db954"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset="100"
              animate={control}
              fill="none"
            />
            <rect width="8" height="8" x="9" y="9" style={{fill: "white"}} />
          </svg>
          <svg className="list-item-bottom-progress-background" height="26" width="26" onClick={stopDownload}>
          <circle
            cx="13"
            cy="13"
            r="11"
            stroke="gray"
            strokeWidth="1"
            fill="none"
          />
        </svg></>
        ) : !isDownloaded ? (
          <svg
            onClick={startDownload}
            className="list-item-bottom-download-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        ) : (<motion.svg
          className="list-item-bottom-download-icon-done"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{scale: 0.8}}
          animate={{scale: 1}}
          onClick={() => setIsDownloaded(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>)}
      </div>
    </div>
  );
};
