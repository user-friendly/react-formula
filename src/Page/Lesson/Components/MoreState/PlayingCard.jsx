import _ from 'lodash'

import {useState} from 'react'

import {default as Card, Deck52} from './Card'

export default ({children}) => {
	function pickRandomSuitCard(rank, key, flip = true) {
		switch (_.random(0, 3)) {
			case 0:
				return <Deck52.Spade rank={rank} flip={flip} key={key} />
				break
			case 1:
				return <Deck52.Heart rank={rank} flip={flip} key={key} />
				break
			case 2:
				return <Deck52.Diamond rank={rank} flip={flip} key={key} />
				break
			case 3:
				return <Deck52.Club rank={rank} flip={flip} key={key} />
				break
		}
		return <Deck52.Heart rank={rank} flip={flip} key={key} />
	}

	function randomSuitCards(n) {
		return _.range(0, n).map((i) => pickRandomSuitCard(i + 1, i))
	}

	return (
		<div className="flex flex-row flex-wrap justify-center items-start gap-2">
			{/*<Card flip={true} />*/}

			{randomSuitCards(10)}

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

			{pickRandomSuitCard(10, undefined, false)}
			{pickRandomSuitCard(11, undefined, false)}
			{pickRandomSuitCard(12, undefined, false)}

			<Deck52.AceOfHearts />
		</div>
	)
}
