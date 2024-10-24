/**
 * Module 8: CRUD
 *
 * %title = Module 8: CRUD
 * %route = /lesson/crud
 * %isLazy = true
 */

import Collapsable from './Components/Collapsable'

import MessageBoard from './Components/CRUD/MessageBoard'
import Furniture from './Components/CRUD/Furniture'
import Todo from './Components/CRUD/Todo'

const CRUD = ({children}) => {
	let i = 0
	const lessons = [
		<Collapsable key={i++} collapse={true} title="Message Board">
			<MessageBoard />
		</Collapsable>,
		<Collapsable key={i++} collapse={true} title="Furniture">
			<Furniture />
		</Collapsable>,
		<Collapsable key={i++} collapse={false} title='Todo List'>
			<Todo /></Collapsable>,
	]

	return (
		<div className="h-full flex flex-col justify-start items-strech">
			<h1 className="my-4 text-5xl self-center">
				Create, Read, Update, Delete
			</h1>

			{lessons}
		</div>
	)
}

export default CRUD
