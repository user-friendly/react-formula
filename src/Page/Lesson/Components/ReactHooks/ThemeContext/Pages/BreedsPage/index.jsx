import { useState, useEffect } from "react";
import clsx from "clsx";
import NavBar from "../../Shared/NavBar";
import * as BreedService from "../../Services/Breed";
import BreedItem from "./BreedItem";

const SPINNER_STYLE = {
  cyan: "text-cyan-500",
  rose: "text-rose-500",
  yellow: "text-yellow-500",
};

const BreedsPage = (props) => {
  const { themeColor, setThemeColor } = props;
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await BreedService.getBreeds();
      setBreeds(await response.json());
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <NavBar themeColor={themeColor} setThemeColor={setThemeColor} />
      <div className="flex justify-center font-pt-sans">
        <div className="flex flex-col items-center w-full max-w-4xl px-2 my-24">
          {isLoading ? (
            <i
              className={clsx(
                "fad fa-spinner-third animate-spin text-4xl my-20",
                SPINNER_STYLE[themeColor]
              )}
            ></i>
          ) : (
            breeds.map((breed, idx) => <BreedItem key={idx} breed={breed} themeColor={themeColor} />)
          )}
        </div>
      </div>
    </>
  );
};

export default BreedsPage;
