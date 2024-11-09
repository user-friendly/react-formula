
import _ from 'lodash'

import {useEffect, useState, useContext} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'

import {apiLoginUser, setSessionStorage} from  '#cap/Services'

import SessionContext from '#cap/Context/Session'

import Form from '#cap/Form'
import FormContainer from '#cap/Pages/Auth/FormContainer'

import Spinner from '#cap/Spinner'

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
	const navigate = useNavigate()
	const [inProgress, setInProgress] = useState(false)
	const [apiStatus, setApiStatus] = useState(() => {
		if (_.has(location, 'state.status.message')) {
			return location.state.status
		}
		return getDefaultApiStatusState()
	})
	
	useEffect(() => {
		if (session) {
			console.log(`User is already logged in as {${session.username}}. Redirect to homepage.`)
			// FIXME Navigate to actual homepage.
			navigate('/style-guide')
		}
	}, [])
	
	// TODO What happens when the user sends a login request and manually
	// navigates away from the sign in, before the request is resolved?
	
	// Usually, can ommit the formId and event.
	const handleSubmit = async (values, formId, event) => {
		if (inProgress) {
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
			setSessionStorage(data.payload)
		}
		
		setApiStatus({
			error: data.error,
			message: data.message
		})
		setInProgress(false)
	}

	const createButtonLabel = <span className="flex justify-center"><span className="relative">
		Sign In {inProgress
			? <Spinner className="absolute top-0 -right-8 ml-2 w-6 h-6 border-transparent border-t-white" />
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
	
	return 	<FormContainer status={apiStatus}>
		<Form onSubmit={handleSubmit} fields={formFields} />
		
		<Link to="/sign-up" className="text-sm text-green-700 underline hover:text-green-500">
			Create an Account
		</Link>
	</FormContainer>
}

export default SignInPage
