import * as React from "react";
import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

export const Footer = () => {
    const playerContext = useContext(PlayerContext);
    
    return(
        <div className="footer">
        <div className="footer-player">
          <img
            className="footer-player-img"
            src={playerContext.player.episode.img}
            alt={playerContext.player.episode.title}
          />
          <div className="footer-player-info">
            <h4 className="footer-player-info-title">
              {playerContext.player.episode.title}
            </h4>
            <h5 className="footer-player-info-podcast">
              {playerContext.player.episode.podcast}
            </h5>
          </div>
          <svg
            className="footer-player-airplay"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
            <polygon points="12 15 17 21 7 21 12 15" />
          </svg>
          {playerContext.player.isPlaying ? (
            <svg
              className="footer-player-pause"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() =>
                playerContext.setPlayer((prev) => ({
                  ...prev,
                  isPlaying: false,
                }))
              }
            >
              <rect x="3" y="4" width="4" height="16" fill="#EEEEEE" />
              <rect x="14" y="4" width="4" height="16" fill="#EEEEEE" />
            </svg>
          ) : (
            <svg
              className="footer-player-play"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() =>
                playerContext.setPlayer((prev) => ({
                  ...prev,
                  isPlaying: true,
                }))
              }
            >
              <polygon
                fill="#EEEEEE"
                stroke="#EEEEEE"
                points="5 3 19 12 5 21 5 3"
              />
            </svg>
          )}
        </div>
        <div className="footer-menu">
          <div className="footer-menu-home">
            <div className="footer-menu-home-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div className="footer-menu-home-label">Hem</div>
          </div>
          <div className="footer-menu-search">
            <div className="footer-menu-search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="footer-menu-search-label">Sök</div>
          </div>
          <div className="footer-menu-library">
            <div className="footer-menu-library-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <div className="footer-menu-library-label">Ditt bibliotek</div>
          </div>
        </div>
      </div>
    )
}