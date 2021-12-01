import React, { useState } from "react";
import Header from "./Header";
import News from "./News";
import PopUp from "./PopUp";
import HomePage from "./HomePage";
import { Route, Routes } from "react-router-dom";

function App() {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <div className="App">
      <Header setShowPopUp={setShowPopUp} />

      {showPopUp ? <PopUp setShowPopUp={setShowPopUp} /> : null}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="news/" element={<News />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
