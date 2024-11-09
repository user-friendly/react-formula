
import {useState} from 'react'
import {Link} from 'react-router-dom'

import {apiCreateUser} from  '#cap/Services'

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
		if (inProgress) {
			return
		}
		
		console.log(`Sing up form {${formId}} submitted.`)
		console.log('Values:', values)

		// TODO FE validation.
		
		setInProgress(true)
		setApiStatus(getDefaultApiStatusState())

		const result = await apiCreateUser(values.username, values.password, values.password_confirm)

		setApiStatus(result)
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
