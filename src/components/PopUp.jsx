import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogIn } from "../redux/ducks/reducer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { users } from "../databaze/projectData";
import closeBtn from "../../src/assets/images/close-btn.svg";

function PopUp({ setShowPopUp }) {
  useEffect(() => {
    const handlePopUpFade = (e) => {
      if (e.key === "Escape") setShowPopUp(false);
    };
    window.addEventListener("keyup", handlePopUpFade);

    return () => window.removeEventListener("keyup", handlePopUpFade);
  }, [setShowPopUp]);

  const dispatch = useDispatch();
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div className="popUp">
      <div className={"popUp__body"}>
        <Formik
          initialValues={{ login: "", password: "" }}
          onSubmit={() => {
            localStorage.setItem("userInfo", JSON.stringify(loggedInUser));
            dispatch(userLogIn());
            setShowPopUp(false);
          }}
          validate={(values) => {
            const errors = {};
            let flag;

            for (let i = 0; i < users.length; i++) {
              if (
                users[i].userName === values.login &&
                users[i].password === values.password
              ) {
                flag = true;
                setLoggedInUser(users[i]);
                console.log(users[i]);
                break;
              } else flag = false;
            }

            if (!flag) errors.password = "Неверный логин или пароль";

            return errors;
          }}
        >
          <Form>
            <div>
              <Field name="login" type="text" placeholder="Логин" />
            </div>
            <div>
              <Field name="password" type="password" placeholder="Пароль" />
              <ErrorMessage
                name="password"
                component="div"
                className={"popUp__error-message"}
              />
            </div>
            <div>
              <button type="submit">Войти</button>
            </div>
          </Form>
        </Formik>
        <div className="popUp__close-btn" onClick={() => setShowPopUp(false)}>
          <img src={closeBtn} alt="Close" />
        </div>
      </div>
      <div className="popUp__overlay" />
    </div>
  );
}

export default PopUp;
