import { useState } from 'react'

const max = 10

function add(c) {
	return c < max ? ++c : c
}

function remove(c) {
	return c > 0 ? --c : c
}

export default ({children, show = true}) => {
	const [size, setSize] = useState(2)
	
	const stack = []
	for (let i = 0; i < size; i++)
		stack.push(<div key={i} className="w-20 h-5 bg-green-600 mb-2"></div>)
	
	return <div className="flex flex-col justify-end items-center">
		<div className="h-[280px] flex flex-col justify-end">
			{stack}
		</div>
		
		{/* Two column layout bs. There has to be a better way. */}
		<div className="w-full flex flex-row gap-x-2 justify-stretch items-end border-t p-4">
			<div className="grow basis-0 flex justify-end">
				<button className="p-2 font-bold bg-yellow-300 rounded-lg"
					onClick={e => setSize(remove(size))}>Remove</button>
			</div>
			<div className="grow basis-0 flex justify-start">
				<button className="p-2 font-bold bg-green-300 rounded-lg"
					onClick={e => setSize(add(size))}>Add</button>
			</div>
		</div>
	</div>
}
