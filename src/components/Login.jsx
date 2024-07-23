import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/auth";
import styles from "./Register.module.css";
import img from "../assets/register.png";
import {useDispatch} from "react-redux";

const Login = () => {
 
  
  const navigate = useNavigate();
  const [signIn, setSignInData] = useState({
    email: "",
    password: "",
  });
  const handleChangeSignIn = (e) => {
    setSignInData({ ...signIn, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (!signIn.email || !signIn.password) {
      alert("Please fill in all fields");
    }
    e.preventDefault();
  const response = await login(signIn);
 
  const token = response?.headers?.authorization?.split(' ')[1] || response?.data?.token;
   console.log("token: " + token);
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.data?.user));
    navigate("/");
  } else {
    alert("Token not found in response headers.");
  }
  };
  const handleClick = () => {
    navigate("/register");
  };
  return (
    <div className={styles.register}>
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <h2>Already have an account?</h2>
          <p>Your personal job finder is here</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                name="email"
                value={signIn.email}
                placeholder="Email"
                onChange={handleChangeSignIn}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                onChange={handleChangeSignIn}
                value={signIn.password}
                required
              />
            </div>
            <button type="submit" className={styles.btnSignin}>
              Sign in
            </button>
          </form>
          <p className={styles.signupLink}>
            Don’t have an account?{" "}
            <a onClick={handleClick} style={{ cursor: "pointer" }}>
              Sign Up
            </a>
          </p>
        </div>

        <div className={styles.loginImage}>
          <h2>Your Personal Job Finder</h2>
          <img src={img} alt="Job Finder" />
        </div>
      </div>
    </div>
  );
};

export default Login;
