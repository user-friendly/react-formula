/**
 * Combined inputs lesson for: checkbox, number, & select.
 */

import { useState } from 'react'

import Form from './Components/Form'

const selectItems = [
	['option1', 'Apple', '🍎'],
	['option2', 'Orange', '🍊'],
	['option3', 'Banana', '🍌'],
]

export default ({children}) => {
	const [isChecked, setChecked] = useState(false)
	
	const [price, setPrice] = useState(1)
	
	const [fruit, setFruit] = useState('<none>')
	const selectedFruit = selectItems.find(i => i[0] === fruit)
	
	const [error, setError] = useState('')
	
	const priceHandler = (e) => {
		const newPrice = Number(e.target.value)
		if (newPrice > 1 && newPrice <= 60) {
			setError('')
			setPrice(newPrice)
		} else {
			setError('price is out of range')
		}
	}
	
	
	return <div className="flex justify-center">
		<Form className="flex flex-col items-center max-w-xl mt-4">
			<h3 className="text-xl mb-4">Example form inputs</h3>
			
			<label className="p-2 text-lg">
				<input className="mx-2" name="checkboxInput" type="checkbox" checked={isChecked}
					onChange={e => setChecked(e.target.checked)}
				/>
				Is box checked? {isChecked ? 'Yes' : 'No'}
			</label>
			
			<label className="p-2 text-lg">
				Stock price [1, 60]:
				{/* TODO Is the onFocus/Blue inline with React rules?
						 This should be only a visual change, no state changes. */} 
				<input className="mx-2" name="numberInput" type="number" value={price}
					min={1} max={60}
					onFocus={e => e.target.value=''} onBlur={e => e.target.value=price}
					onChange={priceHandler}
				/><br />
				Balance: ${price * 100}
			</label>
			
			<label className="p-2 text-lg">
				{fruit !== '<none>' ? `Fruit selected: ${selectedFruit[2]}` : 'Select a fruit'}
				<br />
				<select className="w-40" name="selectInput" value={fruit} onChange={e => setFruit(e.target.value)}>
					<option key={0} value="<none>">-- None --</option>
					{selectItems.map((i, k) =>
						<option key={k+1} value={i[0]}>{i[1]}</option>
					)}
				</select>
			</label>
			
			<div className="text-lg text-red-500">
				{error ? `Input error: ${error}` : ''}
			</div>
		</Form>
	</div>
}
