import React from "react";
import styles from "./Header.module.css";
import Rectangle1 from "../assets/Rectangle1.png";
import Rectangle2 from "../assets/Rectangle2.png";
import Rectangle3 from "../assets/Rectangle3.png";
import Rectangle4 from "../assets/Rectangle4.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

  const token = useSelector((state) => state.token);
  
  // const data = useSelector((state) => state.user);
  const data = JSON.parse(localStorage.getItem("user"))

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  const getInitials = (user) => {
    if (!user || !user.name) return '';
    const nameParts = user.name.split(' ');
    if (nameParts.length < 2) return nameParts[0].charAt(0).toUpperCase();
    const firstLetter = nameParts[0].charAt(0).toUpperCase();
    const secondLetter = nameParts[1].charAt(0).toUpperCase();
    return `${firstLetter}${secondLetter}`;
  };

  return (
    <div className={styles.header}>
      <div className={styles.textheading}>
        <p>Jobfinder</p>
      </div>
      <img src={Rectangle1} style={{ width: "100vw", height: "15vh" }} />

      <div>
        <div className={styles.header2}>
          <img
            src={Rectangle2}
            style={{ width: "23vw", height: "8.56vh" }}
          ></img>
        </div>
        <div className={styles.header3}>
          <img src={Rectangle3} style={{ width: "23vw", height: "9vh" }}></img>
        </div>
        <div className={styles.header4}>
          <img src={Rectangle4} style={{ width: "23vw", height: "15vh" }}></img>
        </div>
      </div>
      <div className={styles.navButtons}>
        {token && data ? (
          <div className={styles.logoutContainer}>
            <span className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </span>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{data?.name}</span>
              <div className={styles.circle}>{getInitials(data)}</div>
            </div>
          </div>
        ) : (
          <>
            <button className={styles.loginButton} onClick={handleLoginClick}>
              Login
            </button>
            <button
              className={styles.registerButton}
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
