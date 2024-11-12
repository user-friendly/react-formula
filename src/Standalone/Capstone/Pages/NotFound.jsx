
import NavHeader from '#cap/Components/NavHeader'

const NotFound = () => {
	return <div className="h-screen bg-rose-50 flex flex-col">
		<NavHeader />
		<div className="pt-36 flex flex-col justify-center items-center">
			{/* The <br /> is silly. */}
			<h1 className="my-3 px-3 text-4xl text-center">Error 404: <br className="sm:hidden" /> Page Not Found</h1>
			<p className="py-3 px-8 max-w-xl">
				The page you requested was not found. Please, contact the webadmin if this is a real issue.
				You might also be a snowflake if you contact the webadmin.
			</p>
		</div>
	</div>
}

export default NotFound
