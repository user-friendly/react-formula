
import _ from 'lodash'

import { useState } from 'react'

import Front from './Front'
import Back from './Back'

// Suits.
const [spade, heart, diamond, club] = [
	'♠', '♥', '♦', '♣'
]

// Faces.
const [ace, king, queen, jack] = [
	'A', '🤴', '👸', 'J'
]

// Suit range.
const deck = _.range(2, 11)

// Deck size.
const deckSize = deck.length * 4 + 16

const Card = ({children, suit=heart, rank=2, face=false, flip=false}) => {
	const [isFlipped, setFlipped] = useState(flip)
	
	const card = isFlipped ?
		<Front suit={suit} rank={rank} face={face} /> :
		<Back /> 
	
	return <div className="
		rounded-lg border-4 border-gray-600 w-40 h-64
		cursor-pointer overflow-hidden select-none
	" onClick={e => setFlipped(!isFlipped)}>
		{card}
	</div>
}

const Spade = ({children, rank=2, flip=false}) => {
	return <Card suit={spade} rank={rank} face={false} flip={flip} />
}
const Heart = ({children, rank=2, flip=false}) => {
	return <Card suit={heart} rank={rank} face={false} flip={flip} />
}
const Diamond = ({children, rank=2, flip=false}) => {
	return <Card suit={diamond} rank={rank} face={false} flip={flip} />
}
const Club = ({children, rank=2, flip=false}) => {
	return <Card suit={club} rank={rank} face={false} flip={flip} />
}

const SpadeQueen = ({children, flip=false}) => {
	return <Card suit={spade} rank={0} face={queen} flip={flip} />
}

export default Card
export { Spade, Heart, Diamond, Club }
export { SpadeQueen }
