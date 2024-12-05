
import _ from 'lodash'
import clsx from 'clsx'

import {useContext, useEffect, useState, useRef} from 'react'

import SessionContext from '#cap/Context/Session'
import {ApiGetPlants} from  '#cap/Services'

import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'

import {useDocumentTitle} from '#cap/DocumentTitle'

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
	
	const [title, setTitle] = useDocumentTitle()
	setTitle('Plant List')
	
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
		let cid = false
		const queue = []
		
		const animate = () => {
			if (cid) {
				return
			}
			const target = queue.shift()
			
			if (target) {
				cid = setTimeout(() => {
					if (target.classList.contains('invisible')) {
						target.classList.remove('invisible')
						target.classList.add('animate-slideLeft')
					}
					
					cid = false
					animate()
				}, 250)
			}
		}
		
		const observer = new IntersectionObserver(
			(entries) => entries.forEach((entry, index) => {
				if (entry.isIntersecting && entry.target.classList.contains('plantItem')
					&& entry.target.classList.contains('invisible')
				) {
					queue.push(entry.target)
					animate()
				}
			}),
			{threshold: 0.1}
		)
		
		const children = itemsContRef.current?.children
		if (children) {
			const vp = window.visualViewport
			
			const collidesWithViewport = (rect) => {
				return rect.bottom > vp.offsetTop &&
					rect.top < vp.offsetTop + vp.height &&
				    rect.right > vp.offsetLeft &&
				    rect.left < vp.offsetLeft + vp.width
			}
			
			Array.from(children).forEach((child) => {
				if (!collidesWithViewport(child.getBoundingClientRect())) {
					observer.observe(child)
				}
				else {
					child.classList.remove('invisible')
				}
			})
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
	
	const message = status?.error !== false && (
		<div className="m-4 p-4 bg-rose-100 border border-rose-300 rounded-lg text-red-600 font-medium text-center">
			{status.message}
		</div>
	)
	
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
				{message}
			</div>
		</Section>
	</RedirectAuthenticated>
}

export default Page
