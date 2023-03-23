import React, { useContext, useState } from "react";
import { AuthContext } from "../context";

import { TextField } from "@mui/material";

const LoginPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [accName, setAccName] = useState("");
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
    localStorage.setItem("name", `${accName}`);
  };
  return (
    <div>
      <form className="login-form" onSubmit={login}>
        <TextField
          sx={{width: '100%'}}
          type="text"
          id="outlined-required"
          label="Account name"
          placeholder="Account name..."
          onChange={(event) => setAccName(event.target.value)}
          required
        />
        <TextField
          sx={{ width: '100%' }}
          id="outlined-password-input"
          label="Password"
          type="password"
          placeholder="Password..."
          required
        />
        <button className="login-button">Log in</button>
      </form>
    </div>
  );
};
export default LoginPage;