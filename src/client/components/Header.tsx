import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles.scss";

const Header = () => {
  /**
   * Basic header. We will add more to this as time goes by
   *
   */
  return (
    <>
      <ul className={styles.nav}>
        <li className={styles.navCenter}>
          <NavLink to="/home">Home </NavLink>
        </li>
        <li className={styles.navCenter}>
          <NavLink id="testScroll" to="/clients">
            Clients
          </NavLink>
        </li>
        <li className={styles.navCenter}>
          <NavLink to="/settings">Settings </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Header;
