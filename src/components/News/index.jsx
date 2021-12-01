import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewsData } from "../../redux/ducks/reducer";
import AddNewsPopUp from "./AddNewsPopUp";

function News(props) {
  const newsData = useSelector((state) => state.newsData);
  const [localNewsData, setLocalNewsData] = useState(newsData);
  const dispatch = useDispatch();
  const { role } = JSON.parse(localStorage["userInfo"]);
  const isLoggedIn = useSelector((state) => state.loggedInStatus);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleApproval = (pos) => {
    const tempArray = [...newsData];
    tempArray[pos].approved = true;
    dispatch(setNewsData(tempArray));
  };

  // eslint-disable-next-line array-callback-return
  const renderNewsData = localNewsData.map((item, pos) => {
    let classList = "news-item";
    if (!item.approved && (role === "admin" || role === "user"))
      classList = `${"news-item"} ${"not-approved"}`;
    return (
      <React.Fragment>
        {!isLoggedIn && !item.approved ? null : (
          <div key={item.id} className={classList}>
            <h2>
              {item.title}
              {!item.approved ? <p>(Ожидает одобрения)</p> : null}
            </h2>
            <p>{item.content}</p>
            <div>
              <span>Опубликовано: </span>
              {item.date}
            </div>
            {!item.approved && role === "admin" ? (
              <>
                <button type="button" onClick={() => handleApproval(pos)}>
                  Одобрить
                </button>
              </>
            ) : null}
          </div>
        )}
      </React.Fragment>
    );
  });
  const filterData = (string) => {
    if (string.length) {
      const tempArray = newsData.filter((item) => {
        for (let key in item) {
          if (
            item[key].toString().toLowerCase().includes(string.toLowerCase())
          ) {
            return item;
          }
        }
        return null;
      });
      setLocalNewsData(tempArray);
    }
  };

  useEffect(() => {
    if (!localStorage["newsData"])
      localStorage.setItem("newsData", JSON.stringify(newsData));
  }, [newsData]);
  return (
    <div className="news-page">
      {showPopUp ? (
        <AddNewsPopUp
          setShowPopUp={setShowPopUp}
          setLocalNewsData={setLocalNewsData}
        />
      ) : null}
      <h1>Новости</h1>
      <form action="">
        <div>
          <input
            type="text"
            placeholder="Поиск"
            onChange={(e) => filterData(e.target.value)}
          />
        </div>
      </form>
      {role === "user" && isLoggedIn ? (
        <button
          className="news-page__add-news"
          onClick={() => setShowPopUp(true)}
        >
          Добавить новость
        </button>
      ) : null}
      {renderNewsData}
    </div>
  );
}

export default News;
