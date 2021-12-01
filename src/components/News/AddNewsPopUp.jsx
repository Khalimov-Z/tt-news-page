import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { setNewsData } from "../../redux/ducks/reducer";
import closeBtn from "../../../src/assets/images/close-btn.svg";

function AddNewsPopUp({ setShowPopUp, setLocalNewsData }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handlePopUpFade = (e) => {
      if (e.key === "Escape") setShowPopUp(false);
    };
    window.addEventListener("keyup", handlePopUpFade);

    return () => window.removeEventListener("keyup", handlePopUpFade);
  }, [setShowPopUp]);

  return (
    <div className="popUp">
      <div className="popUp__body">
        <Formik
          initialValues={{ title: "", content: "" }}
          onSubmit={(values) => {
            const newsData = JSON.parse(localStorage.getItem("newsData"));

            const date = new Date();

            let day = String(date.getDate()).padStart(2, "0");
            let month = String(date.getMonth() + 1).padStart(2, "0");
            let year = date.getFullYear();

            const obj = {
              id: newsData.length,
              title: values.title,
              content: values.content,
              date: `${day}.${month}.${year}`,
              approved: false,
            };

            newsData.push(obj);
            dispatch(setNewsData(newsData));
            setLocalNewsData(newsData);
            localStorage.setItem("newsData", JSON.stringify(newsData));

            setShowPopUp(false);
          }}
          validate={(values) => {
            const errors = {};

            if (!values.title || !values.content)
              errors.content = "Поля не должны быть пустые";

            return errors;
          }}
        >
          <Form>
            <div>
              <Field name="title" type="text" placeholder="Заголовок" />
            </div>
            <div>
              <Field
                as="textarea"
                name="content"
                type=""
                placeholder="Описание"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="popUp__error-message"
              />
            </div>
            <div>
              <button type="submit">Добавить</button>
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

export default AddNewsPopUp;
