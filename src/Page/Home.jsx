/**
 * Homepage view.
 */

import Router from '#Router'

// console.log('Execute Home component\'s main JSX file.')

const Home = () => {
	// console.log('Render Home.')
	
	return <div className="
		py-2 px-4
		
		rounded-xl bg-slate-300
	">
		<p>This is just some random text. The first paragraph of many to come.</p>
		<p>Not really that many to come. Just a couple more to come.</p>
		<p>It was a warm spring morning when the sun rose over the misty mountains.</p>
	</div>
}

// window.router.addRoute('/', <Home />)
// window.router.addRoute('/home', <Home />)

Router.addRoute('/', <Home />, "Home")
Router.addRoute('/home', <Home />, "Home")

export default Home
