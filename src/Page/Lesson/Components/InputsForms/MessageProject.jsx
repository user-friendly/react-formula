
import { useState } from 'react'

import Form from './Components/Form'
import TextInput from './Components/TextInput'

const Message = ({children, animate=false}) => {
	return <div className={`border border-gray-300 px-6 py-3 m-2 rounded-full text-gray-600 ${animate ? 'animate-slideDown' : null}`}>
		{children}
	</div>
}

// Move to whatever HTTP fetch method.
const history = ["Hey programmers!", "what is up", "Hello World!"]

export default ({children}) => {
	const [text, setText] = useState('')
	const [messages, setMessages] = useState([])
	
	const submitHandler = (e) => {
		if (!text.trim()) {
			return
		}
		console.log(`send text: ${text}`)
		setMessages([...messages, text])
		setText('')
	}
	
	return <div className="flex flex-col items-center">
		<Form onSubmit={submitHandler} className="p-2 m-8 flex">
			{/* TextInput fails here. It passes the internal text state to its <input> element. */}
			<input name="message" placeholder="enter a message" value={text}
				className="py-2 px-3 border border-gray-300 rounded-md w-80 focus:outline-purple-600"
				onChange={e => setText(e.target.value)}
			/>
			<button type="submit"
				className="bg-purple-200 text-purple-600 px-8 rounded-md ml-4"
			>Send</button>
		</Form>
		<div className="flex flex-col max-w-lg w-full">
			{history.map((m, i) => <Message key={i} animate={false}>{m}</Message>)}
			{messages.map((m, i) => <Message key={i} animate={true}>{m}</Message>)}
		</div>
	</div>
}
