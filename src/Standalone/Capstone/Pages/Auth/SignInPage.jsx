
import _ from 'lodash'

import {useState, useContext} from 'react'
import {Link, useLocation} from 'react-router'

import {apiLoginUser} from  '#cap/Services'

import SessionContext from '#cap/Context/Session'

import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'

import {useDocumentTitle} from '#cap/DocumentTitle'

import Form from '#cap/Form'
import FormContainer from '#cap/Pages/Auth/FormContainer'

import Spinner from '#cap/Components/Spinner'

// Redirect delay (in ms) after a successful sign in.
const REDIRECT_DELAY = 1500

// TODO Just use Services::getStatus().
const getDefaultApiStatusState = () => {
	return 	{
		error: false,
		message: null
	}
}

const SignInPage = () => {
	const session = useContext(SessionContext)
	const location = useLocation()
	const [redirectDelay, setRedirectDelay] = useState(false)
	const [inProgress, setInProgress] = useState(false)
	const [apiStatus, setApiStatus] = useState(() => {
		if (_.has(location, 'state.status.message')) {
			return location.state.status
		}
		return getDefaultApiStatusState()
	})
	
	const [title, setTitle] = useDocumentTitle()
	setTitle('Sign In')
	
	// TODO What happens when the user sends a login request and manually
	// navigates away from the sign in, before the request is resolved?
	
	// Usually, can ommit the formId and event.
	const handleSubmit = async (values, formId, event) => {
		if (inProgress || session.isActive()) {
			return
		}

		console.log(`Sing up form {${formId}} submitted.`)
		console.log('Values:', values)
		
		// TODO FE validation.
		
		setInProgress(true)
		setApiStatus(getDefaultApiStatusState())
		
		const data = await apiLoginUser(values.username, values.password)
		
		if (data.error === false && _.isObject(data.payload)) {
			console.log('Login successful. Login details:', data.payload)
			session.signIn(data.payload)
			setRedirectDelay(REDIRECT_DELAY)
		}
		
		setApiStatus({
			error: data.error,
			message: data.message
		})
		setInProgress(false)
	}

	const createButtonLabel = <span className="flex justify-center"><span className="relative">
		Sign In {inProgress
			? <Spinner className="absolute top-0 -right-8 ml-2 w-6 h-6 border-4 border-transparent border-t-white" />
			: null
		}
	</span></span>
	
	const formFields = 	[
		{
			name: 'username',
			label: 'username',
			//placeholder: 'Username or email',
			value: _.has(location, 'state.username') ? location.state.username : undefined,
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
			value: createButtonLabel,
			type: 'submit',
			isButton: true,
		},
	]
	
	return <RedirectAuthenticated path="/plants" delay={redirectDelay}>
		<FormContainer status={apiStatus}>
			<Form onSubmit={handleSubmit} fields={formFields} />
			
			<Link to="/sign-up" className="text-sm text-green-700 underline hover:text-green-500">
				Create an Account
			</Link>
		</FormContainer>
	</RedirectAuthenticated>
}

export default SignInPage
