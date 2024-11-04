
import {Link} from 'react-router-dom'

import Form from '#cap/Form'
import FormContainer from '#cap/Pages/Auth/FormContainer'

const SignInPage = () => {
	return <FormContainer>
		<Form fields={[
			{
				name: 'username',
				label: 'username',
				//placeholder: 'Username or email',
				//value: 'JohnDoe123',
				type: 'text',
			},
			{
				name: 'password',
				label: 'password',
				//placeholder: 'Password',
				//value: 'password123456',
				type: 'password',
			},
			{
				name: 'submit_button',
				value: 'Sign In',
				type: 'submit',
			},
		]} />
		
		<Link to="/sing-up" className="text-sm text-green-700 underline hover:text-green-500">
			Create an Account
		</Link>
	</FormContainer>
}

export default SignInPage
