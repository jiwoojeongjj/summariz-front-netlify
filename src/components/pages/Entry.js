import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Emoji from "../Emoji";
import Navigation from "../Navigation";

function Entry() {
  return (
    <>
      <Navigation />
      <div className="p-6">
        <nav
          className="navbar is-transparent"
          style={{ backgroundColor: "transparent", backgroundImage: "none" }}
          role="navigation"
          aria-label="main navigation"
        >
          <div id="navbarBasicExample" className="navbar-menu">
            <div
              className="navbar-start"
              style={{ flexGrow: "1", justifyContent: "center" }}
            >
              <NavLink className="navbar-item" to="add">
                <Emoji symbol="➕" />
                <b>Add entry</b>
              </NavLink>
              <NavLink className="navbar-item" to="list">
                <Emoji symbol="📚" />
                <b>List entries</b>
              </NavLink>
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default Entry;
