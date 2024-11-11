
import clsx from 'clsx'

const FormContainer = (props) => {
	const children = props.children
	const status = props.status ? props.status : {
		error: false,
		message: null
	}
	
	if (false !== status.error && !status.message) {
		status.message = 'Something went wrong - try again later'
	}
	
	return <div className="flex">
		<div className="relative hidden md:block">
			<img className="h-screen object-cover"
				title="plants on a rack" src="https://static-task-assets.react-formula.com/capstone_sign_in_scene.png" />
			<div className="absolute inset-0 w-full h-full bg-black/10"></div>
			<div className="absolute inset-0 w-full h-full bg-emerald-800/40"></div>
		</div>
		
		<div className="h-screen flex-1 bg-emerald-50 flex flex-col items-center justify-center">
			<div className="flex flex-col items-center mx-2 my-8">
				<img className="w-16 mb-2 " title="brand logo" src="https://static-task-assets.react-formula.com/capstone_logo_dark.png" />
				<div className="font-playfair text-emerald-700 text-2xl">
					Rica's Plants
				</div>
			</div>
			
			{status.message ? (
			<div className={clsx('animate-slideDown py-1 px-2 rounded-lg border',
				status.error ? 'bg-red-100 border-red-600 text-red-600 font-medium'
					: 'text-emerald-800 bg-emerald-100 border-emerald-600')}
			>
				{status.message}
			</div>
			) : null}
			
			{children}
		</div>
	</div>
}

export default FormContainer
