import {useState} from 'react'

export default ({children, collapse, title}) => {
	const [show, setShow] = useState(!collapse)

	return (
		<>
			<h2
				className="self-center my-2 text-2xl cursor-pointer bg-blue-300 rounded-lg px-2 py-1"
				onClick={(e) => setShow(!show)}
			>
				{title} <span>{show ? '⏬' : '⏫'}</span>
			</h2>
			{show && children}
		</>
	)
}
