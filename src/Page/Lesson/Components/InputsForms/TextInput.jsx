import {useState} from 'react'

export default ({children}) => {
	const [text, setText] = useState('Hello Input')

	return (
		<div className="mt-4 flex flex-col justify-center items-center">
			<input
				className="bg-orange-100 rounded-lg p-2 text-neutral-700 border-2 border-neutral-300 focus:border-green-400 outline-none"
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<span>ChatBot says: {text}</span>
		</div>
	)
}
