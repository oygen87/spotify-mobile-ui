import * as React from "react";
import { useState, createContext } from "react";
import { podcasts } from "../data/podcasts";

const defaultPlayerContextValue = {
  isPlaying: false,
  episode: podcasts[0].episodes[0],
};

export const PlayerContext = createContext(defaultPlayerContextValue);

export const PlayerContextProvider = (props) => {
  const [player, setPlayer] = useState(defaultPlayerContextValue);
  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
