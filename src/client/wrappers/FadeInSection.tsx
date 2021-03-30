import React, { useEffect, useRef, useState } from "react";
import styles from "../styles.scss";

interface Props {
  /**
   * The offset of how far the element needs to be from before the fade in effect starts
   *
   * @type {number}
   */
  offset: number;
}

const FadeInSection: React.FC<Props> = ({ children, offset }) => {
  /**
   * Check when a page reaches a certain threshold for an element on the DOM
   * then do an animation
   *
   * @param {Props} {children,offset}
   * @return {React.ReactNode}  {children}
   */
  const [isVisible, setVisible] = useState<boolean>(false);
  const domRef = useRef();

  const imageScroll = () => {
    if (isInViewport(domRef.current)) {
      setVisible(true);
    }
  };

  /**
   * Makes sure to add the scroll listener and check even if we have not scrolled yet
   * This is incase we have something that needs to fade in but was already on the screen before scrolling
   */
  const isTopOfPage = () => {
    var yPosition = window.pageYOffset;

    if (yPosition == 0) {
      //top of page
      return true;
    } else if (yPosition > 0) {
      // not at the top of the page
      return false;
    }
  };

  /**We do this the old way as to not conflict with IE
   * useOverlay sets the open state of the overlay class.
   * @param{HTMLElement} el - the current element we are going to check when scrolling.
   */
  const isInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top + offset <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  useEffect(() => {
    if (isTopOfPage) {
      imageScroll();
    }

    window.addEventListener("scroll", imageScroll);
    return () => {
      window.removeEventListener("scroll", imageScroll);
    };
  }, []);
  return (
    <div
      id="testFade"
      className={`${styles.fadeInSection} ${isVisible && styles.isVisible}`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
