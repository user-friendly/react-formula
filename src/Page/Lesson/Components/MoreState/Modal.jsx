import {useState} from 'react'

const Recipe = ({children, isExpanded = false}) => {
	return (
		<div
			className={`flex flex-col items-center p-4 ${isExpanded ? 'bg-neutral-700 text-white rounded-xl' : ''}`}
		>
			<div className="w-full max-w-3xl">
				<h2 className="my-6 text-3xl">Classic Chocolate Chip Cookies</h2>
				<p className="my-4 leading-relaxed">
					Preheat your oven to 350°F (175°C) and line a baking sheet with
					parchment paper. In a large mixing bowl, cream together 1 cup (2
					sticks) of softened unsalted butter and 1 cup of packed brown sugar
					until light and fluffy. Add in 2 large eggs, one at a time, beating
					well after each addition. Stir in 1 teaspoon of vanilla extract.
				</p>
				<p className="my-4 leading-relaxed">
					In a separate bowl, whisk together 2 and 1/4 cups of all-purpose
					flour, 1/2 teaspoon of baking soda, and 1/2 teaspoon of salt.
					Gradually add the dry ingredients to the wet ingredients, mixing until
					just combined. Fold in 2 cups of chocolate chips or chunks.
				</p>
				<p className="my-4 leading-relaxed">
					Drop rounded tablespoons of dough onto the prepared baking sheet,
					leaving enough space between each cookie. Bake in the preheated oven
					for 10-12 minutes or until the edges are golden brown. Allow the
					cookies to cool on the baking sheet for a few minutes before
					transferring them to a wire rack to cool completely. Enjoy your
					homemade classic chocolate chip cookies with a glass of milk!
				</p>
				<p className="my-4 leading-relaxed">
					These cookies are sure to be a hit with friends and family. Feel free
					to customize the recipe by adding nuts, dried fruits, or your favorite
					mix-ins for a unique twist!
				</p>
			</div>
		</div>
	)
}

export default ({children}) => {
	const [isModal, setModal] = useState(false)

	return (
		<div
			className={`
		${isModal ? 'fixed top-0 left-0 w-full h-full' : 'relative rounded-xl'}
		flex flex-col justify-start items-center pt-10
		${isModal ? 'bg-neutral-500/75 backdrop-blur-sm' : 'bg-neutral-200'}
		
	`}
		>
			<button
				className={`
			absolute px-4 py-1 top-2 right-2 rounded-xl
			bg-orange-200 text-neutral-600 font-bold font-noto
		`}
				onClick={(e) => setModal(!isModal)}
			>
				{isModal ? 'Retract ➖' : 'Expand 🔲'}
			</button>
			<Recipe isExpanded={isModal} />
		</div>
	)
}
