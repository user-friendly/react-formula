
import _ from 'lodash'

import {useEffect, useState, useId} from 'react'

import Field from './Field'

const defaultFormStyle = `
	m-4 pt-2 pb-4 px-8 bg-white border rounded-lg border-slate-300 font-lato font-medium
	min-w-80 flex flex-col 
`

const validateFields = (fields) => {
	for (const field of fields) {
		if (field.name === undefined) {
			throw "Form fields MUST have names."
		}
	}
}

const getFieldValues = (fields) => {
	const values = {}
	
	for (const field of fields) {
		values[field.name] = field.value !== undefined ? field.value : ''
	}
	
	return values
}

const setFieldValue = (store, name, value) => {
	return {...store, [name]: value}
}

const Form = (ogProps) => {
	// FIXME This is more of a build time check.
	validateFields(ogProps.fields)
	
	const formId = useId()
	const [values, setValues] = useState(() => getFieldValues(ogProps.fields))
	
	// Candidate to wrap in a useCallback().
	const handleSubmit = (e) => {
		e.preventDefault()
		ogProps.onSubmit(values, formId, e)
	}
	
	// Set defaults.
	const props = _.assign(_.omit(ogProps, ['fields']), {
		className: defaultFormStyle,
		name: `form-${formId}`,
		method: 'POST',
		action: '',
		onSubmit: handleSubmit,
	})
	
	return <form {...props}>

		{/* FIXME The special value handling for buttons is BS. */}
		{ogProps.fields.map((fieldProps, k) => <Field key={k}
			onChange={(e) => setValues(setFieldValue(values, fieldProps.name, e.target.value))}
			{...fieldProps}
			value={!fieldProps.isButton ? values[fieldProps.name] : fieldProps.value}
		/>)}
		{props.children}
	</form>
}

export default Form
