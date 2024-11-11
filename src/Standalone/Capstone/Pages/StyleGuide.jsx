
import Icon from '#cap/Components/Icon'

import SignUpPage from '#cap/Pages/Auth/SignUpPage'
import SignInPage from '#cap/Pages/Auth/SignInPage'

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
				<Icon name="account_circle" className="rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 active:bg-amber-300 animate-spin" />
				<Icon name="login" />
				<Icon name="logout" />
				<Icon name="close" className="bg-violet-100 text-violet-700 hover:bg-violet-200 active:bg-violet-300" />
			</div>
		</div>
	</div>
}

export default StyleGuide
