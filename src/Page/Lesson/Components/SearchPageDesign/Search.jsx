/**
 * Main view for search.
 */

import Button from '#Button'

const searchIcon = '🔍'

const styleButton = `
	px-8 py-2
	rounded-lg
	bg-violet-200
	text-violet-500
`

const Search = () => {
	return (
		<div
			className="
		flex-1
		flex flex-col justify-center items-center
		bg-orange-100
	"
		>
			{/* Heading */}
			<h1
				className="
			mb-8
			text-7xl
			text-orange-400
		"
			>
				Foogle
			</h1>

			{/* Search Box */}
			<div
				className="
			py-4 px-6 mb-8 w-[32rem]
			rounded-full
			border border-orange-400
			bg-orange-200
			text-lg
			text-orange-700
			
			flex flex-row justify-center items-center
		"
			>
				<span className="font-noto text-2xl">{searchIcon}</span>
				<input
					className="flex-1 ml-4 bg-orange-200"
					type="text"
					name="search"
					defaultValue="Enter Your search here!"
				/>
			</div>

			<div className="flex flex-row justify-center items-center gap-4">
				<Button type="route" route="/search" style={styleButton}>
					Foogle Search
				</Button>
				<Button type="route" route="/search/image" style={styleButton}>
					Image Search
				</Button>
			</div>
		</div>
	)
}

export default Search
