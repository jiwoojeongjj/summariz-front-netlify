import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useNavigateLogin from "../../hooks/useNavigateLogin";
import EntryCard from "../EntryCard";
import Loading from "../Loading";

function EntryList() {
  const { auth } = useAuth();
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const navigateLogin = useNavigateLogin();

  useEffect(() => {
    axios
      .get("/entry/list", { params: { email: auth.email } })
      .then((response) => {
        setEntries(response.data.entryList);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (e.response.status === 401) {
          navigateLogin();
        }
      });
  }, []);

  function onDelete(e) {
    setIsLoading(true);
    const id = e.target.id;
    axios
      .delete("/entry/delete", { data: { id } })
      .then(() => {
        setIsLoading(false);
        setEntries((prevEntries) => {
          return prevEntries.filter((entry) => entry._id !== id);
        });
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }

  return isLoading ? (
    <Loading />
  ) : entries[0] ? (
    <div className="columns is-multiline is-centered">
      {entries.map((entry) => (
        <div className="column is-one-third">
          <EntryCard onDelete={onDelete} key={entry._id}>
            {entry}
          </EntryCard>
        </div>
      ))}
    </div>
  ) : (
    <div className="columns is-multiline is-centered">
      <div className="column is-full">
        <div style={{ height: "100px" }}></div>
      </div>
      <div className="column is-one-third content">
        <p className="has-text-centered">Nothing to display</p>
      </div>
    </div>
  );
}

export default EntryList;
