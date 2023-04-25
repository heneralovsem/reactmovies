import React, { useContext, useState } from "react";
import { Context } from "../../context";
import { observer } from "mobx-react-lite";
import { useLocation, Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { login, registration } from "../../http/userAPI";
import { useNavigate } from "react-router-dom";
import cl from "./Login.module.css";

const Login = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    try {
      let data;
      data = await registration(email, password);
      user.setUser(user);
      user.setIsAuth(true);
      user.setUserId(data.id);
      user.setUserName(data.email);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  const logIn = async () => {
    try {
      let data;
      data = await login(email, password);
      user.setUser(user);
      console.log(user);
      user.setIsAuth(true);
      user.setUserId(data.id);
      user.setUserName(data.email);
      localStorage.setItem("userId", data.id);
      navigate("/movies");
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div className={cl.login_wrapper}>
        <div className={cl.login_form}>
           {isLogin ? <h2 className={cl.form_header}> Log in</h2> : <h2 className={cl.form_header}>Create an account</h2>}
        <TextField
        sx={{ width: "100%" }}
        type="text"
        value={email}
        id="outlined-required"
        label="Email"
        placeholder="Email..."
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <TextField
        sx={{ width: "100%" }}
        id="outlined-password-input"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password..."
        required
      />

      {isLogin ? (
        <div className={cl.login_bottom_wrapper}><div className={cl.login_text}>
        Don't have an account?{" "}
        <Link className={cl.login__link} to="/registration">Create an account</Link>{" "}
        </div>
        <div><button className={cl.login__button} onClick={logIn}>
          Login
        </button></div>
        {" "}
      </div>
        
      ) : (
        <div className={cl.login_bottom_wrapper}> <div className={cl.login_text}>
        Already have an account? <Link className={cl.login__link} to="/login">Login</Link>{" "}
        </div>
        <div>
          <button className={cl.login__button} onClick={signIn}>Create</button>
        </div>{" "}
      </div>
       
      )}
        </div>
      
    </div>
  );
});
export default Login;
