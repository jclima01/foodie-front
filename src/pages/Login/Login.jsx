import React from "react";
import s from "./Login.module.css"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className={s.loginContainer}>
      <button onClick={handleClick}>Log in</button>
    </div>
  );
};

export default Login;
