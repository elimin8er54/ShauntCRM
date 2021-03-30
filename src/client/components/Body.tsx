import React from "react";
import NotFound from "./body/NotFound";
import Home from "./body/Home";
import styles from "../styles.scss";
import { Route, Switch } from "react-router-dom";

const Body = () => {
  /**
   * This componenet will be used to swap out other componenets as we add them
   * This is used so that we can swap the body without rerendering the header and footer
   *
   */
  return (
    <div className={styles.body}>
      <Switch>
        <Route exact path="/home" component={Home} />

        <Route exact path="/*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default Body;
