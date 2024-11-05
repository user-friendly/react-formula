
const FormContainer = (props) => {
	const children = props.children
	
	return<div className="flex">
		<div className="relative hidden md:block">
			<img className="h-screen object-cover"
				title="plants on a rack" src="https://static-task-assets.react-formula.com/capstone_sign_in_scene.png" />
			<div className="absolute inset-0 w-full h-full bg-black/10"></div>
			<div className="absolute inset-0 w-full h-full bg-green-800/40"></div>
		</div>
		
		<div className="h-screen flex-1 bg-green-50 flex flex-col items-center justify-center">
			<div className="flex flex-col items-center mx-2 my-8">
				<img className="w-16 mb-2 " title="brand logo" src="https://static-task-assets.react-formula.com/capstone_logo_dark.png" />
				<div className="font-playfair text-emerald-700 text-2xl">
					Rica's Plants
				</div>
			</div>
			
			{children}
		</div>
	</div>
}

export default FormContainer
