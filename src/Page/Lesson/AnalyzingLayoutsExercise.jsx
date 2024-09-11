/**
 * Analyzing Layouts Exercise.
 * 
 * Path: 
 */

const QuoteBox1 = () => {
	return <div className="w-72">
		<p className="rounded-t-lg bg-cyan-600 p-6 text-cyan-200">
			One of my most productive days was throwing away 1000 lines of code.
		</p>
		<p className="border border-t-0 border-gray-400 rounded-b-lg bg-stone-100 text-center text-stone-400 p-4">
			<strong className="text-cyan-600 text-md">Ken Thompson</strong>
			<br />
			Designer of Unix Operating System
		</p>
	</div>
}

const QuoteBox2 = () => {
	return <div className="w-96 flex flex-row-reverse">
		<div className="
			content-center
			rounded-r-full p-6 text-stone-500
			border border-gray-400
			text-xs
		">
			A ship in port is safe, but that's not what ships are built for.
		</div>
		<div className="rounded-l-lg bg-blue-700 text-blue-200 p-4">
			<p className="text-stone-200 text-lg">Admiral Grace Hopper</p>
			<p className="text-xs text-blue-300">Inventor of Programming Compilers</p>
		</div>
	</div>
}

const QuoteBox3 = () => {
	return <div	className="w-80">
		<div className="
			bg-rose-400 p-6 text-gray-100
			rounded-md rounded-bl-none
		">
			If you optimize everything, you will always be unhappy.
		</div>
		<div className="
			bg-rose-100 text-stone-400 text-xs p-4
			border-2 border-rose-300 border-t-0 rounded-b-md
			w-1/2
		">
			<p className="text-rose-600 font-bold text-md">Donald Knuth</p>
			<p className="text-rose-400 text-xs">Pioneer of Algorithm Analysis</p>
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
			<QuoteBox1 />
			<QuoteBox2 />
			<QuoteBox3 />
		</div>
	</div>
}

export default AnalyzingLayoutsExercise
