
import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'

import NavHeader from '#cap/Components/NavHeader'

const Home = () => {
	return <RedirectAuthenticated not path="/sign-in">
		<RedirectAuthenticated path="/plants"></RedirectAuthenticated>
		<div className="min-h-screen">
			<NavHeader />
			<div>
				[UNDER CONSTRUCTION]
				<br />
				[HOME PAGE]
			</div>
		</div>
	</RedirectAuthenticated>
}

export default Home
