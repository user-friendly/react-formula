
import {Link} from 'react-router-dom'

import Form from '#cap/Form'

const SignInPage = ({className}) => {
	
	return <div className={className}>
		<Form fields={[
			{
				name: 'username',
				label: 'username',
				//placeholder: 'Username or email',
				value: 'JohnDoe123',
				type: 'text',
			},
			{
				name: 'password',
				label: 'password',
				//placeholder: 'Password',
				value: 'password123456',
				type: 'password',
			},
			{
				name: 'submit_button',
				value: 'Sign In',
				type: 'submit',
			},
		]} />
		
		<Link to="/sing-up">Create an Account</Link>
	</div>
}

export default SignInPage
