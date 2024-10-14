import {http, HttpResponse} from 'msw'

const ENDPOINT_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/message-board/messages`

const messages = []

function addMessage(username, message) {
	const newMessage = 	{
			username: username,
			message: message,
		}
	messages.push(newMessage)
	return newMessage
}

addMessage('John Doe', 'Hello programmers!')
addMessage('Jane Dowe', 'How\'s it going?')
addMessage('John Doe', 'Great! I just finished learning about Mock Service Worker.')
addMessage('Jane Dowe', 'That is amazing!!!')
addMessage('jacksparrow123', 'pretty nifty :)')
addMessage('meatcanyon404', 'c0mℇ τo p∀p∀')

const MessageBoard = [
	http.get(`${ENDPOINT_BASE_URL}`, ({cookies}) => {
		return HttpResponse.json(messages)
	}),
	http.post(`${ENDPOINT_BASE_URL}`, async ({cookies, request}) => {
		if (request.headers.get('content-type') !== 'application/json') {
			return new HttpResponse(null, {
				status: 415,
				headers: {
					'Accept-Type': 'application/json'
				}
			})
		}
		
		const reqBody = await request.json()
		const msg = addMessage(reqBody.username, reqBody.message)
		return HttpResponse.json(msg, {status: 201})
	}),
]

export default MessageBoard
