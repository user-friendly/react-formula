
import _ from 'lodash'

import { useState } from 'react'

import Card from './Card'
import { Spade, Heart, Diamond, Club } from './Card'
import { SpadeQueen } from './Card'

export default ({children}) => {
	const hand = []
	
	let card = null
	
	for (let i = 0, rank = 2; i < 9; i++, rank++) {
		switch (_.random(0, 3)) {
			case 0:
				card = <Spade rank={rank} flip={true} key={i} />
			break;
			case 1:
				card = <Heart rank={rank} flip={true} key={i} />
			break;
			case 2:
				card = <Diamond rank={rank} flip={true} key={i} />
			break;
			case 3:
				card = <Club rank={rank} flip={true} key={i} />
			break;
		}
		
		hand.push(card)
	}
	
	return <div className="flex flex-row flex-wrap justify-center items-start gap-2">
		{/*<Card flip={true} />*/}
		{hand}
		<SpadeQueen flip={true} />
	</div>
}
