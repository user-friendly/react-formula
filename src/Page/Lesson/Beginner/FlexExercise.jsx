/**
 * Flex Exercise.
 * 
 * Path: /lesson/flex-exercise
 */

const catSymbol = '🐈'

const Cat = () => {
	return <div className="p-2 border-2 rounded-lg border-amber-400">
		<span className="fa-solid fa-cat text-2xl text-amber-400">{catSymbol}</span>
	</div>
}

const Label = ({children}) => {
	return 	<span className="absolute top-0 left-2 text-slate-200 text-xs">
		{children}
	</span>
}

const FlexExercise = () => {
	return <>
	
	<h2 className="text-4xl flex justify-center">Flex Exercise</h2>
	
	<div className="font-noto">
	
	  <div className="flex h-64 p-4 m-4 border-2 border-blue-400 relative
	  	justify-center
	  ">
		<Label>
			justify-center
		</Label>
	    <Cat />
	    <Cat />
	    <Cat />
	  </div>
	  
	  <div className="flex h-64 p-4 m-4 border-2 border-red-400 relative
	  	justify-between
	  ">
		<Label>
			justify-between
		</Label>
	    <Cat />
	    <Cat />
	    <Cat />
	  </div>
	  
	  <div className="flex h-64 p-4 m-4 border-2 border-green-400 relative
	  	justify-center items-center
	  ">
		<Label>
			justify-center items-center
		</Label>
	    <Cat />
	    <Cat />
	    <Cat />
	  </div>
	  
	  <div className="flex h-64 p-4 m-4 border-2 border-purple-400 relative
	  	justify-around items-end
	  ">
		<Label>
			justify-around items-end
		</Label>
	    <Cat />
	    <Cat />
	    <Cat />
	  </div>
	  
	  <div className="flex h-64 p-4 m-4 border-2 border-orange-400 relative
	  	justify-between items-center
	  ">
		<Label>
			justify-between items-center
		</Label>
	    <Cat />
	    <Cat />
		<Cat />
	  </div>
	</div>
	</>
}

// Router.setRoute('/lesson/flex-exercise', <FlexExercise />, 'Flex Exercise')

export default FlexExercise
