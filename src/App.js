import "./styles/styles.css";
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ListItem } from "./components/ListItem";
import { colors } from "./variables/colors";

export default function App({ podcast }) {
  const { scrollY } = useViewportScroll();

  const headerScrollOpacity = useTransform(scrollY, [100, 110], [0, 1]);
  const headerTitleScrollOpacity = useTransform(scrollY, [80, 120], [0, 1]);
  const headerTitleScrollY = useTransform(scrollY, [80, 120], [20, 0]);
  const podScrollOpacity = useTransform(scrollY, [15, 100], [1, 0]);
  const moreOpacity = useTransform(scrollY, [114, 115], [0, 0.8]);

  const toastSpring = useSpring(0);
  const toastSpringScale = useTransform(toastSpring, [0, 1], [0.9, 1]);

  const followButtonVariants = {
    rest: { scale: 1 },
    pressed: { scale: 0.95 },
  };

  const descriptionVariants = {
    closed: {
      height: 53,
      transition: {
        duration: 0,
        delay: 0.2,
      },
    },
    open: {
      height: "auto",
      transition: {
        delay: 0.1,
      },
    },
  };
  const descriptionShowButtonVariants = {
    closed: {
      display: "block",
      transition: {
        delay: 0.2,
      },
    },
    open: {
      display: "none",
    },
  };

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [isPlaying, setIsPlaying] = useState(undefined);
  const [lastPlayed, setLastPlayed] = useState(podcast.episodes[0]);
  const [htmlBgColor, setHtmlBgColor] = useState(colors.red);
  const [toast, setToast] = useState({ open: false, message: null });

  const showToast = useCallback(() => {
    toastSpring.set(0);
    setTimeout(() => toastSpring.set(1), 200);
  }, [toastSpring]);

  useEffect(() => {
    if (toast.message) {
      showToast();
      const timeoutFn = setTimeout(() => toastSpring.set(0), 3000);
      return () => clearTimeout(timeoutFn);
    }
  }, [toast, toastSpring, showToast]);

  useEffect(() => {
    const updateHtmlBackgroundColor = (y) => {
      if (y > 200 && htmlBgColor !== colors.black) {
        document.querySelector("html").style.background = colors.black;
        setHtmlBgColor(colors.black);
      }
      if (y < 200 && htmlBgColor !== colors.red) {
        document.querySelector("html").style.background = colors.red;
        setHtmlBgColor(colors.red);
      }
    };

    const unsubscribe = scrollY.onChange(updateHtmlBackgroundColor);

    return () => {
      unsubscribe();
    };
  }, [htmlBgColor, scrollY]);

  return (
    <div className="App">
      <motion.div
        className="toast"
        initial={false}
        style={{ scale: toastSpringScale, opacity: toastSpring }}
      >
        {toast.message}
      </motion.div>
      <svg
        className="back"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#FFF"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <motion.svg
        className="more"
        style={{ opacity: moreOpacity }}
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
      </motion.svg>
      <motion.div className="header" style={{ opacity: headerScrollOpacity }}>
        <motion.h5
          className="header-title"
          style={{ opacity: headerTitleScrollOpacity, y: headerTitleScrollY }}
        >
          {podcast.title}
        </motion.h5>
      </motion.div>
      <div className="pod">
        <motion.img
          className="pod-img"
          style={{ opacity: podScrollOpacity }}
          src="darknet-diaries-podcast.jpeg"
          alt="darknet diaries cover"
        />
        <motion.div className="pod-text" style={{ opacity: podScrollOpacity }}>
          <h1 className="pod-text-title">{podcast.title}</h1>
          <h6 className="pod-text-author">{podcast.author}</h6>
        </motion.div>
      </div>
      <div className="description">
        <div className="description-top">
          <motion.div
            variants={followButtonVariants}
            initial="rest"
            whileTap="pressed"
            className={`description-top-follow ${isFollowing ? "active" : ""}`}
            onClick={() => {
              setIsFollowing((prev) => !prev);
              setToast({
                open: true,
                message: isFollowing
                  ? `Okej, du har slutat följa ${podcast.title}`
                  : `Okej, du följer ${podcast.title}`,
              });
            }}
          >
            {isFollowing ? "FÖLJER" : "FÖLJ"}
          </motion.div>
          <svg
            className="description-top-more"
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
        <motion.div
          className="description-mid"
          variants={descriptionVariants}
          initial="closed"
          animate={isDescriptionOpen ? "open" : "closed"}
        >
          <p className="description-mid-paragraph">{podcast.description}</p>
          <span className="description-mid-description">
            Beskrivning av {podcast.author}
          </span>
          <span
            className="description-mid-hide"
            onClick={() => setIsDescriptionOpen(false)}
          >
            visa mindre
          </span>
          <motion.span
            className="description-mid-show"
            variants={descriptionShowButtonVariants}
            initial="closed"
            animate={isDescriptionOpen ? "open" : "closed"}
            onClick={() => setIsDescriptionOpen(true)}
          >
            ... visa mer
          </motion.span>
        </motion.div>
        <div className="description-bottom">
          <span className="description-bottom-tag">True crime</span>
          <span className="description-bottom-tag">Teknologi</span>
        </div>
      </div>
      <div className="sticky-list-header">
        <h3 className="sticky-list-header-title">Alla avsnitt</h3>
        <span className="sticky-list-header-sort">Sortera</span>
      </div>
      <div className="list">
        {podcast.episodes.map((episode) => {
          return (
            <ListItem
              key={episode.title}
              episode={episode}
              isPlaying={isPlaying}
              onPlay={(ep) => {
                setIsPlaying(ep);
                setLastPlayed(ep);
              }}
              onPause={() => setIsPlaying(undefined)}
            />
          );
        })}
      </div>
      <div className="footer">
        <div className="footer-player">
          <img
            className="footer-player-img"
            src={lastPlayed.img}
            alt={lastPlayed.title}
          />
          <div className="footer-player-info">
            <h4 className="footer-player-info-title">{lastPlayed.title}</h4>
            <h5 className="footer-player-info-podcast">{lastPlayed.podcast}</h5>
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
          {isPlaying ? (
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
              onClick={() => setIsPlaying(undefined)}
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
              onClick={() => setIsPlaying(lastPlayed)}
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
    </div>
  );
}
