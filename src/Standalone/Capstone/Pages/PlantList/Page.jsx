
import {useContext, useEffect, useState} from 'react'

import {ApiGetPlants} from  '#cap/Services'
import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'
import NavHeader from '#cap/Components/NavHeader'
import Spinner from '#cap/Components/Spinner'

import SessionContext from '#cap/Context/Session'

const Page = () => {
	const session = useContext(SessionContext)
	const [list, setList] = useState(null)
	const [status, setStatus] = useState({error: false})
	
	const refreshList = async () => {
		setList(null)
		const result = await ApiGetPlants(session?.data)
		if (result.error === false) {
			setList(result.data)
		} else {
			console.error(`Failed to get plants list. Response:`, result)
		}
		setStatus(result)
	}
	
	useEffect(() => {
		refreshList()
	}, [session.data])
	
	const PlantItem = (props) => {
		const {data} = props
		
		return <div className="my-4 p-3 border rounded-lg">
			<div>{data.name}</div>
			
			<img className="my-4 max-w-48 object-cover rounded-md" alt={data.description} src={data.image} />
			
			<div>
				{data.description}
			</div>	
		</div>
	}
	
	return <RedirectAuthenticated not path="/sign-in">
		<NavHeader />
		<div className="py-12 flex flex-col justify-center items-center">
			{status?.error !== false && (
				<div className="mb-8 px-2 py-1 bg-rose-100 border border-rose-300 rounded-lg text-red-600 font-medium">
					{status.message}
				</div>
			)}
			<div>
				{(list && list.map((plant, key) => <PlantItem key={key} data={plant} />))
					|| (status?.error === false && <Spinner />)}
				<br />
				<button onClick={refreshList} className="px-2 py-1 border rounded-md bg-emerald-50">Refresh</button>
			</div>
		</div>
	</RedirectAuthenticated>
}

export default Page
