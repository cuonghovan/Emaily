import "materialize-css/dist/css/materialize.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import rootReducers from "./reducers";
import App from "./components/App";

const store = createStore(rootReducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
