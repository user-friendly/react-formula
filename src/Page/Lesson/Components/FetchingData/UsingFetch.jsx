import {useState} from 'react'

const RECIPE = {
	name: 'Pho',
	image_url: 'https://static-task-assets.react-formula.com/239035.jpg',
}

const ENDPOINT_URL =
	'https://api.react-formula.com/learning-api/demos/using-fetch/recipes'

const RecipeCard = ({recipe}) => {
	return (
		<div className="m-8">
			<div className="py-4 text-3xl text-center text-yellow-100 bg-yellow-500 rounded-t-lg">
				{recipe.name}
			</div>
			<img
				className="object-cover w-[400px] h-[320px] rounded-b-lg"
				src={recipe.image_url}
			/>
		</div>
	)
}

export default (props) => {
	const [recipe, setRecipe] = useState(null)

	const randomRecipeHandler = (e) => {
		fetch(ENDPOINT_URL)
			.then((r) => r.json())
			.then((d) => setRecipe(d))
	}

	return (
		<div className="flex flex-col justify-center items-center">
			{recipe !== null ? (
				<RecipeCard recipe={recipe} />
			) : (
				<span className="text-lg p-4 font-bold">No recipe loaded</span>
			)}
			<button
				className="rounded-full px-4 py-2 bg-blue-400 text-white"
				onClick={randomRecipeHandler}
			>
				Get Random Recipe
			</button>
		</div>
	)
}
