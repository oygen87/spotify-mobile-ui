import "./styles/styles.css";
import * as React from "react";
import { podcasts } from "./data/podcasts";
import { PodcastView } from "./components/podcast/PodcastView";
import { PlayerContextProvider } from "./context/PlayerContext";

export const App = () => {
  return (
    <PlayerContextProvider>
      <PodcastView podcast={podcasts[0]} />
    </PlayerContextProvider>
  );
};
