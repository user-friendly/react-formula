
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

		<Deck52.AceOfHearts flip={true} />
		<Deck52.AceOfDiamonds flip={true} />
		<Deck52.AceOfSpades flip={true} />
		<Deck52.AceOfClubs flip={true} />
		
		<Deck52.QueenOfHearts flip={true} />
		<Deck52.QueenOfDiamonds flip={true} />
		<Deck52.QueenOfSpades flip={true} />
		<Deck52.QueenOfClubs flip={true} />
		
		<Deck52.KingOfHearts flip={true} />
		<Deck52.KingOfDiamonds flip={true} />
		<Deck52.KingOfSpades flip={true} />
		<Deck52.KingOfClubs flip={true} />
		
		<Deck52.JackOfHearts flip={true} />
		<Deck52.JackOfDiamonds flip={true} />
		<Deck52.JackOfSpades flip={true} />
		<Deck52.JackOfClubs flip={true} />
	</div>
}
