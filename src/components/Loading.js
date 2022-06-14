function Loading() {
  return (
    <div className="columns is-multiline is-centered">
      <div className="column is-full">
        <div style={{ height: "100px" }}></div>
      </div>
      <div className="column is-one-third is-flex is-justify-content-center">
        <div
          className="loader is-loading"
          style={{ height: "80px", width: "80px" }}
        ></div>
      </div>
    </div>
  );
}

export default Loading;
