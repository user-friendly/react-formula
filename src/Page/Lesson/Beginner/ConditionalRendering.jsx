/**
 * Conditional Rendering.
 *
 * Path: /lesson/conditional-rendering-exercise
 */

import {useState} from 'react'

const Widget1 = () => {
	const [reveal, setReveal] = useState(false)

	return (
		<div
			className="
		bg-green-100 border border-green-300 p-4 rounded-lg m-4 text-center
		flex flex-col items-center
	"
		>
			<button
				onClick={(e) => setReveal(!reveal)}
				className="px-4 py-2 bg-teal-500 text-white rounded-full"
			>
				click me
			</button>
			{reveal ? <span className="text-4xl mt-4">🙃</span> : null}
		</div>
	)
}

const Widget2 = () => {
	const [toggle, setToggle] = useState(false)

	const timeout = (e) => {
		setTimeout(() => setToggle(!toggle), 2000)
	}

	return (
		<div
			className="
		bg-sky-100 border border-green-300 p-4 rounded-lg m-4 text-center
		flex flex-col items-center
	"
		>
			<button
				onClick={timeout}
				className={`px-4 py-2 ${toggle ? 'bg-orange-500' : 'bg-blue-500'} text-white rounded-full`}
			>
				click me
			</button>
		</div>
	)
}

const Widget3 = () => {
	const [toggle, setToggle] = useState(false)

	return (
		<div
			className="
		bg-purple-100 border border-green-300 p-4 rounded-lg m-4 text-center
		flex flex-col items-center
	"
		>
			<span className={`text-4xl mb-4 ${!toggle && 'invisible'}`}>💩</span>
			<button
				onClick={(e) => setToggle(!toggle)}
				className="px-4 py-2 bg-fuchsia-500 text-white rounded-full"
			>
				click me
			</button>
		</div>
	)
}

const ConditionalRendering = () => {
	return (
		<div className="h-full flex flex-col flex justify-start items-center gap-y-4 font-noto">
			<Widget1 />
			<Widget2 />
			<Widget3 />
		</div>
	)
}

// Router.setRoute('/lesson/conditional-rendering-exercise', <ConditionalRendering />, 'Conditional Rendering')

export default ConditionalRendering
