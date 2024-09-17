/**
 * Flex Exercise II.
 * 
 * Path: /lesson/flex-exercise-ii
 */

import Router from '#Router'

const dogSymbol = '🐕'

const Dog = () => {
	return <div className="p-2 border-2 rounded-lg border-amber-400">
		<span className="fa-solid fa-cat text-2xl text-amber-400">{dogSymbol}</span>
	</div>
}

const Label = ({children}) => {
	return 	<span className="absolute top-0 left-2 text-slate-200 text-xs">
		{children}
	</span>
}

const Box1 = () => {
	return <div className="flex h-64 p-4 m-4 border-2 border-blue-400 relative
		flex-row justify-center items-center
	">
		<Label>
			flex-row, justify-center
		</Label>
		<Dog />
		<Dog />
		<Dog />
	</div>
}

const Box2 = () => {
	return <div className="flex h-64 p-4 m-4 border-2 border-gray-400 relative
		flex-col justify-between items-center
	">
		<Label>
			flex-col justify-between items-center
		</Label>
		<Dog />
		<Dog />
		<Dog />
	</div>
}

const Box3 = () => {
	return <div className="flex h-64 p-4 m-4 border-2 border-cyan-400 relative
		flex-col justify-end items-center
	">
		<Label>
			flex-col justify-end items-center
		</Label>
		<Dog />
		<Dog />
		<Dog />
	</div>
}

const Box4 = () => {
	return <div className="flex h-64 p-4 m-4 border-2 border-red-400 relative
		flex-col justify-around items-end
	">
		<Label>
			flex-col justify-around items-end
		</Label>
		<Dog />
		<Dog />
		<Dog />
	</div>
}

const FlexExercise2 = () => {
	return <>
		<h2 className="text-4xl flex justify-center">Flex Exercise II</h2>
		
		<div className="font-noto">
			<Box1 />
			<Box2 />
			<Box3 />
			<Box4 />
		</div>
	</>
}

Router.setRoute('/lesson/flex-exercise-ii', <FlexExercise2 />, 'Flex Exercise II')

export default FlexExercise2
