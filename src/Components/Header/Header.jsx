import React, { useState } from "react";
import lightLogo from "../../assets/lightLogo.png";
import darkLogo from "../../assets/darkLogo.png";
import wallpaper from "../../assets/friendsWallpaper.jpg";
import { FaRegUserCircle, FaSortDown, FaRegLightbulb } from "react-icons/fa";
import "./Header.css";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";

export default function Header({ setPageHolder }) {
  const { theme, changeTheme } = useTheme();
  const { getUser, logOutUser } = useUser();
  const [clicked, setClicked] = useState(false);

  const changeClicked = () => {
    setClicked((prev) => !prev);
  };

  return (
    <div className="Header" id={theme ? "light-header" : "dark-header"}>
      <img src={theme ? lightLogo : darkLogo} alt="logo" id="logo" />
      <img src={wallpaper} alt="wallpaper" id="wallpaper" />
      <div name="setting" id="setting">
        <div onClick={changeClicked}>
          <FaRegUserCircle /> {getUser()?.name} <FaSortDown />
        </div>
        <button onClick={changeTheme} id="mode">
          <FaRegLightbulb />
        </button>
      </div>
      {clicked && (
        <div id="setting-container">
          {getUser()?.admin && (
            <button
              onClick={() => {
                setPageHolder("Admin");
                setTimeout(() => {
                  setClicked(false);
                }, 2000);
              }}
            >
              Admin
            </button>
          )}
          <button
            onClick={() => {
              logOutUser();
              setPageHolder("Login");
              setTimeout(() => {
                setClicked(false);
              }, 2000);
            }}
          >
            LogOut
          </button>
        </div>
      )}
    </div>
  );
}
