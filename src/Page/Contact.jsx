/**
 * Contact page.
 * 
 * %title = Contact
 * %route = /contact
 */

import {useState} from 'react'

import Form from '#Components/Form'

const Contact = () => {
	const [name, setName] = useState(null)
	const [email, setEmail] = useState(null)
	const [body, setBody] = useState(null)
	
	return (
		<div className="py-2 px-4 flex flex-col items-center rounded-xl bg-slate-300">
			<h2 className="my-2 text-2xl">Contact</h2>

			<div className="my-2">
				This will be the contact page.
			</div>
			
			<div>
				<Form onSubmit={() => console.log('Form submitted.')}>
					<input name="name" placeholder="John Doe"
						onChange={e => setName(e.target.value)} />
					<input name="email" placeholder="johndoe@example.com"
						onChange={e => setEmail(e.target.value)} />
					<textarea name="body"
						onChange={e => setBody(e.target.value)}></textarea>
					<input type="submit" value="Submit" />
				</Form>
			</div>
		</div>
	)
}

export default Contact
