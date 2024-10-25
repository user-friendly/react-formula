import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import BreedsPage from "./ThemeContext/Pages/BreedsPage"
import HomePage from "./ThemeContext/Pages/HomePage"

import Context from "./ThemeContext/ThemeContext"

const ThemeContext = () => {
  const [themeColor, setThemeColor] = useState("cyan");

  return (
	<Context.Provider value={[themeColor, setThemeColor]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/breeds" element={<BreedsPage />} />
      </Routes>
    </Context.Provider>
  );
};

export default ThemeContext
