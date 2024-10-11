import _ from 'lodash'

import {useState, useEffect, useId} from 'react'

const InternalTextInput = ({
	name,
	id,
	type = 'text',
	className,
	placeholder,
	value = '',
	delay = false,
	onChange,
}) => {
	const [internal, setInternal] = useState(value)

	let internalOnChange = (e) => setInternal(e.target.value)

	if (_.isFunction(onChange)) {
		if (_.isInteger(delay)) {
			useEffect(() => {
				if (internal === value) {
					return
				}
				const tid = setTimeout(() => onChange(internal), delay)
				return () => clearTimeout(tid)
			}, [internal])
		} else {
			internalOnChange = (e) => {
				setInternal(e.target.value)
				onChange(e.target.value)
			}
		}
	}

	return (
		<input
			name={name}
			id={id}
			className={className}
			type={type}
			placeholder={placeholder}
			value={internal}
			onChange={internalOnChange}
		/>
	)
}

const TextInput = (props) => {
	const id = _.isString(props.id) ? props.id : useId()

	if (_.isString(props.label)) {
		return (
			<label className={props.classNameLabel} htmlFor={id}>
				<span>{props.label}:</span> <InternalTextInput {...props} id={id} />
			</label>
		)
	} else {
		return <InternalTextInput {...props} />
	}
}

export default TextInput
