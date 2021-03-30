import "core-js/es/map";
import "core-js/es/set";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Login from "./components/Body/Login";
import ScrollToTop from "./wrappers/ScrollToTop";
import TokenCheck from "./wrappers/TokenCheck";
import styles from "./styles.scss";

const QUARTER_HOUR = 1000 * 60 * 15;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <TokenCheck time={QUARTER_HOUR} redirect="/">
            <Route exact path="/*">
              <Header />
              <div className={styles.mainContainer}>
                <Body />
              </div>
              <Footer />
            </Route>
          </TokenCheck>
        </Switch>
      </ScrollToTop>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
