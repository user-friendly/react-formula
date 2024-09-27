/**
 * Repeated Item Rendering, module 5 lessons.
 * 
 * Path: /lesson/repeated-item-rendering
 */

import { useState, Fragment } from 'react'

import Router from '#Router'

import Collapsable from './Components/Collapsable'

import MapExercise from './Components/ItemsRendering/MapExercise'

// import null from './Components/ItemsRendering/null'

const ItemsRendering = () => {
	const lessons = [
		<Collapsable key={1} collapse={false} title='Map Exercise'>
			<MapExercise /></Collapsable>
	]
	
	return <div className="h-full flex flex-col justify-start items-strech">
		<h1 className="my-4 text-5xl self-center">Repeated Item Rendering</h1>
		
		{lessons}
	</div>
}

Router.setRoute('/lesson/repeated-item-rendering', <ItemsRendering />, 'Module 5: Repeated Item Rendering')
Router.setRoute('/lesson', <ItemsRendering />)

export default ItemsRendering
