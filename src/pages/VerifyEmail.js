import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style/VerifyEmail.css";
import ImageMail from "../images/undraw_mail_2_tqip.svg";

const VerifyEmail = (props) => {
  const history = useHistory();
  const [state, setstate] = useState("");
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const dataLogin = new FormData(ev.target);
    sendDataUser(dataLogin);
  };

  const sendDataUser = (dataLogin) => {
    fetch("https://sellcars2021.herokuapp.com/api/register/code", {
      method: "POST",
      body: JSON.stringify({
        username: dataLogin.get("username"),
        codigoVerificacion: dataLogin.get("codigoVerificacion"),
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setstate(data.message);
        history.push("/login", props.location.state);
      });
  };
  return (
    <div className="container">
      <div className="container__container-principal">
        <div className="container-principal__image">
          <img src={ImageMail} alt="" />
        </div>
        <form
          className="container-principal__form"
          onSubmit={(ev) => handleSubmit(ev)}
        >
          <input type="hidden" name="username" value={props.location.state} />
          <div className="form__containers-input">
            <input
              type="number"
              name="codigoVerificacion"
              required
              placeholder="Codigo de verificacion"
            />
          </div>
          <input className="form__submit" type="submit" value="Verificar" />
        </form>
        <div className="container-principal__message">{state}</div>
      </div>
    </div>
  );
};

export default VerifyEmail;
