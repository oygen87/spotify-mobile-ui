import "./styles.css";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  motion,
  useViewportScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export default function App() {
  const { scrollY } = useViewportScroll();
  const headerScrollOpacity = useTransform(scrollY, [100, 110], [0, 1]);
  const headerTitleScrollOpacity = useTransform(scrollY, [80, 120], [0, 1]);
  const headerTitleScrollY = useTransform(scrollY, [80, 120], [20, 0]);
  const podScrollOpacity = useTransform(scrollY, [15, 100], [1, 0]);
  const moreOpacity = useTransform(scrollY, [114, 115], [0, 0.8]);

  const followButton = {
    rest: { scale: 1 },
    pressed: { scale: 0.95 },
  };

  const [isFollowing, setIsFollowing] = useState(true);

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
            variants={followButton}
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
        <div className="description-mid">
          <p className="description-mid-paragraph">
            Explore true stories of the dark side of the Internet with host Jack
            Rhysider as he takes you on a journey through the chilling world of
            hacking, data breaches, and cyber crime.
          </p>
        </div>
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
        <div className="list-item">
          <div className="list-item-top">
            <img
              className="list-item-top-img"
              src="darknet-wannacry.jpg"
              alt="wannacry"
            />
            <div className="list-item-top-title">
              <h4 className="list-item-top-title-episode">73: Wannacry</h4>
              <h5 className="list-item-top-title-pod">Darknet Diaries</h5>
            </div>
            <svg
              className="list-item-top-more"
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
          <div className="list-item-description">
            It is recommend to listen to episodes 53 “Shadow Brokers”, 71
            “FDFF”, and 72 “Bangladesh Bank Heist” before listening to this one.
            In May 2017 the world fell victim to a major ransomware attack known
            as WannaCry. One of the victims was UK’s national health service.
            Security researchers scrambled to try to figure out how to stop it
            and who was behind it.
          </div>
          <div className="list-item-bottom">
            <svg
              className="list-item-bottom-play"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="list-item-bottom-info">TIS • 59MIN</span>
            <svg
              className="list-item-bottom-download-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        <div className="list-item">
          <div className="list-item-top">
            <img
              className="list-item-top-img"
              src="darknet-bangladesh.jpg"
              alt="wannacry"
            />
            <div className="list-item-top-title">
              <h4 className="list-item-top-title-episode">
                72: Bangladesh Bank Heist
              </h4>
              <h5 className="list-item-top-title-pod">Darknet Diaries</h5>
            </div>
            <svg
              className="list-item-top-more"
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
          <div className="list-item-description">
            This story is about a bank robbery with the objective to steal 1
            billion dollars. Which makes this the largest bank robbery in
            history. And it was all done over a computer. Our guest this episode
            was Geoff White. Learn more about him at geoffwhite.tech. Check out
            Geoff’s new book Crime Dot Com.
          </div>
          <div className="list-item-bottom">
            <svg
              className="list-item-bottom-play"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="list-item-bottom-info">27 AUG. • 1TIM 6MIN</span>
            <svg
              className="list-item-bottom-download-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        <div className="list-item">
          <div className="list-item-top">
            <img
              className="list-item-top-img"
              src="darknet-fdff.jpg"
              alt="wannacry"
            />
            <div className="list-item-top-title">
              <h4 className="list-item-top-title-episode">71: FDFF</h4>
              <h5 className="list-item-top-title-pod">Darknet Diaries</h5>
            </div>
            <svg
              className="list-item-top-more"
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
          <div className="list-item-description">
            In this episode, we’re going into the depths of North Korea to
            conduct one of the greatest hacks of all time. To find a way to
            inject information into a country run by totalitarian regime. A big
            thanks to Yeonmi Park for sharing her story with us. Also thanks to
            Alex Gladstein for telling us the inside story. You can find more
            about Flash Drive For Freedom at flashdrivesforfreedom.org.
          </div>
          <div className="list-item-bottom">
            <svg
              className="list-item-bottom-play"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="list-item-bottom-info">19AUG • 1TIM 2MIN</span>
            <svg
              className="list-item-bottom-download-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        <div className="list-item">
          <div className="list-item-top">
            <img
              className="list-item-top-img"
              src="darknet-exodus.jpg"
              alt="wannacry"
            />
            <div className="list-item-top-title">
              <h4 className="list-item-top-title-episode">70: Ghost Exodus</h4>
              <h5 className="list-item-top-title-pod">Darknet Diaries</h5>
            </div>
            <svg
              className="list-item-top-more"
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
          <div className="list-item-description">
            It is recommend to listen to episodes 53 “Shadow Brokers”, 71
            “FDFF”, and 72 “Bangladesh Bank Heist” before listening to this one.
            In May 2017 the world fell victim to a major ransomware attack known
            as WannaCry. One of the victims was UK’s national health service.
            Security researchers scrambled to try to figure out how to stop it
            and who was behind it.
          </div>
          <div className="list-item-bottom">
            <svg
              className="list-item-bottom-play"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="list-item-bottom-info">12AUG • 53MIN</span>
            <svg
              className="list-item-bottom-download-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        <div className="list-item">
          <div className="list-item-top">
            <img
              className="list-item-top-img"
              src="darknet-bangladesh.jpg"
              alt="wannacry"
            />
            <div className="list-item-top-title">
              <h4 className="list-item-top-title-episode">69: Human Hacker</h4>
              <h5 className="list-item-top-title-pod">Darknet Diaries</h5>
            </div>
            <svg
              className="list-item-top-more"
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
          <div className="list-item-description">
            We all know that computers and networks are vulnerable to hacking
            and malicious actors, but what about us, the humans who interface
            with these devices? Con games, scams, and strategic deception are
            far older than computers, and in the modern era, these techniques
            can make humans the weakest link in even the most secure system.
            This episode, security consultant and master social engineer,
            Christopher Hadnagy, joins us to share his stories and wisdom. He
            describes what it was like to be a social engineer before the world
            knew what social engineering was and tells some of his amazing
            stories from his long career in penetration testing.
          </div>
          <div className="list-item-bottom">
            <svg
              className="list-item-bottom-play"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="list-item-bottom-info">6 AUG. • 1TIM 17MIN</span>
            <svg
              className="list-item-bottom-download-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
