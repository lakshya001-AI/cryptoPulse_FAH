import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";

function MainPage() {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);

  function logoutUser() {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  let userFirstName = localStorage.getItem("userFirstName") || "John";
  let userLastName = localStorage.getItem("userLastName") || "Doe";
  let userEmailAddress = localStorage.getItem("userEmailAddress") || "john.doe@example.com";


  return (
    <>
      <div className={Style.mainDiv}>
        <div className={Style.mainPageMainDiv}>
          <div className={Style.navBarMainPage}>
            <div className={Style.logoNavBarMainPage}>
              <h1>CryptoPulse</h1>
            </div>

            <div className={Style.ProfileBtnNavBarMainPage}>
              <button
                className={Style.profileBtn}
                onClick={() => setShowUserInfo(!showUserInfo)}
              >
                Profile
              </button>

              {showUserInfo && (
                <div className={Style.userInfoDiv}>
                  <p
                    className={Style.userInfoDivPara1}
                  >{`${userFirstName} ${userLastName}`}</p>
                  <p className={Style.userInfoDivPara2}>{userEmailAddress}</p>
                  <button className={Style.logoutBtn} onClick={logoutUser}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={Style.footerSection}>
            <p>© 2024 CryptoPulse. All rights reserved.</p>
          </div>

       
        </div>
      </div>
    </>
  );
}

export default MainPage;
