/**
 * Combined inputs lesson for: checkbox, number, & select.
 */

import { useState } from 'react'

import Form from './Components/Form'

export default ({children}) => {
	const [isChecked, setChecked] = useState(false)
	const [price, setPrice] = useState(0)
	const [fruit, setFruit] = useState('<none>')
	
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
				Stock price: 
				<input className="mx-2" name="numberInput" type="number" value={price}
					onChange={e => setPrice(e.target.value)}
				/><br />
				Balance: ${price * 100}
			</label>
			
			<label className="p-2 text-lg">
				{fruit !== '<none>' ? `Selected '${fruit}'` : 'Select a fruit'}
				<br />
				<select className="w-40" name="selectInput" value={fruit} onChange={e => setFruit(e.target.value)}>
					<option value="<none>">-- None --</option>
					<option value="option1">Apple</option>
					<option value="option2">Orange</option>
					<option value="option3">Banana</option>
				</select>
			</label>
		</Form>
	</div>
}
