
import _ from 'lodash'

import {useEffect, useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import {apiCreateUser} from  '#cap/Services'

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

const SignUpPage = () => {
	const session = useContext(SessionContext)
	const navigate = useNavigate()
	const [inProgress, setInProgress] = useState(false)
	const [apiStatus, setApiStatus] = useState(() => getDefaultApiStatusState())
	
	useEffect(() => {
		if (session) {
			console.log(`User is already logged in as {${session.username}}. Redirect to homepage.`)
			// FIXME Navigate to actual homepage.
			navigate('/style-guide')
		}
	}, [])
	
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
		
		if (result.error === false) {
			const signInStatus = _.clone(result)
			// Can't clone a React component. Tried using a fragment here, but history.ts fails.
			signInStatus.message = 'You can login with Your username & password'
			
			result.message = <>{result.message}<br />Redirecting You to Sing In page...</>
			
			setTimeout(() => navigate('/sign-in', {state: {
				status: signInStatus,
				username: values.username
			}}), 1000)
		}
		
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
		
		<Link to="/sign-in" className="text-sm text-green-700 underline hover:text-green-500">
			Log into Account
		</Link>
	</FormContainer>
}

export default SignUpPage
