import {useContext} from 'react'
import {Link} from "react-router-dom"
import clsx from "clsx"
import NavBar from "../Shared/NavBar"
import ThemeContext from "../ThemeContext"

const BUTTON_STYLE = {
  cyan: "bg-cyan-200 text-cyan-800 hover:bg-cyan-300",
  rose: "bg-rose-200 text-rose-800 hover:bg-rose-300",
  yellow: "bg-yellow-200 text-yellow-800 hover:bg-yellow-300",
};

const HomePage = (props) => {
	const [themeColor, setThemeColor] = useContext(ThemeContext)
  
  return (
    <>
      <NavBar />
      <div className="flex justify-center font-pt-sans">
        <div className="flex flex-col items-center w-full max-w-4xl mt-24">
          <img
            className="w-[400px]"
            src="https://static-task-assets.react-formula.com/564595.png"
          />
          <div className="my-12">
            <div className="text-4xl font-medium text-gray-600 font-nunito">
              Dog Breeds, made simple
            </div>
            <div className="text-xl text-gray-500 max-w-[400px] mt-4 mb-8">
              Find a friendly breeder in your area with Bork
            </div>
            <Link
              className={clsx(
                "text-2xl rounded-full px-20 py-3",
                BUTTON_STYLE[themeColor]
              )}
              to="/lesson/react-hooks/breeds"
            >
              begin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage
