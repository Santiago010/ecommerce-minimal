import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style/Login,Signup.css";

const Signup = () => {
  const history = useHistory();
  const [state, setstate] = useState("");
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const dataSignup = new FormData(ev.target);

    sendDataUser(dataSignup);
  };

  const sendDataUser = (dataSignup) => {
    fetch("https://sellcars2021.herokuapp.com/api/register", {
      method: "POST",
      body: JSON.stringify({
        username: dataSignup.get("username"),
        email: dataSignup.get("email"),
        password: dataSignup.get("password"),
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        switch (data.authenticated) {
          case "En espera":
            setstate(
              `Usuario ${data.user.username} en espera de confirmar su correo`
            );
            history.push("/verifyEmail", data.user.username);

            break;
          case false:
            if (data.message.includes("E11000")) {
              setstate(`El usuario ya existe, ingresa a tu cuenta`);
            } else if (data.message.includes("password")) {
              setstate(`La contraseña debe tener mas 8 caracteres`);
            }
            break;
        }
      });
  };
  return (
    <div className="container__form" onSubmit={(ev) => handleSubmit(ev)}>
      <form className="form">
        <h3>Ingresa tus datos</h3>
        <div className="form__containers-input">
          <input
            type="text"
            name="username"
            required
            placeholder="username"
          />
        </div>
        <div className="form__containers-input">
          <input type="text" name="email" required placeholder="email" />
        </div>
        <div className="form__containers-input">
          <input
            type="password"
            name="password"
            required
            placeholder="password"
          />
        </div>
        <div className="form__containers-input">
          <input type="number" name="document" placeholder="CC" />
        </div>
        <div className="form__containers-input">
          <input type="text" name="name" placeholder="nombres" />
        </div>
        <div className="form__containers-input">
          <input type="text" name="lastName" placeholder="apellidos" />
        </div>
        <div className="form__containers-input">
          <select name="gender" id="">
            <option value="masculino">masculino</option>
            <option value="femenino">femenino</option>
          </select>
        </div>
        <div className="form__containers-input">
          <input
            type="number"
            name="phoneNumber"
            placeholder="número celular"
          />
        </div>
        <div className="form__containers-input">
          <input type="text" name="city" placeholder="Ciudad" />
        </div>
        <div className="form__containers-input">
          <input type="text" name="address" placeholder="Dirección" />
        </div>
        <input type="submit" value="Crear Cuenta" className="form__submit" />
        <div className="form__container-messages">{state}</div>
      </form>
    </div>
  );
};

export default Signup;
