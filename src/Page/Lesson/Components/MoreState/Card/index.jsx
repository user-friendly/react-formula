import _ from 'lodash'

import {useState} from 'react'

import Front from './Front'
import Back from './Back'

// TODO Could the isSuitFace property be part of a context?

const Card = ({
	children,
	suit = heart,
	rank = 1,
	face = false,
	isSuitFace = false,
	flip = false,
}) => {
	const [isFlipped, setFlipped] = useState(flip)

	if (!_.isInteger(rank) || rank < 1) {
		rank = 1
	}

	const card = isFlipped ? (
		<Front suit={suit} rank={rank} face={face} isSuitFace={isSuitFace} />
	) : (
		<Back />
	)

	return (
		<div
			className="
		rounded-lg border-4 border-gray-600 w-40 h-64
		cursor-pointer overflow-hidden select-none
	"
			onClick={(e) => setFlipped(!isFlipped)}
		>
			{card}
		</div>
	)
}

export * as Deck52 from './Deck52'
export default Card
