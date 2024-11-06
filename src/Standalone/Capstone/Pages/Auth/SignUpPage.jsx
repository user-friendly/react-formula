
import {useEffect} from 'react'
import {Link} from 'react-router-dom'

import Form from '#cap/Form'
import FormContainer from '#cap/Pages/Auth/FormContainer'
import ApiFetch from '#cap/Services/ApiFetch'

const SignUpPage = () => {
	
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
