
import _ from 'lodash'
import clsx from 'clsx'

import {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import SessionContext from '#cap/Context/Session'
import {ApiGetPlant} from  '#cap/Services'

import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'

import NavHeader from '#cap/Components/NavHeader'
import Spinner from '#cap/Components/Spinner'
import Icon from '#cap/Components/Icon'
import {Section, Heading, Paragraph} from '#cap/Components/Text'

const REFRESHING_STATE = 1

const Page = () => {
	const session = useContext(SessionContext)
	const {uuid} = useParams()
	const [plant, setPlant] = useState(null)
	const [status, setStatus] = useState({error: false})

	const fetchPlant = async () => {
		if (plant === REFRESHING_STATE) {
			return
		}
		setStatus({error: false})
		setPlant(REFRESHING_STATE)
		const result = await ApiGetPlant(session?.data, uuid)
		if (result.error === false) {
			setPlant(result.data)
		} else {
			console.error(`Failed to get plants list. Response:`, result)
			setPlant(null)
		}
		setStatus(result)
	}

	useEffect(() => {
		fetchPlant()
	}, [session.data])
	
	const spinner = <div className="flex justify-center"><Spinner className="mt-28" /></div>
	
	return <RedirectAuthenticated not path="/sign-in">
		<NavHeader />
		<Section className="py-24 px-8 w-full max-w-5xl">
			{status?.error !== false && (
				<div className="px-2 py-1 m-auto text-center max-w-80 bg-rose-100 border border-rose-300 rounded-lg text-red-600 font-medium">
					{status.message}
					<br />
					<button onClick={() => fetchPlant()} className="px-2 py-1 border border-gray-600 rounded-md">Retry?</button>
				</div>
			)}
			{_.isObject(plant) && (
				<div className="flex">
					<img className="w-96 rounded-lg" title={plant.botanical_name} src={plant.images[0].src} />
					<div className="ml-8 flex flex-col">
						<Heading className="text-4xl flex justify-between">
							<span>{plant.name}</span>
							<span>${plant.price}</span>
						</Heading>
						<span className="mt-2 italic text-gray-400">{plant.botanical_name}</span>
						<Paragraph className="text-gray-600">{plant.description}</Paragraph>
					</div>
				</div>
			) || (status?.error === false && spinner)}
		</Section>
	</RedirectAuthenticated>
}

export default Page