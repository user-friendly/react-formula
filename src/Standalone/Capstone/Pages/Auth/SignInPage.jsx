
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import ApiFetch from '#cap/Services/ApiFetch'

import Form from '#cap/Form'
import FormContainer from '#cap/Pages/Auth/FormContainer'

import Spinner from '#cap/Spinner'

const getDefaultApiStatusState = () => {
	return 	{
		error: false,
		message: null
	}
}

const SignInPage = () => {
	const [inProgress, setInProgress] = useState(false)
	const [apiStatus, setApiStatus] = useState(() => getDefaultApiStatusState())
	
	// Usually, can ommit the formId and event.
	const handleSubmit = async (values, formId, event) => {
		console.log(`Sing up form {${formId}} submitted.`)
		console.log('Values:', values)
		
		setApiStatus(getDefaultApiStatusState())
		setInProgress(true)
		
		const r = await ApiFetch('POST', 'users/session', {
			username:			values.username,
			password: 			values.password,
		})
		const status = getDefaultApiStatusState()
		
		if (r.error) {
			status.error = true
			status.message = r.error
		} else if (r.message) {
			status.message = r.message
		} else {
			status.message = 'Sign in successful'
		}
		
		setApiStatus(status)
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
			value: createButtonLabel,
			type: 'submit',
			isButton: true,
		},
	]
	
	return 	<FormContainer status={apiStatus}>
		<Form onSubmit={handleSubmit} fields={formFields} />
		
		<Link to="/sing-up" className="text-sm text-green-700 underline hover:text-green-500">
			Create an Account
		</Link>
	</FormContainer>
}

export default SignInPage
