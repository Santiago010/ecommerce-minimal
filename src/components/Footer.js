import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles/Footer.css";

const Footer = ({ ClearLocalStorage }) => {
  const history = useHistory();
  return (
    <footer className="Layout__footer">
      <nav className="footer__links">
        <Link className="Links__childs" to="/home">
          Home
        </Link>
        <Link className="Links__childs" to="/shoppingCart">
          Carrito
        </Link>
        <button
          className="Links__childs"
          style={{
            border: "none",
            background: "trasparent",
          }}
          onClick={() => {
            ClearLocalStorage();
            history.push("/home");
            window.location.reload();
          }}
        >
          Logout
        </button>
        <Link className="Links__childs" to="/signup">
          SignUp
        </Link>
      </nav>
      <div className="footer__code">
        <a target="__blank" href="https://github.com/isildur1-2020/cars.com">
          <i className="fas fa-code"></i>Código Del Proyecto
        </a>
      </div>
      <div className="footer__repositories">
        <div className="repositories__contributor-1">
          Esteban Arias
          <a target="__blank" href="https://github.com/isildur1-2020">
            <i className="fab fa-github-alt"></i>
          </a>
        </div>
        <div className="repositories__contributor-2">
          Santiago Ortiz
          <a target="__blank" href="https://github.com/Santiago010">
            <i className="fab fa-github-alt"></i>
          </a>
        </div>
      </div>
      <div className="footer__description">
        Proyecto final desarrollo web tipo e-commerce, utilizando tecnologías
        como React Js, Node Js, HTML 5, CSS3. Además de herramientas como React
        Router y Express Js.
      </div>
      <p style={{ fontSize: "15px" }}>@Copyright 2021</p>
    </footer>
  );
};
export default Footer;
