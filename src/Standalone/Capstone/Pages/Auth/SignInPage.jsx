
import AuthForm from './AuthForm'

const SignInPage = () => {
	return <div>
		<AuthForm fields={[
			{
				placeholder: 'Username or email',
				name: 'username',
				type: 'text',
			},
			{
				placeholder: 'Password',
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
