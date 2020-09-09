import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import myReducer from "./store/reducer";

const store = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
