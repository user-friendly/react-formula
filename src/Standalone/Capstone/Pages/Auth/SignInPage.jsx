
import AuthForm from './AuthForm'

const SignInPage = ({className}) => {
	return <div className={className}>
		<AuthForm fields={[
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
				label: 'Sign In',
				type: 'submit',
			},
		]} />
	</div>
}

export default SignInPage
