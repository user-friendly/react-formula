
import _ from 'lodash'

import {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router'

import SessionContext from '#cap/Context/Session'
import {ApiGetPlant} from  '#cap/Services'

import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'

import {useDocumentTitle} from '#cap/DocumentTitle'

import NavHeader from '#cap/Components/NavHeader'
import Spinner from '#cap/Components/Spinner'
import {Section} from '#cap/Components/Text'

import PlantInfo from './PlantInfo'

const REFRESHING_STATE = 1

const Page = () => {
	const session = useContext(SessionContext)
	const {uuid} = useParams()
	const [plant, setPlant] = useState(null)
	const [status, setStatus] = useState({error: false})
	
	const [title, setTitle] = useDocumentTitle()

	const fetchPlant = async () => {
		if (plant === REFRESHING_STATE) {
			return
		}
		setStatus({error: false})
		setPlant(REFRESHING_STATE)
		const result = await ApiGetPlant(session?.data, uuid)
		if (result.error === false) {
			setTitle(result.data.name)
			setPlant(result.data)
		} else {
			console.error(`Failed to get plants list. Response:`, result)
			setPlant(null)
		}
		setStatus(result)
	}

	useEffect(() => {
		fetchPlant()
	}, [session.data, uuid])
	
	const spinner = <div className="flex justify-center"><Spinner className="mt-28" /></div>
	
	return <RedirectAuthenticated not path="/sign-in">
		<NavHeader />
		<Section className="py-24 px-8 flex justify-center">
			{status?.error !== false && (
				<div className="px-2 py-1 m-auto text-center max-w-80 bg-rose-100 border border-rose-300 rounded-lg text-red-600 font-medium">
					{status.message}
					<br />
					<button onClick={() => fetchPlant()} className="px-2 py-1 border border-gray-600 rounded-md">Retry?</button>
				</div>
			)}
			{_.isObject(plant) && (
				<PlantInfo plant={plant} />
			) || (status?.error === false && spinner)}
		</Section>
	</RedirectAuthenticated>
}

export default Page
