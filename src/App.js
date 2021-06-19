import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ShoppingCart from "./pages/ShoppingCart";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (localStorage.getItem("listProducts") === null) {
      localStorage.setItem("listProducts", "");
    }
  }, []);

  const addUsername = (parameterUsername) => {
    setUsername(parameterUsername);
  };

  const ClearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <Router>
      <Layout ClearLocalStorage={ClearLocalStorage} username={username}>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route
            exact
            path="/login"
            render={() => <Login addUsername={addUsername} />}
          />
          <Route exact path="/verifyEmail" component={VerifyEmail} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/detail/:idProduct" component={Detail} />
          <Route exact path="/shoppingCart" component={ShoppingCart} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
