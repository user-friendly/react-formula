import {useContext} from 'react'
import {Link} from "react-router"
import clsx from "clsx"

import ThemeContext from "../ThemeContext"

const DOT_COLOR = {
  cyan: "bg-cyan-400",
  rose: "bg-rose-400",
  yellow: "bg-yellow-400",
};

const NavBar = (props) => {
  const [themeColor, setThemeColor] = useContext(ThemeContext)

  return (
    <nav className="flex justify-center px-2 shadow-lg">
      <div className="flex justify-between w-full max-w-4xl py-4">
        <Link className="flex items-center" to="/lesson/react-hooks/">
          <img
            className="w-[80px]"
            src="https://static-task-assets.react-formula.com/649213.png"
          />
          <div className="ml-2 text-3xl font-bold text-orange-900 font-nunito">
            Bork
          </div>
        </Link>
        <div className="flex items-center text-gray-400">
          <Link className="flex items-center px-4" to="/lesson/react-hooks/breeds">
            <i className="mr-2 text-2xl fa-regular fa-paw"></i>
            breeds
          </Link>
          <Link className="flex items-center px-4" to="/lesson/react-hooks/">
            <i className="mr-2 text-2xl fa-regular fa-right-to-bracket"></i>
            sign-in
          </Link>
          <div className="flex items-center px-4">
            <div
              className={clsx("w-4 h-4 rounded-full", DOT_COLOR[themeColor])}
            ></div>
            <select
              onChange={(e) => setThemeColor(e.target.value)}
              value={themeColor}
            >
              <option value="cyan">cyan</option>
              <option value="rose">rose</option>
              <option value="yellow">yellow</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar
