const initialNewsData = [
  {
    id: 0,
    title: "Red lines",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "10.11.2021",
    approved: true,
  },
  {
    id: 1,
    title: "Be fit",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "3.07.2021",
    approved: true,
  },
  {
    id: 2,
    title: "New collection",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "01.08.2020",
    approved: true,
  },
];

const initialState = {
  loggedInStatus: localStorage["isLogged"] === "true",
  newsData: JSON.parse(localStorage.getItem("newsData")) || initialNewsData,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      localStorage.setItem("isLogged", true);
      return { ...state, loggedInStatus: true };
    case USER_LOGOUT:
      localStorage.setItem("isLogged", false);
      return { ...state, loggedInStatus: false };
    case SET_NEWS_DATA:
      localStorage.setItem("newsData", JSON.stringify(action.payload));
      return { ...state, newsData: action.payload };
    default:
      return { ...state };
  }
};

const USER_LOGIN = "USER_LOGIN";
const USER_LOGOUT = "USER_LOGOUT";
const SET_NEWS_DATA = "SET_NEWS_DATA";

export const userLogIn = () => {
  return {
    type: USER_LOGIN,
  };
};

export const userLogOut = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const setNewsData = (data) => {
  return {
    type: SET_NEWS_DATA,
    payload: data,
  };
};
