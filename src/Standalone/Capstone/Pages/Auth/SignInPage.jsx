
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import {apiLoginUser} from  '#cap/Services'

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
	const navigate = useNavigate()
	
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
		
		const result = await apiLoginUser(values.username, values.password)
		
		setApiStatus(result)
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
		
		<Link to="/sign-up" className="text-sm text-green-700 underline hover:text-green-500">
			Create an Account
		</Link>
	</FormContainer>
}

export default SignInPage
