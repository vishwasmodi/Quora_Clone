import React from "react";
import Search from "./Search";
import "../styles/Nav.css";
import avatar from "../static/avatar.png";

const Nav = ({
  handleLoginClick,
  handleSignupClick,
  articles,
  setArticles,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const handleClickLogin = () => {
    handleLoginClick();
  };
  const handleClickSignup = () => {
    handleSignupClick();
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    window.sessionStorage.clear();
  };
  return (
    <div className="nav">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
          alt=""
        />
      </div>
      <Search articles={articles} setArticles={setArticles} />

      <div>
        {!isLoggedIn ? (
          <div className="log">
            <button
              type="button"
              onClick={handleClickLogin}
              className="loginicon"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={handleClickSignup}
              className="loginicon"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="log">
            <img src={avatar} className="avatar" alt="avatar" />
            <button type="button" onClick={handleLogout} className="loginicon">
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
