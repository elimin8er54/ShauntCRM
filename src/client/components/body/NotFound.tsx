import React from "react";
import styles from "../../styles.scss";

const NotFound = () => {
  /**
   * This is the not found. @see index.tsx
   * This is a componenet that displays a message when a user goes to a page that doee not exist
   */
  return (
    <>
      <div className={styles.notFound}>Sorry this page does not exist!</div>
    </>
  );
};

export default NotFound;
