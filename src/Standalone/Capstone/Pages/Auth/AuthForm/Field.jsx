
import {useId} from 'react'

// Text input style.

const styles = {
	text: 'p-1 px-2 rounded-lg border border-slate-300 text-slate-600 bg-slate-50',
	button: 'py-2 cursor-pointer rounded-lg text-white bg-green-800 hover:bg-green-700 active:bg-green-600',
	submit: 'py-2 cursor-pointer rounded-lg text-white bg-green-800 hover:bg-green-700 active:bg-green-600',
}

const labelStyles = {
	text: 'ml-3 mb-2 -mt-2 text-lg font-medium text-slate-400',
	button: 'hidden',
}

const Field = ({name, value, type = "text", label, placeholder = ""}) => {
	const elemId = useId()
	
	const inputClass = styles[type] !== undefined ? styles[type] : styles['text']
	const labelClass = labelStyles[type] !== undefined ? labelStyles[type] : labelStyles['text']
	
	if (type === 'button' || type === 'submit') {
		if (value === undefined && label !== undefined) {
			value = label
			label = undefined
		}
	}
	
	return <div className="my-3 flex flex-col">
		{label && <label className={labelClass} htmlFor={elemId}>{label}</label>}
		<input className={inputClass} type={type} name={name} id={elemId} placeholder={placeholder} value={value} />
	</div>
}

export default Field
