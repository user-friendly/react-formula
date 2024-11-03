
import _ from 'lodash'

import {useCallback, useId} from 'react'

import Field from './Field'

const defaultFormStyle = `
	m-4 pt-2 pb-4 px-8 bg-white border rounded-lg border-slate-300
	flex flex-col 
`

const AuthForm = (ogProps) => {
	const formId = useId()
	
	// Using formId as an example dependency.
	const handleSubmit = useCallback((e) => {
		e.preventDefault()
		console.log(`Form ${formId} submitted.`)
	}, [formId])
	
	// Set defaults.
	const props = _.assign(_.omit(ogProps, ['fields']), {
		className: defaultFormStyle,
		name: `form-${formId}`,
		method: 'POST',
		action: '',
		onSubmit: handleSubmit,
	})
	
	return <form {...props}>
		{ogProps.fields.map((fieldProps, k) => <Field key={k} {...fieldProps} />)}
	</form>
}

export default AuthForm
