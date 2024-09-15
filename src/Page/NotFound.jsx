/**
 * 404 page.
 */

import Router from '#Router'

const NotFound = () => {
	// console.log('Render 404 page.')

	return <div	className="
		py-2 px-4

		text-xl
		font-bold
		font-mono
		
		rounded-xl bg-orange-500
	">
		Page not found!
	</div>
}

Router.setNotFound(<NotFound />, "Page Not Found")

export default NotFound
