
const FormContainer = (props) => {
	const children = props.children
	
	return <div className="h-screen bg-green-50 flex flex-col items-center justify-center">
		<div className="flex flex-col items-center mx-2 my-8">
			<img className="w-16 mb-2 " title="brand logo" src="https://static-task-assets.react-formula.com/capstone_logo_dark.png" />
			<div className="font-playfair text-emerald-700 text-2xl">
				Rica's Plants
			</div>
		</div>
		
		{children}
	</div>
}

export default FormContainer
