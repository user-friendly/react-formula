/**
 * Modules 1, 2, & 3
 * 
 * Path: /lesson/beginner
 */

import Router from '#Router'

import Collapsable from './Components/Collapsable'

import AnalyzingLayoutsExercise from './Beginner/AnalyzingLayoutsExercise'
import ButtonComponentExercise from './Beginner/ButtonComponentExercise'
import CatCarousel from './Beginner/CatCarousel'
import ClickEventExercise from './Beginner/ClickEventExercise'
import ConditionalRendering from './Beginner/ConditionalRendering'
import Counter from './Beginner/Counter'
import FlexExercise from './Beginner/FlexExercise'
import FlexExercise2 from './Beginner/FlexExercise2'
import SearchPageDesign from './Beginner/SearchPageDesign'

const Beginner = ({children}) => {
	let i = 0
	const lessons = [
		<Collapsable key={i++} collapse={true} title='Button Component Exercise'>
			<ButtonComponentExercise /></Collapsable>,

		<Collapsable key={i++} collapse={true} title='Flex Exercise 1'>
			<FlexExercise /></Collapsable>,

		<Collapsable key={i++} collapse={true} title='Flex Exercise 2'>
			<FlexExercise2 /></Collapsable>,
		
		<Collapsable key={i++} collapse={true} title='Analyzing Layouts'>
			<AnalyzingLayoutsExercise /></Collapsable>,

		<Collapsable key={i++} collapse={false} title='Search Page Design'>
			<SearchPageDesign /></Collapsable>,

		<Collapsable key={i++} collapse={true} title='Click Event Exercise'>
			<ClickEventExercise /></Collapsable>,

		<Collapsable key={i++} collapse={true} title='Conditional Rendering'>
			<ConditionalRendering /></Collapsable>,

		<Collapsable key={i++} collapse={true} title='Counter'>
			<Counter /></Collapsable>,
		
		<Collapsable key={i++} collapse={true} title='Cat Carousel'>
			<CatCarousel /></Collapsable>,
	]
	
	return <div className="h-full flex flex-col justify-start items-strech">
		<h1 className="my-4 text-5xl self-center">Modules 1, 2, & 3</h1>
		
		{lessons}
	</div>
}

Router.setRoute('/lesson/beginner', <Beginner />, 'Modules 1, 2, & 3')
// Router.setRoute('/lesson', <Beginner />)

export default Beginner
