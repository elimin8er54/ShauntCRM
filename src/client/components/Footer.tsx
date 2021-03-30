import React from "react";
import styles from "../styles.scss";

const Footer = () => {
  /**
   * Basic footer. We will add more to this as time goes by
   *
   */
  return (
    <div className={styles.footer}>
      <div className={styles.customFooter}>
        Website Created by
        <a href="https://www.linkedin.com/in/shaunt-keshishian-045450195/">
          Shaunt Keshishian
        </a>
      </div>
    </div>
  );
};

export default Footer;
