import * as React from "react";
import { useState, createContext } from "react";
import { podcasts } from "../data/podcasts";
import { Episode } from "../types/types";

interface Props {
  children: React.ReactNode;
}

interface PlayerContextType {
  player: PlayerContextValue;
  setPlayer: Function;
}

interface PlayerContextValue {
  isPlaying: boolean;
  episode: Episode;
}

export const PlayerContext = createContext<PlayerContextType>({
  player: null,
  setPlayer: null,
});

export const PlayerContextProvider = (props: Props) => {
  const defaultPlayerContextValue: PlayerContextValue = {
    isPlaying: false,
    episode: podcasts[0].episodes[0],
  };

  const [player, setPlayer] = useState<PlayerContextValue>(defaultPlayerContextValue);

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
