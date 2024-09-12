/**
 * Analyzing Layouts Exercise.
 * 
 * Path: /lesson/analyzing-layouts-exercise
 */

const quotes = [
	{
	  text: "One of my most productive days was throwing away 1000 lines of code.",
	  author: "Ken Thompson",
	  bio: "Designer of Unix Operating System",
	},
	{
	  text: "A ship in port is safe, but that's not what ships are built for.",
	  author: "Admiral Grace Hopper",
	  bio: "Inventor of Programming Compilers",
	},
	{
	  text: "If you optimize everything, you will always be unhappy.",
	  author: "Donald Knuth",
	  bio: "Pioneer of Algorithm Analysis",
	}
]

const QuoteBox1 = ({text, author, bio}) => {
	return <div className="w-[20rem] flex flex-col">
		<div className="
			p-6 rounded-t-lg
			bg-cyan-600
			text-cyan-200
		">
			{text}
		</div>
		<div className="
			flex flex-col items-center
			p-4 rounded-b-lg
			border border-stone-300
			bg-stone-100
			text-stone-400
		">
			<div className="mb-1 text-cyan-700 text-lg">
				{author}
			</div>
			<div className="text-slate-400">
				{bio}
			</div>
		</div>
	</div>
}

const QuoteBox2 = ({text, author, bio}) => {
	return <div className="flex">
		<div className="
			w-44 p-3
			rounded-l-lg
			bg-blue-600
			text-blue-200
		">
			<div className="text-white text-lg mb-2">
				{author}
			</div>
			<div className="text-xs text-blue-300">
				{bio}
			</div>
		</div>
		<div className="
			w-64
			p-8 rounded-r-full
			border border-stone-300
			text-stone-500
			flex items-center
		">
			{text}
		</div>
	</div>
}

const QuoteBox3 = ({text, author, bio}) => {
	return <div	className="flex flex-col items-start">
		<div className="
			p-6
			rounded-md rounded-bl-none
			bg-rose-400
			text-white
		">
			{text}
		</div>
		<div className="
			p-4
			rounded-b-md
			border-2 border-t-0 border-rose-300
			bg-rose-100
		">
			<div className="text-rose-700 text-sm">
				{author}
			</div>
			<div className="text-rose-500 text-xs">
				{bio}
			</div>
		</div>
	</div>
}

const AnalyzingLayoutsExercise = () => {
	return <div className="h-full flex flex-col justify-between">
		<h2 className="text-4xl text-center pb-6">Analyzing Layouts Exercise</h2>
		
		<div className="
			bg-white grow
			text-sm flex flex-col justify-evenly gap-y-4 items-center
		">
			<QuoteBox1 {...quotes[0]} />
			<QuoteBox2 {...quotes[1]} />
			<QuoteBox3 {...quotes[2]} />
		</div>
	</div>
}

export default AnalyzingLayoutsExercise
