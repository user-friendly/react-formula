
import _ from 'lodash'

import {useEffect, useCallback, useState, useDeferredValue, useId} from 'react'

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
	
	console.log(`Render form {${formId}}:`, values)
	
	// Using formId as an example dependency.
	const handleSubmit = useCallback((e) => {
		e.preventDefault()
		console.log(`Form ${formId} submitted.`)
		console.log('Values to submit:', values)
	}, [values])
	
	// Set defaults.
	const props = _.assign(_.omit(ogProps, ['fields']), {
		className: defaultFormStyle,
		name: `form-${formId}`,
		method: 'POST',
		action: '',
		onSubmit: handleSubmit,
	})
	
    /*if ((type === 'text' || type === 'password') && onChange !== undefined && !instant) {
		let tid = null
		
		useEffect(() => {
			return () => {
				//console.log(`Clear timeout for field ${type}@${name}.`)
				clearTimeout(tid)
			}
		}, [])
		
		const originalOnChange = onChange
		onChange = (e) => {
			//console.log(`Clear timeout for field ${type}@${name}.`)
			clearTimeout(tid)
			tid = setTimeout(() => originalOnChange(e), 500)
		}
	}*/
	
	let tid = null
	
	useEffect(() => {
		return () => {
			console.log(`Clear form (${formId}) timeout.`)
			clearTimeout(tid)
		}
	}, [])
	
	const onInputChange = (name, value) => {
		setValues(setFieldValue(values, name, value))
		return
		clearTimeout(tid)
		tid = setTimeout(() => {
			console.log(`Update value for '${name}'.`)
			setValues(setFieldValue(values, name, value))
		}, 1000)
	}
	
	return <form {...props}>
		{ogProps.fields.map((fieldProps, k) => <Field key={k}
			onChange={(e) => onInputChange(fieldProps.name, e.target.value)}
			{...fieldProps}
			value={values[fieldProps.name]}
		/>)}
	</form>
}

export default Form
