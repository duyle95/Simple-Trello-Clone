import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";

import { store } from "./store";
import HomeMenu from "./components/HomeMenu";
import Dashboard from "./pages/Dashboard";
import BoardDetail from "./pages/BoardDetail";
import registerServiceWorker from "./registerServiceWorker";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <HomeMenu />
            <Route exact path="/" component={Dashboard} />
            <Route path="/:boardId" component={BoardDetail} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
