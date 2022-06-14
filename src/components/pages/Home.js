import React from "react";
import Navigation from "../Navigation";

function Home() {
  const style = {
    backgroundImage: "url(/images/background.png)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  };
  return (
    <div style={style}>
      <Navigation />
      <div className="columns is-multiline is-centered">
        <div className="column is-full">
          <div style={{ height: "100px" }}></div>
        </div>
        <div className="column is-four-fifths has-text-centered">
          <p className="is-size-3 has-text-weight-normal is-family-primary">
            Start<b> summarizing</b> long pieces of text using
            <b> NLP Cloud</b>'s Summarization API
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
