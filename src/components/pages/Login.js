import React from "react";
import { useState } from "react";
import axios from "../../axios/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../Navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const buttonStyling = isLoading
    ? { className: "button is-primary is-loading" }
    : { className: "button is-primary" };

  const buttonDisabled = !email || !password ? true : false;

  const style = {
    backgroundImage: "url(/images/background.png)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("/auth/login", { email, password })
      .then((response) => {
        const newState = {
          email,
          accessToken: response.data.accessToken,
        };
        setAuth(newState);
        localStorage.setItem("user", JSON.stringify(newState));
        setEmail("");
        setPassword("");
        setError(false);
        setIsLoading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setEmail("");
        setPassword("");
        setError(true);
        setIsLoading(false);
        console.log(error);
      });
  }
  return (
    <div style={style}>
      <Navigation />
      <div className="columns is-multiline">
        <div className="column is-full">
          <div style={{ height: "50px" }}></div>
        </div>
        <div className="column is-half is-offset-one-quarter">
          {error && (
            <div className="notification is-danger is-light">
              Incorrect password or email
            </div>
          )}
          <form className="box" onSubmit={handleSubmit}>
            <div className="block">
              <div className="field">
                <h1 className="title">Log in</h1>
              </div>
            </div>
            <div className="block">
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="e.g. email@example.com"
                    value={email}
                    onChange={(e) => {
                      setError(false);
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => {
                      setError(false);
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    {...buttonStyling}
                    disabled={buttonDisabled}
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
