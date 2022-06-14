import { useNavigate, useLocation } from "react-router-dom";

function useNavigateLogin() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login", { state: { from: location }, replace: true });
  };

  return navigateLogin;
}

export default useNavigateLogin;
