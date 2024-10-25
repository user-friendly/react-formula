/**
 * Module 10: Other React Hooks
 *
 * %title = Module 10: Other React Hooks
 * %route = /lesson/react-hooks/*
 * %isLazy = true
 */

import Collapsable from './Components/Collapsable'

import Refs from './Components/ReactHooks/Refs'
import Contexts from './Components/ReactHooks/Contexts'
import ThemeContext from './Components/ReactHooks/ThemeContext'

const ReactHooks = ({children}) => {
	let i = 0
	const lessons = [
		<Collapsable key={i++} collapse={true} title="Refs">
			<Refs />
		</Collapsable>,
		<Collapsable key={i++} collapse={true} title="Intro to React Context">
			<Contexts />
		</Collapsable>,
		<Collapsable key={i++} collapse={false} title="Theme Context">
			<ThemeContext />
		</Collapsable>,
	]

	return (
		<div className="h-full flex flex-col justify-start items-strech">
			<h1 className="my-4 text-5xl self-center">Other React Hooks</h1>

			{lessons}
		</div>
	)
}

export default ReactHooks
