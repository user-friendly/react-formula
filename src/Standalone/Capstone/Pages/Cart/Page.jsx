
import _ from 'lodash'

import {useContext} from 'react'

import SessionContext from '#cap/Context/Session'

import RedirectAuthenticated from '#cap/Components/RedirectAuthenticated'

import NavHeader from '#cap/Components/NavHeader'
import {Section, Heading, Paragraph} from '#cap/Components/Text'

import {ItemList} from '#cap/Components/Cart'

const REFRESHING_STATE = 1

const Page = () => {
	const session = useContext(SessionContext)
	
	return <RedirectAuthenticated not path="/sign-in">
		<NavHeader />
		<Section className="py-24 flex justify-center">
			<div className="w-full max-w-5xl">
				<Heading className="px-8 text-4xl">
					{_.get(session, "data.username")}'s Cart
				</Heading>
				
				<ItemList />
			</div>
		</Section>
	</RedirectAuthenticated>
}

export default Page

