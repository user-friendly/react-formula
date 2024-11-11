
import Icon from '#cap/Components/Icon'

import SignUpPage from '#cap/Pages/Auth/SignUpPage'
import SignInPage from '#cap/Pages/Auth/SignInPage'

// Make sure the class set in index.css is mentioned here.
const iconStyle = `
	p-2 material-symbols-outlined rounded-lg bg-green-100 select-none cursor-pointer
	hover:bg-green-200 text-green-700
`

const StyleGuide = () => {
	return <div className="p-6 max-w-lg m-auto">
		<h1 className="my-4 text-5xl">Heading</h1>
		
		<div className="my-4 text-xl font-playfair">
			Font Playfair Display test. This here is some random text to test the given font.
		</div>
		
		<div className="my-4 text-xl font-lato">
			Font Lato test. This here is some random text to test the given font. 
		</div>
		
		<div>
			<h2 className="my-4 text-4xl">Icons</h2>
			<div className="flex items-center gap-4">
				<Icon name="menu" />
				<Icon name="home" className="text-4xl" />
				<Icon name="close" className="bg-violet-100 text-violet-700 hover:bg-violet-200" />
			</div>
		</div>
	</div>
}

export default StyleGuide
