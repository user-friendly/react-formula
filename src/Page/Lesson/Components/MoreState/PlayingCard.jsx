
import _ from 'lodash'

import { useState } from 'react'

import { default as Card, Deck52 } from './Card'

export default ({children}) => {
	const hand = []
	
	let card = null
	
	for (let i = 0, rank = 1; i < 10; i++, rank++) {
		switch (_.random(0, 3)) {
			case 0:
				card = <Deck52.Spade rank={rank} flip={true} key={i} />
			break;
			case 1:
				card = <Deck52.Heart rank={rank} flip={true} key={i} />
			break;
			case 2:
				card = <Deck52.Diamond rank={rank} flip={true} key={i} />
			break;
			case 3:
				card = <Deck52.Club rank={rank} flip={true} key={i} />
			break;
		}
		
		hand.push(card)
	}
	
	return <div className="flex flex-row flex-wrap justify-center items-start gap-2">
		{/*<Card flip={true} />*/}
		{hand}
		<Deck52.QueenOfSpades flip={true} />
		<Deck52.AceOfDiamonds flip={true} />
	</div>
}
