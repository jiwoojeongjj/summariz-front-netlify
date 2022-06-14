import React from "react";

function EntryCard(props) {
  const { onDelete } = props;
  const { title, original, summary, _id } = props.children;

  return (
    <div className="card">
      <div className="card-content">
        <div className="block">
          <p className="subtitle">
            <b>{title}</b>
          </p>
        </div>
        <div className="block">
          <div className="block">
            <div className="content">
              <div className="block">
                <span className="tag is-primary is-medium">Original text</span>
              </div>
              <div className="block">
                <p>{original}</p>
              </div>
            </div>
          </div>
          <div className="block">
            <div className="content">
              <div className="block">
                <span className="tag is-primary is-medium">
                  Summarized text
                </span>
              </div>
              <div className="block">
                <p>{summary}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="block">
          <button
            className="card-footer-item button is-primary is-light"
            id={_id}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryCard;
