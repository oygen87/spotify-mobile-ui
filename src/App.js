import "./styles/styles.css";
import * as React from "react";
import { podcasts } from "./data/podcasts";
import { PodcastView} from "./components/podcast/PodcastView"

export const App = () => {
  return(
    <PodcastView podcast={podcasts[0]} />
  )
}
