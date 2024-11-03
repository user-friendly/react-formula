
import Form from './Form'

const SignInPage = ({className}) => {
	return <div className={className}>
		<Form fields={[
			{
				label: 'username',
				//placeholder: 'Username or email',
				name: 'username',
				value: 'JohnDoe123',
				type: 'text',
			},
			{
				label: 'password',
				//placeholder: 'Password',
				name: 'password',
				value: 'password123456',
				type: 'password',
			},
			{
				label: 'Sign In',
				type: 'submit',
			},
		]} />
	</div>
}

export default SignInPage
