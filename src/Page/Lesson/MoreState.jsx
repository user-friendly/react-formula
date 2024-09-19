/**
 * More State.
 * 
 * Path: /lesson/more-state
 * 
 * Bundles up a lessons in the More State group.
 */

import Router from '#Router'

const MoreState = () => {
	
	return <div className="h-full">
		<h1>More State Lesson Group</h1>
			
		<div>
			
		</div>
	</div>
}

Router.setRoute('/lesson/more-state', <MoreState />, 'More State')
// Router.setRoute('/lesson', <MoreState />)

export default MoreState
