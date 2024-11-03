
import _ from 'lodash'

import {useCallback, useState, useDeferredValue, useId} from 'react'

import Field from './Field'

const defaultFormStyle = `
	m-4 pt-2 pb-4 px-8 bg-white border rounded-lg border-slate-300 font-lato font-medium
	flex flex-col 
`

const getFieldValues = (fields) => {
	const values = {}
	
	for (const field of fields) {
		if (field.name !== undefined && field.value !== undefined) {
			values[field.name] = field.value
		}
	}
	
	return values
}

const setFieldValue = (store, name, value) => {
	return {...store, [name]: value}
}

const Form = (ogProps) => {
	const formId = useId()
	const [values, setValues] = useState(() => getFieldValues(ogProps.fields))
	
	console.log(`Render form {${formId}}.`)
	
	// Using formId as an example dependency.
	const handleSubmit = useCallback((e) => {
		e.preventDefault()
		console.log(`Form ${formId} submitted.`)
		console.log('Values to submit:', values)
	}, [formId, values])
	
	// Set defaults.
	const props = _.assign(_.omit(ogProps, ['fields']), {
		className: defaultFormStyle,
		name: `form-${formId}`,
		method: 'POST',
		action: '',
		onSubmit: handleSubmit,
	})
	
	return <form {...props}>
		{ogProps.fields.map((fieldProps, k) => <Field
			key={k}
			onChange={(e) => setValues(setFieldValue(values, fieldProps.name, e.target.value))}
			{...fieldProps}
		/>)}
	</form>
}

export default Form
