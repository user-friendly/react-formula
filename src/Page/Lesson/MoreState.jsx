/**
 * More State.
 * 
 * Path: /lesson/more-state
 * 
 * Bundles up a lessons in the More State group.
 */

import Router from '#Router'

import Collapsable from './Components/Collapsable'
import Stack from './Components/MoreState/Stack'
import Grid from './Components/MoreState/Grid'
import DarkMode from './Components/MoreState/DarkMode'
import Modal from './Components/MoreState/Modal'
import PlayingCard from './Components/MoreState/PlayingCard'
// import null from './Components/MoreState/null'

const MoreState = () => {
	const lessons = [
		<Collapsable key={1} collapse={true} title='Stacker'>
			<Stack /></Collapsable>,
		<Collapsable key={2} collapse={true} title='Checkered Grid'>
			<Grid /></Collapsable>,
		<Collapsable key={3} collapse={true} title='Simple Dark Mode'>
			<DarkMode /></Collapsable>,
		<Collapsable key={4} collapse={true} title='Modal'>
			<Modal /></Collapsable>,
		<Collapsable key={5} collapse={false} title='Playing Card'>
			<PlayingCard /></Collapsable>
	]
	
	return <div className="h-full flex flex-col justify-start items-strech">
		<h1 className="my-4 text-5xl self-center">More State Lesson Group</h1>
		
		{lessons}
	</div>
}

Router.setRoute('/lesson/more-state', <MoreState />, 'Module 4: More State')

export default MoreState
