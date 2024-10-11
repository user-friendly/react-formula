import {useState} from 'react'

const JOKE = {
	question: "Why don't eggs tell jokes?",
	answer: "They'd crack each other up.",
}

const ENDPOINT_URL =
	'https://api.react-formula.com/learning-api/demos/random-joke/jokes'

export default (props) => {
	// The joke JSON response object.
	const [joke, setJoke] = useState(null)
	// Wheter to show the punchline or not.
	const [punch, setPunch] = useState(false)

	const fetchHandler = (e) => {
		console.log('get new joke')

		fetch(ENDPOINT_URL)
			.then((r) => r.json())
			.then((d) => {
				setJoke(d)
				setPunch(false)
			})
	}

	const punchHandler = (e) => {
		if (joke) {
			console.log('reveal punch line')
			setPunch(true)
		}
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="text-3xl text-gray-600 mt-4">
				{joke ? joke.question : '[opener goes here]'}
			</div>

			<div className="text-xl text-blue-500 my-4">
				{punch ? joke.answer : '[punch line goes here]'}
			</div>

			<button
				className="rounded-lg px-4 py-2 bg-blue-500 text-white text-xl mb-4"
				onClick={punchHandler}
			>
				Show Answer
			</button>

			<button
				className="rounded-lg px-4 py-2 bg-violet-600 text-white text-xl"
				onClick={fetchHandler}
			>
				New Joke
			</button>
		</div>
	)
}
