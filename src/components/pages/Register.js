import React, { useState } from "react";
import useValidate from "../../hooks/useValidate";
import axios from "../../axios/axios";
import Navigation from "../Navigation";

function Register() {
  const { error, email, password, setEmail, setPassword } = useValidate();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const buttonStyling = isLoading
    ? { className: "button is-primary is-loading" }
    : { className: "button is-primary" };
  const emailStyling = !email
    ? { className: "input" }
    : error.email
    ? { className: "input is-danger" }
    : { className: "input is-success" };
  const passwordStyling = !password
    ? { className: "input" }
    : error.password
    ? { className: "input is-danger" }
    : { className: "input is-success" };

  const buttonDisabled = error.email || error.password ? true : false;

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
      .post("/register", { email, password })
      .then((response) => {
        setSuccess(true);
        setFailure(false);
        setEmail("");
        setPassword("");
        setIsLoading(false);
      })
      .catch((error) => {
        setSuccess(false);
        setFailure(true);
        setEmail("");
        setPassword("");
        setIsLoading(false);
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
          {success && (
            <div className="notification is-success is-light">
              Successfully registered
            </div>
          )}
          {failure && (
            <div className="notification is-danger is-light">
              An account with that email already exists
            </div>
          )}
          <form className="box" onSubmit={handleSubmit}>
            <div className="block">
              <div className="field">
                <h1 className="title">Register</h1>
              </div>
            </div>
            <div className="block">
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    {...emailStyling}
                    type="email"
                    name="email"
                    placeholder="e.g. email@example.com"
                    value={email}
                    onChange={(e) => {
                      setSuccess(false);
                      setFailure(false);
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                {email && error.email && (
                  <p className="help is-danger">Invalid email address</p>
                )}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    {...passwordStyling}
                    type="password"
                    name="password"
                    value={password}
                    placeholder="********"
                    onChange={(e) => {
                      setSuccess(false);
                      setFailure(false);
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                {password && error.password && (
                  <p className="help is-danger">
                    <ul>
                      <li>At least one upper case</li>
                      <li>At least one lower case</li>
                      <li>At least one digit</li>
                      <li>At least one special character</li>
                      <li>Minimum eight in length</li>
                    </ul>
                  </p>
                )}
              </div>
              <div className="field">
                <div className="control">
                  <button
                    {...buttonStyling}
                    type="submit"
                    disabled={buttonDisabled}
                  >
                    Register
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

export default Register;
