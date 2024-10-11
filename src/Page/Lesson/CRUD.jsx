/**
 * Module 8: CRUD
 * 
 * Path: /lesson/crud
 */

import Router from '#Router'

import Collapsable from './Components/Collapsable'

import MessageBoard from './Components/CRUD/MessageBoard'
//import ModuleLesson from './Components/CRUD/ModuleLesson'
//import ModuleLesson from './Components/CRUD/ModuleLesson'
//import ModuleLesson from './Components/CRUD/ModuleLesson'
//import ModuleLesson from './Components/CRUD/ModuleLesson'
//import ModuleLesson from './Components/CRUD/ModuleLesson'
//import ModuleLesson from './Components/CRUD/ModuleLesson'

const CRUD = ({children}) => {
	let i = 0
	const lessons = [
		<Collapsable key={i++} collapse={false} title='Message Board'>
			<MessageBoard /></Collapsable>,
/*		<Collapsable key={i++} collapse={true} title='CRUD'>
			<CRUD /></Collapsable>,
		<Collapsable key={i++} collapse={true} title='CRUD'>
			<CRUD /></Collapsable>,
		<Collapsable key={i++} collapse={true} title='CRUD'>
			<CRUD /></Collapsable>,
		<Collapsable key={i++} collapse={true} title='CRUD'>
			<CRUD /></Collapsable>,
		<Collapsable key={i++} collapse={true} title='CRUD'>
			<CRUD /></Collapsable>,
		<Collapsable key={i++} collapse={true} title='CRUD'>
			<CRUD /></Collapsable>,
		<Collapsable key={i++} collapse={true} title='CRUD'>
			<CRUD /></Collapsable>,
		<Collapsable key={i++} collapse={true} title='CRUD'>
			<CRUD /></Collapsable>,*/
	]
	
	return <div className="h-full flex flex-col justify-start items-strech">
		<h1 className="my-4 text-5xl self-center">Create, Read, Update, Delete</h1>
		
		{lessons}
	</div>
}

Router.setRoute('/lesson/crud', <CRUD />, 'Module 8: CRUD')
Router.setRoute('/lesson', <CRUD />)

export default CRUD
