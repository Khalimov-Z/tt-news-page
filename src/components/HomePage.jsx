import React from "react";
import { useSelector } from "react-redux";

function HomePage(props) {
  const isLoggedIn = useSelector((state) => state.loggedInStatus);
  let userInfo = {},
    userName = "";

  if (isLoggedIn) {
    userInfo = JSON.parse(localStorage["userInfo"]);
    userName = userInfo.userName;
  }

  return (
    <div className="home-page">
      {isLoggedIn ? <h1>{`Привет, ${userName}`}</h1> : <h1>Привет, Гость!</h1>}
    </div>
  );
}

export default HomePage;
