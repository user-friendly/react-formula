import {useState, useEffect} from 'react'

export default () => {
	const [messages, setMessages] = useState([])

	const fetchMessages = () => {
		// FIXME Endpoint needs auth. Mock it.
		fetch(
			'https://api.react-formula.com/learning-api/demos/message-board/messages'
		)
			.then((response) => response.json())
			.then((data) => setMessages(data))
	}

	useEffect(() => {
		// fetchMessages()
	}, [])

	console.log(messages)

	const messageItems = messages.map((message, idx) => (
		<div
			key={idx}
			className="p-6 m-4 border border-gray-300 rounded-md shadow-md"
		>
			<div className="mb-2 text-lg font-medium">{message.username}</div>
			<div>{message.message}</div>
		</div>
	))

	return (
		<div className="flex justify-center">
			<div className="flex flex-col w-full max-w-xl ">{messageItems}</div>
		</div>
	)
}
