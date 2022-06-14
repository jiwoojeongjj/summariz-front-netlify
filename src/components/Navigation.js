import React from "react";
import { NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import Emoji from "./Emoji";

function Navigation() {
  const { auth } = useAuth();
  const logout = useLogout();
  return (
    <div className="px-6 pt-3">
      <nav
        className="navbar is-transparent"
        style={{ backgroundColor: "transparent", backgroundImage: "none" }}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <h1 class="navbar-item title" href="https://bulma.io">
            <b>summariz.</b>
          </h1>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink className="navbar-item" to="/">
              <Emoji symbol="🏠" />
              <b>Home</b>
            </NavLink>
            <NavLink className="navbar-item" to="/entry/add">
              <Emoji symbol="✍️" />
              <b>Entry</b>
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {auth?.accessToken ? (
                  <button className="button is-primary" onClick={logout}>
                    <Emoji symbol="🔒" />
                    Log out
                  </button>
                ) : (
                  <NavLink className="navbar-item" to="/login">
                    <button className="button is-primary">
                      <Emoji symbol="🔓" />
                      Log in
                    </button>
                  </NavLink>
                )}
                {auth?.accessToken && (
                  <NavLink className="navbar-item" to="/user/delete">
                    <button className="button is-danger">
                      <Emoji symbol="🗑️" />
                      Delete account
                    </button>
                  </NavLink>
                )}
                {!auth?.accessToken && (
                  <NavLink className="navbar-item" to="/register">
                    <button className="button is-primary">
                      <Emoji symbol="🧑" />
                      Sign up
                    </button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
