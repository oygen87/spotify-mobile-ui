import "./styles/styles.css";
import * as React from "react";
import { useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { episodes } from "./data/episodes";
import { ListItem } from "./components/ListItem";

export default function App() {
  const { scrollY } = useViewportScroll();

  const headerScrollOpacity = useTransform(scrollY, [100, 110], [0, 1]);
  const headerTitleScrollOpacity = useTransform(scrollY, [80, 120], [0, 1]);
  const headerTitleScrollY = useTransform(scrollY, [80, 120], [20, 0]);
  const podScrollOpacity = useTransform(scrollY, [15, 100], [1, 0]);
  const moreOpacity = useTransform(scrollY, [114, 115], [0, 0.8]);

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
      display: 'block',
      transition: {
        delay: 0.2,
      },
    },
    open: {
      display: 'none'
    }
  }

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [isPlaying, setIsPlaying] = useState(undefined);

  return (
    <div className="App">
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
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </motion.svg>
      <motion.div className="header" style={{ opacity: headerScrollOpacity }}>
        <motion.h5
          className="header-title"
          style={{ opacity: headerTitleScrollOpacity, y: headerTitleScrollY }}
        >
          Darknet Diaries
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
          <h1 className="pod-text-title">Darknet Diaries</h1>
          <h6 className="pod-text-author">Jack Rhysider</h6>
        </motion.div>
      </div>
      <div className="description">
        <div className="description-top">
          <motion.div
            variants={followButtonVariants}
            initial="rest"
            whileTap="pressed"
            className={`description-top-follow ${isFollowing ? "active" : ""}`}
            onClick={() => setIsFollowing((prev) => !prev)}
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
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
          <p className="description-mid-paragraph">
            Explore true stories of the dark side of the Internet with host Jack
            Rhysider as he takes you on a journey through the chilling world of
            hacking, data breaches, and cyber crime.
          </p>
          <span className="description-mid-description">
            Beskrivning av Jack Rhysider
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
        {episodes.map((episode) => {
          return (
            <ListItem
              episode={episode}
              isPlaying={isPlaying}
              onPlay={(ep) => setIsPlaying(ep)}
              onPause={() => setIsPlaying(undefined)}
            />
          );
        })}
      </div>
    </div>
  );
}
