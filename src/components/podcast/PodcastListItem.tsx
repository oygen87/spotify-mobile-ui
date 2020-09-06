import * as React from "react";
import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { Episode } from "../../types/types";

interface Props {
  episode: Episode;
  isPlaying: boolean;
  onPlay: (e: Episode) => void;
  onPause: () => void;
}

export const PodcastListItem = ({ episode, isPlaying, onPlay, onPause }: Props) => {
  const playerContext = useContext(PlayerContext);

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
            onClick={() => onPause()}
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
            onClick={() => onPlay(episode)}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span className="list-item-bottom-info">{episode.playInfo}</span>
        <svg
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
      </div>
    </div>
  );
};
