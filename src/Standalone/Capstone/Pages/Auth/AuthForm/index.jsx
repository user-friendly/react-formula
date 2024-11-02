
import _ from 'lodash'

import {useCallback, useId} from 'react'

import Field from './Field'

const defaultFormStyle = 'border-2 rounded-lg border-red-600'

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
		{ogProps.fields.map((fieldProps, k) => <div key={k}><Field {...fieldProps} /></div>)}
	</form>
}

export default AuthForm
