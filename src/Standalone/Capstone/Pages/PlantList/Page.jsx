
import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'

import NavHeader from '#cap/Components/NavHeader'

const Page = () => {
	return <RedirectAuthenticated not path="/sign-in">
		<NavHeader />
		<div className="h-screen flex flex-col justify-center items-center">
			Plant List
		</div>
	</RedirectAuthenticated>
}

export default Page
