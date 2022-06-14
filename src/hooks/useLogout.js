import useAuth from "./useAuth";

function useLogout() {
  const { setAuth } = useAuth();

  const logout = () => {
    setAuth({});
    localStorage.setItem("user", JSON.stringify({}));
  };
  return logout;
}

export default useLogout;
