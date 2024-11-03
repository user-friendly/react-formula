
import Form from './Form'

const SignUpPage = ({className}) => {
	return <div className={className}>
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
				label: 'Create an Account',
				type: 'submit',
			},
		]} />
	</div>
}

export default SignUpPage
