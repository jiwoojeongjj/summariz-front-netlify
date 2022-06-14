import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Protected from "./components/Protected";
import Entry from "./components/pages/Entry";
import EntryAdd from "./components/pages/EntryAdd";
import EntryList from "./components/pages/EntryList";
import UserDelete from "./components/pages/UserDelete";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Protected />}>
        <Route path="/entry" element={<Entry />}>
          <Route path="add" element={<EntryAdd />} />
          <Route path="list" element={<EntryList />} />
        </Route>
        <Route path="/user/delete" element={<UserDelete />} />
      </Route>
    </Routes>
  );
}

export default App;
