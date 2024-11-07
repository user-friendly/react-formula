
import {useState} from 'react'
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

const SignUpPage = () => {
	const [inProgress, setInProgress] = useState(false)
	const [apiStatus, setApiStatus] = useState(() => getDefaultApiStatusState())
	
	// Usually, can ommit the formId and event.
	const handleSubmit = async (values, formId, event) => {
		console.log(`Sing up form {${formId}} submitted.`)
		console.log('Values:', values)
		
		setApiStatus(getDefaultApiStatusState())
		setInProgress(true)
		
		const r = await ApiFetch('POST', 'users', {
			username:			values.username,
			password: 			values.password,
			password_confirm:	values.password_confirm
		})
		const status = getDefaultApiStatusState()
		
		if (r.error) {
			status.error = true
			status.message = r.error
		} else if (r.message) {
			status.message = r.message
		} else {
			status.message = 'Sign up successful'
		}
		
		setApiStatus(status)
		setInProgress(false)
	}
	
	{/* Oh my ghaaaaaa... */}
	const createButtonLabel = <span className="flex justify-center"><span className="relative">
		Create an Account {inProgress
			? <Spinner className="absolute top-0 -right-8 ml-2 w-6 h-6 border-transparent border-t-white" />
			: null
		}
	</span></span>
	
	const formFields = 	[
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
			value: createButtonLabel,
			type: 'submit',
			isButton: true,
		},
	]
	
	return <FormContainer status={apiStatus}>
		<Form onSubmit={handleSubmit} fields={formFields} />
		
		<Link to="/sing-in" className="text-sm text-green-700 underline hover:text-green-500">
			Log into Account
		</Link>
	</FormContainer>
}

export default SignUpPage
