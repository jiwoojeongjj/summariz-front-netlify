import axios from "../axios/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

function useAxios() {
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // grab the access token from auth context and set it as the header
        config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => {
      // just like JavaScript event listeners, we need to remove the interceptors so that
      // they do not pile on
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [auth]);
  return axios;
}

export default useAxios;
