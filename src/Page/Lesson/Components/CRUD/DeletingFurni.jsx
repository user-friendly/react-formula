/**
 * Delete Furniture lesson.
 */

import { useState, useEffect } from "react";

const ENDPOINT_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/deleting-furni/furnitures`

const getAllFurnitures = () => {
	return fetch(ENDPOINT_URL)
}

const FurnitureItem = (props) => {
  const { furniture } = props;
  return (
    <div className="flex m-8 border rounded-lg shadow-md border-stone-300 overflow-clip">
      <img
        src={furniture.image}
        className="object-cover w-48 h-48 border-r border-stone-300"
      />
      <div className="flex flex-col w-full px-6 py-4 bg-white">
        <div className="mb-4 text-2xl text-stone-600">{furniture.name}</div>
        <div className="text-stone-500">{furniture.description}</div>
      </div>
    </div>
  )
}

const DeletingFurni = () => {
	const [furnitures, setFurnitures] = useState([]);

	const fetchFurnitures = () => {
	  getAllFurnitures()
	    .then((response) => response.json())
	    .then((data) => setFurnitures(data));
	};

	useEffect(() => {
	  fetchFurnitures();
	}, []);

	const furnitureItems = furnitures.map((furniture, idx) => (
	  <FurnitureItem furniture={furniture} key={furniture.id} />
	))
	
	return 	(
	    <div className="flex justify-center">
	      <div className="w-full max-w-2xl">{furnitureItems}</div>
	    </div>
	  )
}

export default DeletingFurni
