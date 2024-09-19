/**
 * Cat Carousel.
 * 
 * Path: /lesson/cat-carousel
 * 
 * Bundles up a lessons in the More State group.
 */

import { useState } from 'react'

import Router from '#Router'

import CatData from './Components/CatCarousel/CatData'
import CatCard from './Components/CatCarousel/CatCard'
import NavButton from './Components/CatCarousel/NavButton'

const getNext = (index) => {
	if (index >= CatData.length) {
		return CatData.length - 1
	}
	if (index < 0) {
		return 0
	}
	return index
}

const CatCarousel = () => {
	const [cat, setCat] = useState(0)
	
	return <div className="h-full flex flex-col justify-start items-center">
		<h1 className="mb-4 text-4xl">Cat Carousel</h1>
		
		<div className="flex flex-row">
			{ cat > 0 ? (
				<NavButton onClick={e => setCat(getNext(cat - 1))}>⬅</NavButton>
			) : null }
			<CatCard cat={CatData[cat]} />
			<NavButton onClick={e => setCat(getNext(cat + 1))} visible={cat < CatData.length - 1}>➡</NavButton>
		</div>
	</div>
}

Router.setRoute('/lesson/cat-carousel', <CatCarousel />, 'Cat Carousel')
Router.setRoute('/lesson', <CatCarousel />)

export default CatCarousel
