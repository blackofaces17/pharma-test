import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login, getAuth } from "../utils/user";

import styles from "../styles/Login.module.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { userName, password };
    try {
      login(user);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    if (auth) navigate("/");
  }, []);

  return (
    <div className={styles.login}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>username</label>
          <input
            type={"text"}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type={"submit"} />
      </form>
      <div className="signuplink">
        <Link to={"/signup"}>user signup</Link>
      </div>
    </div>
  );
};

export default Login;
