import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useNavigateLogin from "../../hooks/useNavigateLogin";

function EntryAdd() {
  const { auth } = useAuth();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const axios = useAxios();
  const navigateLogin = useNavigateLogin();

  const buttonStyling = isLoading
    ? { className: "button is-primary is-loading" }
    : { className: "button is-primary" };
  const buttonDisabled = isDisabled || !title || !text ? true : false;
  const titleDisabled = isLoading ? true : false;
  const textDisabled = isLoading ? true : false;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSummary("");
    setIsDisabled(false);
    setIsLoading(true);
    const data = {
      email: auth.email,
      title,
      text,
    };
    axios
      .post("/entry/add", data)
      .then((response) => {
        setIsLoading(false);
        setSummary(response.data.summary);
      })
      .catch((e) => {
        setIsLoading(false);

        if (e.response.status === 429) {
          setError(e.response.data);
          setIsDisabled(true);
          setTimeout(() => setIsDisabled(false), 60000);
        }
        if (e.response.status === 401) {
          navigateLogin();
        }
      });
  }

  return (
    <>
      <div className="columns is-multiline">
        <div className="column is-full">
          <div style={{ height: "50px" }}></div>
        </div>
        <div className="column is-half is-offset-one-quarter">
          {error && (
            <div className="notification is-danger is-light">
              We can only create 3 requests per minute to NLP Cloud. Please try
              again after one minute.
            </div>
          )}
          <form className="box" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  type="title"
                  name="title"
                  value={title}
                  disabled={titleDisabled}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Text</label>
              <div className="control">
                <textarea
                  className="textarea"
                  type="text"
                  name="text"
                  value={text}
                  disabled={textDisabled}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  {...buttonStyling}
                  type="submit"
                  disabled={buttonDisabled}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          {summary && (
            <div className="box content">
              <div className="block">
                <span className="tag is-primary is-medium">
                  Summarized text
                </span>
              </div>
              <div className="block">
                <p>{summary}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EntryAdd;
