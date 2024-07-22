import React, { useState } from "react";
import styles from "./Register.module.css";
import img from "../assets/register.png";
import { signup } from "../apis/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [signUp, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    agreedToTerms: false,
  });

  const handleChangeSignUp = (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpData({ ...signUp, [name]: type === "checkbox" ? checked : value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!signUp.agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    const response = await signup({ ...signUp });
    if (response.success) {
      alert("Account created successfully!");
      navigate('/login');
    } else {
      alert(response.message);
    }
  };
  const handlClick=()=>{
    navigate('/login');
  }

  return (
    <div className={styles.register}>
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <h2>Create an account</h2>
          <p>Your personal job finder is here</p>
          <form onSubmit={handleSignUpSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="name"
                placeholder="Name"
                name="name"
                value={signUp.name}
                onChange={handleChangeSignUp}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                name="email"
                value={signUp.email}
                onChange={handleChangeSignUp}
                placeholder="Email"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={signUp.mobile}
                onChange={handleChangeSignUp}
                placeholder="Mobile"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                id="password"
                name="password"
                value={signUp.password}
                onChange={handleChangeSignUp}
                placeholder="Password"
                required
              />
            </div>
            <div className={styles.signIncheckbox}>
              <label>
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={signUp.agreedToTerms}
                  onChange={handleChangeSignUp}
                  required
                />
                <p>
                  By creating an account, I agree to our terms of use and
                  privacy policy.
                </p>
              </label>
            </div>
            <button type="submit" className={styles.btnSignin}>
              Create Account
            </button>
          </form>
          <p className={styles.signupLink}>
            Already have an account?{" "}
            <a onClick={handlClick} style={{ cursor: 'pointer' }}>Sign In</a>
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

export default Register;
