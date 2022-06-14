import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAxios from "../../hooks/useAxios";
import Navigation from "../Navigation";

function UserDelete() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { auth } = useAuth();
  const axios = useAxios();
  const logout = useLogout();
  const navigate = useNavigate();

  const email = auth?.email;

  const buttonStyling = isLoading
    ? { className: "button is-primary is-loading" }
    : { className: "button is-primary" };

  const buttonDisabled = !password ? true : false;

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    axios
      .delete("/user/delete", { data: { email, password } })
      .then(() => {
        setIsLoading(false);
        setError(false);
        logout();
        navigate("/");
      })
      .catch((e) => {
        setIsLoading(false);
        setError(true);
        console.log(e);
      });
  }
  return (
    <>
      <Navigation />
      <div className="columns is-multiline">
        <div className="column is-full">
          <div style={{ height: "50px" }}></div>
        </div>
        <div className="column is-half is-offset-one-quarter">
          <div className="notification is-info is-light">
            Please enter your password to confirm the deletion
          </div>
          {error && (
            <div className="notification is-danger is-light">
              Incorrect password
            </div>
          )}
          <form className="box" onSubmit={handleSubmit}>
            <div className="block">
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
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserDelete;
