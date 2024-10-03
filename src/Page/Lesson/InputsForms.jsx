/**
 * Inputs and Forms, module 6 lessons.
 * 
 * Path: /lesson/inputs-and-forms
 */

import Router from '#Router'

import Collapsable from './Components/Collapsable'

import TextInput from './Components/InputsForms/TextInput'
import SignInForm from './Components/InputsForms/SignInForm'
import WordFilter from './Components/InputsForms/WordFilter'
import MessageProject from './Components/InputsForms/MessageProject'
//import TextInput from './Components/InputsForms/TextInput'
//import TextInput from './Components/InputsForms/TextInput'
//import TextInput from './Components/InputsForms/TextInput'

const InputsForms = ({children}) => {
	let i = 0
	const lessons = [
		<Collapsable key={i++} collapse={true} title='Text Input'>
			<TextInput /></Collapsable>,
		<Collapsable key={i++} collapse={true} title='Sign In Form'>
			<SignInForm /></Collapsable>,
		<Collapsable key={i++} collapse={true} title='Word Filter'>
			<WordFilter /></Collapsable>,
		<Collapsable key={i++} collapse={false} title='Message Project'>
			<MessageProject /></Collapsable>
	]
	
	return <div className="h-full flex flex-col justify-start items-strech">
		<h1 className="my-4 text-5xl self-center">Inputs and Forms</h1>
		
		{lessons}
	</div>
}

Router.setRoute('/lesson/inputs-and-forms', <InputsForms />, 'Module 6: Inputs and Forms')
Router.setRoute('/lesson', <InputsForms />)

export default InputsForms
