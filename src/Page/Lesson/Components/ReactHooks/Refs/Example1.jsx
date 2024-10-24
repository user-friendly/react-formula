import {useRef} from 'react'

const Example1 = () => {
	const dogRef = useRef(null)

	const handleClick = () => {
		dogRef.current.scrollIntoView({behavior: 'smooth', block: 'center'})
	}

	return (
		<div className="relative h-screen bg-violet-100">
			<h2 className="p-8 text-3xl font-bold text-violet-700">Example 1</h2>
			<div className="flex justify-center">
				<button
					className="px-8 py-2 mx-8 text-white bg-purple-500 rounded-full"
					onClick={handleClick}
				>
					scroll to dog
				</button>
			</div>
			<div ref={dogRef} className="absolute bottom-8 left-8">
				<span className="text-5xl">🐕</span>
			</div>
		</div>
	)
}

export default Example1
