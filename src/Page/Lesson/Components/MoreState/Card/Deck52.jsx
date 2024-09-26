
import _ from 'lodash'

import Card from './index'

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

// Ranked suits
export const Spade = ({children, rank=2, face=false, isSuitFace=false, flip=false}) => {
	return <Card suit={spade} rank={rank} face={face} isSuitFace={isSuitFace} flip={flip} />
}
export const Heart = ({children, rank=2, face=false, isSuitFace=false, flip=false}) => {
	return <Card suit={heart} rank={rank} face={face} isSuitFace={isSuitFace} flip={flip} />
}
export const Diamond = ({children, rank=2, face=false, isSuitFace=false, flip=false}) => {
	return <Card suit={diamond} rank={rank} face={face} isSuitFace={isSuitFace} flip={flip} />
}
export const Club = ({children, rank=2, face=false, isSuitFace=false, flip=false}) => {
	return <Card suit={club} rank={rank} face={face} isSuitFace={isSuitFace} flip={flip} />
}

// Queens
export const QueenOfSpades = ({children, flip=false}) => {
	return <Spade rank={0} face={queen} flip={flip} />
}
export const QueenOfHearts = ({children, flip=false}) => {
	return <Heart rank={0} face={queen} flip={flip} />
}
export const QueenOfDiamonds = ({children, flip=false}) => {
	return <Diamond rank={0} face={queen} flip={flip} />
}
export const QueenOfClubs = ({children, flip=false}) => {
	return <Club rank={0} face={queen} flip={flip} />
}

// Kings
export const KingOfSpades = ({children, flip=false}) => {
	return <Spade rank={0} face={king} flip={flip} />
}
export const KingOfHearts = ({children, flip=false}) => {
	return <Heart rank={0} face={king} flip={flip} />
}
export const KingOfDiamonds = ({children, flip=false}) => {
	return <Diamond rank={0} face={king} flip={flip} />
}
export const KingOfClubs = ({children, flip=false}) => {
	return <Club rank={0} face={king} flip={flip} />
}

// Jacks
export const JackOfSpades = ({children, flip=false}) => {
	return <Spade rank={0} face={jack} flip={flip} />
}
export const JackOfHearts = ({children, flip=false}) => {
	return <Heart rank={0} face={jack} flip={flip} />
}
export const JackOfDiamonds = ({children, flip=false}) => {
	return <Diamond rank={0} face={jack} flip={flip} />
}
export const JackOfClubs = ({children, flip=false}) => {
	return <Club rank={0} face={jack} flip={flip} />
}

// Aces
export const AceOfSpades = ({children, flip=false}) => {
	return <Spade rank={0} face={ace} isSuitFace={true} flip={flip} />
}
export const AceOfHearts = ({children, flip=false}) => {
	return <Heart rank={0} face={ace} isSuitFace={true} flip={flip} />
}
export const AceOfDiamonds = ({children, flip=false}) => {
	return <Diamond rank={0} face={ace} isSuitFace={true} flip={flip} />
}
export const AceOfClubs = ({children, flip=false}) => {
	return <Club rank={0} face={ace} isSuitFace={true} flip={flip} />
}

export default () => {
	return <></>
}
