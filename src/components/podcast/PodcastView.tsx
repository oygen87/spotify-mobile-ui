import * as React from "react";
import { useState, useEffect, useCallback, useContext } from "react";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { PodcastListItem } from "./PodcastListItem";
import { colors } from "../../variables/colors";
import { PlayerContext } from "../../context/PlayerContext";
import { useChangeableHtmlBackgroundColors } from "../../hooks/useChangeableHtmlBackgroundColors";
import { Podcast } from "../../types/types";
import { Footer } from "../common/Footer";

interface Props {
  podcast: Podcast;
}

export const PodcastView = ({ podcast }: Props) => {
  const playerContext = useContext(PlayerContext);
  const { scrollY } = useViewportScroll();

  useChangeableHtmlBackgroundColors(podcast.accentColor, colors.black, 200);

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
  const [toast, setToast] = useState({ open: false, message: "" });

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
          {podcast.tags.map((tag) => (
            <span className="description-bottom-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="sticky-list-header">
        <h3 className="sticky-list-header-title">Alla avsnitt</h3>
        <span className="sticky-list-header-sort">Sortera</span>
      </div>
      <div className="list">
        {podcast.episodes.map((episode) => {
          return (
            <PodcastListItem
              key={episode.title}
              episode={episode}
              isPlaying={
                playerContext.player.isPlaying &&
                playerContext.player.episode.title === episode.title
              }
              onPlay={(ep) => {
                playerContext.setPlayer({ isPlaying: true, episode: ep });
              }}
              onPause={() =>
                playerContext.setPlayer((prev) => ({
                  ...prev,
                  isPlaying: false,
                }))
              }
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};
