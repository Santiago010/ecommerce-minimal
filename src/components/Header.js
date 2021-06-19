import React from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";

const Header = ({ username, ClearLocalStorage, useHistory }) => {
  const history = useHistory();
  return (
    <header className="Layout__header">
      <Link to="/home" className="header__Home">
        <i className="fas fa-home"></i>
      </Link>
      <nav className="header__nav">
        {username === "" || undefined ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/home">{username}</Link>
        )}
        <button
          onClick={() => {
            ClearLocalStorage();
            history.push("/home");
            window.location.reload();
          }}
        >
          Logout
        </button>
        <div className="header__shop">
          <Link to="/shoppingCart">
            <i className="fas fa-shopping-basket"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;
