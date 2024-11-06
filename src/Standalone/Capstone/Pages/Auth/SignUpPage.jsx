
import {useEffect} from 'react'
import {Link} from 'react-router-dom'

import Form from '#cap/Form'
import FormContainer from '#cap/Pages/Auth/FormContainer'

import {default as ApiFetch, ApiFetchSync} from '#cap/Services/ApiFetch'

const SignUpPage = () => {
	useEffect(() => {
		(async () => {
			const data = await ApiFetch('GET', 'users')
			console.log('Test MSW capstone user service:', data)
		})()
		
		try {
			const data = ApiFetchSync('GET', 'users')
			console.log('Synced, test MSW capstone user service:', data)
		} catch (e) {
			console.error('Synced test failed.')
		}
		
		/* ApiFetch('GET', 'users').then((r) => {
			if (!r.ok) {
				throw new Error(r.statusText)
			}
			return r.json()
		})
		.then((data) => {
			console.debug('Test MSW capstone user service:', data)
		})*/
	}, [])
	
	return <FormContainer>
		<Form fields={[
			{
				label: 'username',
				//placeholder: 'Username or email',
				name: 'username',
				type: 'text',
			},
			{
				label: 'password',
				//placeholder: 'Password',
				name: 'password',
				type: 'password',
			},
			{
				label: 'confirm password',
				name: 'password_confirm',
				type: 'password',
			},
			{
				name: 'submit_button',
				value: 'Create an Account',
				type: 'submit',
			},
		]} />

		<Link to="/sing-in" className="text-sm text-green-700 underline hover:text-green-500">
			Log into Account
		</Link>
	</FormContainer>
}

export default SignUpPage
