/**
 * Button Component Exercise.
 * 
 * Path: /lesson/button-component-exercise
 */

import Router from '#Router'

const FancyButton = ({children = 'Button', large = false}) => {
	const largeStyles = large ? "text-3xl rounded-full" : "text-base rounded-md"
	return <button className={`
		bg-blue-200 border-2 border-blue-700 text-blue-700 px-10 py-2 m-4
		transition-[background-color] duration-700 hover:bg-purple-200
		${largeStyles}
	`}>
		{children}
	</button>
}

const ButtonComponentExercise = () => {
	return <>
		<FancyButton />
		<FancyButton large>Button 2</FancyButton>
	</>
}

Router.setRoute('/lesson/button-component-exercise', <ButtonComponentExercise />, 'Button Component Exercise')

export default ButtonComponentExercise
