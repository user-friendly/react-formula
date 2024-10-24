import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import BreedsPage from "./ThemeContext/Pages/BreedsPage";
import HomePage from "./ThemeContext/Pages/HomePage";

const ThemeContext = () => {
  const [themeColor, setThemeColor] = useState("cyan");

  return (
      <Routes>
        <Route
          path="/"
          element={
            <HomePage themeColor={themeColor} setThemeColor={setThemeColor} />
          }
        />
        <Route
          path="/breeds"
          element={
            <BreedsPage themeColor={themeColor} setThemeColor={setThemeColor} />
          }
        />
      </Routes>
  );
};

export default ThemeContext
