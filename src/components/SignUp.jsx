import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { register, getAuth } from "../utils/user";

import styles from "../styles/Signup.module.css";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { userName, email, password };
    try {
      register(user);
      navigate("/");
    } catch (error) {
      alert("User already exists");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    if (auth) navigate("/");
  }, []);

  return (
    <div className={styles.signup}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type={"text"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Enter Your Password</label>
          <input
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type={"submit"} />
      </form>
    </div>
  );
};

export default SignUp;
