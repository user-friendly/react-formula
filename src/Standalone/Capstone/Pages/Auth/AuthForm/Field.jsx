
import {useId} from 'react'

// Text input style.

const styles = {
	text: 'm-1 p-2 rounded-lg border border-neutral-600 text-neutral-600',
	button: 'm-1 px-2 py-1 rounded-lg border border-neutral-600 cursor-pointer',
}

const labelStyles = {
	text: '',
	button: 'hidden',
}

const Field = ({name, value, type = "text", label, placeholder = ""}) => {
	const elemId = useId()
	
	if (label === undefined) {
		label = name
	}
	
	const inputClass = styles[type] !== undefined ? styles[type] : styles['text']
	const labelClass = labelStyles[type] !== undefined ? labelStyles[type] : labelStyles['text']
	
	if (type === 'button') {
		value = label
	}
	
	return <div>
		<label className={labelClass} htmlFor={elemId}>{label}</label>
		<input className={inputClass} type={type} name={name} id={elemId} placeholder={placeholder} value={value} />
	</div>
}

export default Field
