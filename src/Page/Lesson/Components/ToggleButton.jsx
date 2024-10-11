import {useState} from 'react'

export default ({label = 'Toggle Button', value = false, onClick}) => {
	// const [value, setValue] = useState(default)

	return (
		<>
			<strong>{label}</strong>
			<button
				onClick={onClick}
				className={`
				relative
				transition-background duration-300 ease-in
				w-20 h-8 p-1 rounded-full
				${value ? 'bg-green-500' : 'bg-neutral-500'}
		`}
			>
				<span
					className={`
				block absolute top-1 
				transition-left duration-300 ease-in
				w-6 h-6 rounded-full
				${value ? 'bg-neutral-500 left-[3.25rem]' : 'bg-white left-1'}
			`}
				></span>
			</button>
		</>
	)
}
