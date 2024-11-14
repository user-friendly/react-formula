
import _ from 'lodash'
import clsx from 'clsx'

import {useContext, useEffect, useState} from 'react'

import SessionContext from '#cap/Context/Session'
import {ApiGetPlants} from  '#cap/Services'

import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'

import NavHeader from '#cap/Components/NavHeader'
import Spinner from '#cap/Components/Spinner'
import Icon from '#cap/Components/Icon'
import {Section, Heading} from '#cap/Components/Text'

import PlantItem from './PlantItem'

const REFRESHING_STATE = 1

const Page = () => {
	const session = useContext(SessionContext)
	const [list, setList] = useState(null)
	const [status, setStatus] = useState({error: false})
	
	const refreshList = async () => {
		if (list === REFRESHING_STATE) {
			return
		}
		setList(REFRESHING_STATE)
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
	
	const refreshIcon = <Icon name="refresh" className={clsx('rounded-full', 
		list === REFRESHING_STATE && 'animate-spinOnce'
	)} />
	const spinner = <Spinner className="mt-28" />
	
	return <RedirectAuthenticated not path="/sign-in">
		<NavHeader />
		<Section className="py-24 flex justify-center">
			{status?.error !== false && (
				<div className="mb-8 px-2 py-1 bg-rose-100 border border-rose-300 rounded-lg text-red-600 font-medium">
					{status.message}
				</div>
			)}
			<div className="w-full max-w-5xl">
				<Heading className="text-4xl">
					Plants In Stock <button onClick={() => refreshList()}>{refreshIcon}</button>
				</Heading>
				<div className="flex flex-wrap justify-center">
					{(_.isArray(list) && list.map((plant, i) => <PlantItem key={plant.id} data={plant} />))
						|| (status?.error === false && spinner)}
				</div>
			</div>
		</Section>
	</RedirectAuthenticated>
}

export default Page
