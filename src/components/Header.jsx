import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLogOut } from "../redux/ducks/reducer";
import logo from "../../src/assets/images/Main_img.svg";

function Header({ setShowPopUp }) {
  const isLoggedIn = useSelector((state) => state.loggedInStatus);
  const dispatch = useDispatch();

  return (
    <div className="header">
      <nav className="header__nav">
        <NavLink to="/">
          <img src={logo} alt="img" />
        </NavLink>
        <NavLink to="news/">Новости</NavLink>
      </nav>

      {isLoggedIn ? (
        <button
          className="header__button btn"
          type="button"
          onClick={() => dispatch(userLogOut())}
        >
          Выход
        </button>
      ) : (
        <button
          className="header__button btn"
          type="button"
          onClick={() => setShowPopUp(true)}
        >
          Вход
        </button>
      )}
    </div>
  );
}

export default Header;
