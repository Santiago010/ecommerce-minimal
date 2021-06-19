import React from "react";
import { useHistory } from "react-router-dom";
import "./styles/Layout.css";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, ClearLocalStorage, username }) => {
  return (
    <div className="Layout">
      <Header
        ClearLocalStorage={ClearLocalStorage}
        username={username}
        useHistory={useHistory}
      />
      <main className="Layout__content">{children}</main>
      <Footer ClearLocalStorage={ClearLocalStorage} />
    </div>
  );
};
export default Layout;
