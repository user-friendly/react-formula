
import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'

const Page = () => {
	return <RedirectAuthenticated not path="/sign-in">
		<div className="h-screen flex flex-col justify-center items-center">
			Plant List
		</div>
	</RedirectAuthenticated>
}

export default Page
