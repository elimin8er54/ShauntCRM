import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles.scss";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

const Home = () => {
  /**
   * This is the login page. @see index.tsx
   * This is a standalone componenet that will switch to another set of componenets when logged in
   */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<String>("");
  const [username, setUsername] = useState<String>("");
  const [errorMessage, setErrorMessage] = useState<String>("");

  /**
   * handleLogin is a function that will check to see if the credentials sent are correct.
   */
  const handleLogin = () => {
    axios({
      url: `/api/signin`,
      method: "POST",
      data: { username: username, password: password },
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => {
        const { message } = response.data;
        //If we log in succesfully this should not even matter.
        message && setErrorMessage(message);
      })
      .catch((error) => {
        const { message } = error.response.data.data;
        message && setErrorMessage(message);
      });
  };

  const handleCreate = () => {
    axios({
      url: `/api/createuser`,
      method: "POST",
      data: { username: username, password: password },
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => {
        const { message } = response.data;
        //If we log in succesfully this should not even matter.
        message && setErrorMessage(message);
      })
      .catch((error) => {
        const { message } = error.response.data.data;
        message && setErrorMessage(message);
      });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className={styles.mainContainer}>
      <h3>CRM</h3>
      <span className={styles.loginWidth}>
        {errorMessage && <p>{errorMessage}</p>}
        <div className={styles.dashSeperator}></div>
        <div className={styles.loginTitle}>Sign In </div>
        <p>Sign in to your CRM account to access all our features</p>
        <div className={styles.loginSeparator}>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Username
            </InputLabel>
            <Input fullWidth value={username} onChange={handleUsernameChange} />
          </FormControl>
        </div>
        <div className={styles.loginSeparator}>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className={styles.loginSeparator}>
          <Button
            onClick={handleLogin}
            className={styles.mainButton}
            variant="contained"
            color="secondary"
            id="loginButton"
          >
            Log In
          </Button>

          <Button
            onClick={handleCreate}
            className={styles.mainButton}
            variant="contained"
            color="secondary"
            id="createButton"
          >
            Create Account
          </Button>
        </div>
      </span>
    </div>
  );
};

export default Home;
