import {useContext} from 'react'
import {MessageContext} from '../Contexts'

const Title = (props) => {
	const {message, setMessage} = useContext(MessageContext)
	
	return (
		<div className="p-2 m-2 border-4 border-violet-400 text-violet-600">
			<div>Title</div>
			<div className="text-3xl text-center text-black">{message}</div>
			<div>
				{typeof message === 'object' &&
					<button
						className="px-6 py-2 m-4 rounded-full bg-stone-200"
						onClick={() => setMessage('hey programmers')}
					>
						Reset
					</button>
				}
			</div>
		</div>
	)
}

export default Title
