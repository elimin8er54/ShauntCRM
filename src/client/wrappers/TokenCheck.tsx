import React, { useEffect } from "react";
import axios from "axios";

//Check if token is valid on componenet load/each click/ and timer
interface Props {
  /**
   * redirect is the route that will be used of the token is invalid
   *
   * @type {string}
   */
  redirect: string;
  /**
   * time is the milliseconds before checking if the token is invalid
   *
   * @type {number}
   */
  time: number;
}

const TokenCheck: React.FC<Props> = ({ children, redirect, time }) => {
  /**
   * Check at time interval,on mount and when the user clicks. Just as a backup
   * Id the token is not valid anymore then redirect the user to the login page.
   *
   * @param {Props} {children, redirect, time}
   * @return {React.ReactNode}  {children}
   */
  useEffect(() => {
    checkToken();
    const unlisten = setInterval(() => {
      checkToken();
    }, time);
    const unlisten2 = (document.body.onclick = () => {
      checkToken();
    });
    return () => {
      unlisten2;
      clearInterval(unlisten);
    };
  }, []);

  const checkToken = async () => {
    try {
      const { data } = await axios({
        url: `/api/jwtauth`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
      });

      if (!data.success) {
        localStorage.removeItem("token");
        document.location.href = redirect;
      }
    } catch (err) {
      throw new Error('Unable to get a token.')
    }

  };

  return <>{children}</>;
};

export default TokenCheck;
