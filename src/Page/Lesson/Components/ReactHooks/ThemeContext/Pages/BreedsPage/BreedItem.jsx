import {useContext} from 'react'
import clsx from "clsx"

import ThemeContext from "../../ThemeContext"

const BAR_STYLE = {
  cyan: "bg-cyan-400",
  rose: "bg-rose-400",
  yellow: "bg-yellow-400",
};

const BreedItem = (props) => {
  const { breed } = props
  const [themeColor, setThemeColor] = useContext(ThemeContext)
  
  return (
    <div className="flex my-6 border border-gray-300 rounded-lg overflow-clip">
      <div className="relative">
        <img src={breed.image_source} className="object-cover w-80 h-80" />
        <div className="top-0 left-0 w-full h-full absolute bg-gradient-to-t from-black/70 to-30%"></div>
        <div className="absolute bottom-0 m-4 text-xl text-white font-nunito">
          {breed.name}
        </div>
      </div>
      <div className="relative flex-1 p-4 text-gray-600 border-l border-gray-200 font-pt-sans">
        {breed.description}
        <div
          className={clsx(
            "top-0 right-0 w-2 absolute h-full",
            BAR_STYLE[themeColor]
          )}
        ></div>
      </div>
    </div>
  );
};

export default BreedItem
