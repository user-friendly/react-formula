import _ from 'lodash'

import {useState, useEffect, useRef} from 'react'

import Form from '#Components/Form'

/**
 * Message JSON structure:
 * {
 * 		username: "johndoe123",
 * 		message: "message text goes here"
 * }
 */

const ENDPOINT_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/message-board/messages`

const MessageBoard = () => {
	const [messages, setMessages] = useState([])
	const [user, setUser] = useState('guest')
	const [text, setText] = useState('')

	const focusToRef = useRef(null)
	const messagesRef = useRef(null)

	const fetchMessages = () => {
		// FIXME Endpoint needs auth. Mock it.
		fetch(ENDPOINT_URL)
			.then((response) => response.json())
			.then((data) => {
				setMessages(data)
				setText('')
			})
			.catch((error) => {
				console.log(`failed to get messages: ${error}`)
			})
	}

	const postMessage = (msg) => {
		const body = JSON.stringify(msg)
		fetch(ENDPOINT_URL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: body,
		})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
				fetchMessages()
			})
			.catch((error) => {
				console.log(`failed to post new message: ${error}`)
			})
	}

	const handleSubmit = (e) => {
		const newMessage = {
			username: user,
			message: text,
		}
		if (_.trim(newMessage.username) == '' || _.trim(newMessage.message) == '') {
			return
		}
		postMessage(newMessage)
	}

	useEffect(() => {
		fetchMessages()
	}, [])

	useEffect(() => {
		messagesRef.current.scrollTop = messagesRef.current.scrollHeight
		focusToRef.current.scrollIntoView(false)
		focusToRef.current.focus()
	}, [messages])

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
		<div ref={focusToRef} className="pb-6 flex flex-col items-center">
			<div
				ref={messagesRef}
				className="w-full max-w-xl flex flex-col max-h-[900px] overscroll-auto overflow-y-auto overflow-x-hidden"
			>
				{messageItems}
			</div>
			<Form
				onSubmit={handleSubmit}
				className="w-full max-w-xl px-2 pr-4 flex items-center"
			>
				<input
					name="username"
					value={user}
					onChange={(e) => setUser(e.target.value)}
					className="w-24 p-1 m-2 border border-gray-300 rounded-md"
				/>
				<input
					name="message"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="enter message"
					autoComplete="off"
					className="flex-1 p-1 m-2 border border-gray-300 rounded-md"
				/>
				<input
					type="submit"
					value="Send"
					className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer"
				/>
			</Form>
		</div>
	)
}

export default MessageBoard
