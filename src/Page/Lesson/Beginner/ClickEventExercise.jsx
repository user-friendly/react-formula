/**
 * Click Event Exercise.
 * 
 * Path: /lesson/click-event-exercise
 */

import { useState } from 'react'

// TODO Thic component is not generic. It's really a hyperlink.
// import Button from '#Button'

const buttonStyle = 'm-2 px-4 text-white rounded-md';

const ClickEventExercise = () => {
	const [message, setMessage] = useState('user friendly was here!')
	
	return <div className='h-full flex flex-col items-center justify-center'>
		<div className='text-3xl text-stone-400'>{message}</div>
		<div className='flex mt-4'>
			<button onClick={e => setMessage('bye!')} className={buttonStyle + ' bg-green-400'}>One</button>
			<button onClick={e => setMessage('yay!')} className={buttonStyle + ' bg-red-400'}>Two</button>
			<button onClick={e => setMessage('woooo!')} className={buttonStyle + ' bg-violet-400'}>Three</button>
		</div>
	</div>
}

// Router.setRoute('/lesson/click-event-exercise', <ClickEventExercise />, 'Click Event Exercise')

export default ClickEventExercise
