
import _ from 'lodash'

// Suit/face & rank corner.
const CardLabel = ({rank, suit, face}) => {
	rank = face === false ? rank : 
		(<span className="font-noto">{face}</span>)
	
	return <div className="flex flex-col justify-start items-center">
		<span className="text-2xl">{rank}</span>
		<span className="text-xl font-noto">{suit}</span>
	</div>
}

const RankHeader = ({suit, rank, face}) => {
	if (rank > 1 && rank < 8) { 
		return <div className="text-3xl font-noto pt-4">
			<span>{suit}</span>
		</div>
	} else if (rank >= 8) {
		return <div className="text-3xl font-noto pt-4 flex-1 flex flex-row justify-between">
			<span>{suit}</span>
			<span>{suit}</span>
		</div>
	} else {
		return <></>
	}
}

const CenterRow = ({children}) => {
	return <div className="text-3xl font-noto flex flex-row justify-evenly items-center">
		{children}
	</div>
}

const RankCenter = ({suit, rank, face, isSuitFace=false}) => {
	if (face !== false && isSuitFace === false) {
		return <div className="text-6xl font-noto flex justify-center items-center">{face}</div>
	} else if (rank <= 1) {
		return <div className="text-6xl font-noto flex justify-center items-center">{suit}</div>
	}
	
	// Subtract the two header/footer ranks.
	rank -= 2
	
	let suitLabel = <span>{suit}</span>
	let output = null

	switch (rank) {
		case 1:
			output = <CenterRow>{suitLabel}</CenterRow>
		break;
		case 2:
			output = <CenterRow>{suitLabel}{suitLabel}</CenterRow>
		break;
		case 3:
			output = <CenterRow>{suitLabel}{suitLabel}{suitLabel}</CenterRow>
		break;
		case 4:
			output = <>
				<CenterRow>{suitLabel}{suitLabel}</CenterRow>
				<CenterRow>{suitLabel}{suitLabel}</CenterRow>
			</>
		break;
		case 5:
			output = <>
				<CenterRow>{suitLabel}{suitLabel}</CenterRow>
				<CenterRow>{suitLabel}</CenterRow>
				<CenterRow>{suitLabel}{suitLabel}</CenterRow>
			</>
		break;
		case 6:
			output = <>
				<CenterRow>{suitLabel}</CenterRow>
				<CenterRow>{suitLabel}{suitLabel}</CenterRow>
				<CenterRow>{suitLabel}</CenterRow>
			</>
		break;
		case 7:
			output = <>
				<CenterRow>{suitLabel}</CenterRow>
				<CenterRow>{suitLabel}{suitLabel}{suitLabel}</CenterRow>
				<CenterRow>{suitLabel}</CenterRow>
			</>
		break;
		case 8:
			output = <>
				<CenterRow>{suitLabel}{suitLabel}{suitLabel}</CenterRow>
				<CenterRow>{suitLabel}{suitLabel}{suitLabel}</CenterRow>
			</>
		break;
	}
	
	return <>{output}</>
}

// Rank should be guaranteed to be greater than 0, by the main component.
export default ({children, suit, rank, face=false, isSuitFace=false}) => {
	return <div className="
		h-full flex flex-col justify-between items-strech
		p-1 bg-neutral-100
	">
		<div className="flex flex-row justify-between items-center">
			{/* top left */}
			<CardLabel rank={rank} suit={suit} face={face} />
			
			<RankHeader rank={rank} suit={suit} face={face} />
			
			{/* top right */}
			<CardLabel rank={rank} suit={suit} face={face} />
		</div>
		
		{/* Can hold max 12 of suit icons. */}
		<RankCenter rank={rank} suit={suit} face={face} isSuitFace={isSuitFace} />

		<div className="rotate-180 flex flex-row justify-between items-center">
			{/* bottom left */}
			<CardLabel rank={rank} suit={suit} face={face} />
			
			<RankHeader rank={rank} suit={suit} />
			
			{/* bottom right */}
			<CardLabel rank={rank} suit={suit} face={face} />
		</div>
	</div>
}
