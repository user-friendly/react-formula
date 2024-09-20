/**
 * More State.
 * 
 * Path: /lesson/more-state
 * 
 * Bundles up a lessons in the More State group.
 */

import { useState, Fragment } from 'react'

import Router from '#Router'

import Collapsable from './Components/Collapsable'
import Stack from './Components/MoreState/Stack'
import Grid from './Components/MoreState/Grid'
// import null from './Components/MoreState/null'

const MoreState = () => {
	const lessons = [
		<Collapsable key={1} collapse={true} title='Stacker'>
			<Stack /></Collapsable>,
		<Collapsable key={2} collapse={false} title='Checkered Grid'>
			<Grid /></Collapsable>
	]
	
	return <div className="h-full flex flex-col justify-start items-strech">
		<h1 className="my-4 text-5xl self-center">More State Lesson Group</h1>
		
		{lessons}
	</div>
}

Router.setRoute('/lesson/more-state', <MoreState />, 'More State')
Router.setRoute('/lesson', <MoreState />)

export default MoreState
