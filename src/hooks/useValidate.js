import { useState, useEffect } from "react";

const emailRegex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
const passwordRegex = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
);

// this hook returns "email" and "password" states along with their setting functions
// such that we can have controlled components
// it also returns an "error" state (that we can use for conditional rendering),
// whose value is recomputed by regex pattern matching
// when either "email" or "password" states change
function useValidate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: false, password: false });

  useEffect(() => {
    setError({
      email: !emailRegex.test(email),
      password: !passwordRegex.test(password),
    });
  }, [email, password]);

  return { error, email, password, setEmail, setPassword };
}

export default useValidate;
