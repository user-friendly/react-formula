
import _ from 'lodash'
import clsx from 'clsx'

import {useContext, useEffect, useState, useRef} from 'react'

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
	const itemsContRef = useRef(null)
	
	const refreshList = async () => {
		if (list === REFRESHING_STATE) {
			return
		}
		setStatus({error: false})
		setList(REFRESHING_STATE)
		const result = await ApiGetPlants(session?.data)
		if (result.error === false) {
			setList(result.data)
		} else {
			console.error(`Failed to get plants list. Response:`, result)
			setList(null)
		}
		setStatus(result)
	}
	
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => entries.forEach((entry, index) => {
				if (entry.isIntersecting && entry.target.classList.contains('plantItem')) {
					console.log('show element')
					entry.target.classList.remove('invisible')
					entry.target.classList.add('animate-slideDown')
				}
			}),
			{threshold: 0.1}
		)
		
		const children = itemsContRef.current?.children
		if (children) {
			Array.from(children).forEach((child) => observer.observe(child))
		}
		
		return () => observer.disconnect()
	}, [list])
	
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
			<div className="w-full max-w-5xl">
				<Heading className="px-8 text-4xl">
					Plants In Stock <button onClick={() => refreshList()}>{refreshIcon}</button>
				</Heading>
				<div ref={itemsContRef} className="flex flex-wrap justify-center">
					{(_.isArray(list) && list.map((plant, i) => <PlantItem key={plant.id} data={plant} />))
						|| (status?.error === false && spinner)}
				</div>
				{status?.error !== false && (
					<div className="px-2 py-1 max-w-80 bg-rose-100 border border-rose-300 rounded-lg text-red-600 font-medium">
						{status.message}
					</div>
				)}
			</div>
		</Section>
	</RedirectAuthenticated>
}

export default Page
