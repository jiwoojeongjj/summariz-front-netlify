import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// this hook allows us to retrieve the auth context
// in other files with less import statements
function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
