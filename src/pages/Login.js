import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style/Login,Signup.css";

const Login = ({ addUsername }) => {
  const [state, setstate] = useState("");
  const history = useHistory();
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const dataLogin = new FormData(ev.target);
    sendDataUser(dataLogin);
  };

  const sendDataUser = (dataLogin) => {
    fetch("https://sellcars2021.herokuapp.com/api/signin", {
      method: "POST",
      body: JSON.stringify({
        username: dataLogin.get("username"),
        password: dataLogin.get("password"),
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const tokenUser = data.token;

        if (data.authenticated === false) {
          setstate(data.message);
        } else if (data.authenticated) {
          let payload = tokenUser.split(".")[1];
          payload = atob(payload);
          if (data.token) {
            let username = JSON.parse(payload);
            localStorage.setItem("token", tokenUser);
            addUsername(username.username);
            history.push("/home");
          } else {
            setstate("El usuario no existe");
          }
        }
      });
  };

  return (
    <div className="container__form">
      <form className="form" onSubmit={(ev) => handleSubmit(ev)}>
        <div className="form__containers-input">
          <input type="text" name="username" required placeholder="Username" />
        </div>
        <div className="form__containers-input">
          <input type="text" name="password" required placeholder="Password" />
        </div>
        <input type="submit" value="Login" className="form__submit" />
        <div className="form__container-messages">{state}</div>
        <p className="form__singup">
          ¿No tienes cuenta?
          <Link to="/signup"> Regístrate!</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
