import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";

interface Props {
  /**
   *  history is an interface to the navigation stack. The history serves as the
   * source of truth for the current location, as well as provides a set of
   * methods that may be used to change it.
   *
   * @type {History}
   */
  history: History;
}
const ScrollToTop: React.FC<Props> = ({ history, children }) => {
  /**
   * Scroll to the top of the page when a Router redirects us
   *
   * @param {Props} {history,children}
   * @return {React.ReactNode}  {children}
   */
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return <>{children}</>;
};

export default withRouter(ScrollToTop);
