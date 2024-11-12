
import {useContext, useEffect, useState} from 'react'

import {ApiGetPlants} from  '#cap/Services'
import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'
import NavHeader from '#cap/Components/NavHeader'

import SessionContext from '#cap/Context/Session'

const Page = () => {
	const session = useContext(SessionContext)
	const [list, setList] = useState([])
	
	useEffect(() => {
		(async () => {
			const result = await ApiGetPlants(session?.data)
			if (result.error === false) {
				console.log(result)
			} else {
				console.error(`Failed to get plants list. Response:`, result)
			}
		})()
	}, [session.data])
	
	return <RedirectAuthenticated not path="/sign-in">
		<NavHeader />
		<div className="h-screen flex flex-col justify-center items-center">
			Plant List
		</div>
	</RedirectAuthenticated>
}

export default Page
