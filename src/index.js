import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import {podcasts} from "./data/podcasts"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App podcast={podcasts[0]}/>
  </React.StrictMode>,
  rootElement
);
