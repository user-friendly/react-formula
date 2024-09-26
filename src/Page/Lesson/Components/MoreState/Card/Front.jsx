
// import _ from 'lodash'

const RankHeader = ({children, suit, rank}) => {
	if (rank > 0) { 
		return <div className="text-3xl font-noto pt-2">
			<span>{suit}</span>
		</div>
	} else {
		return <></>
	}
}



export default ({children, suit, rank=0, face=false}) => {
	const rankLabel = face === false ? rank : face
	
	return <div className="
		h-full flex flex-col justify-between items-strech
		p-1 bg-neutral-100
	">
		<div className="flex flex-row justify-between items-center">
			{/* top left */}
			<div className="flex flex-col justify-start items-center">
				<span className="text-2xl">{rankLabel}</span>
				<span className="text-lg font-noto">{suit}</span>
			</div>
			
			<RankHeader rank={rank} suit={suit} />
			
			{/* top right */}
			<div className="flex flex-col justify-start items-center">
				<span className="text-2xl">{rankLabel}</span>
				<span className="text-lg font-noto">{suit}</span>
			</div>
		</div>
		
		{/* Can hold max 12 of suit icons. */}
		<div className="text-3xl font-noto flex flex-row flex-wrap justify-evenly items-center">
			<span>{suit}</span>
			<span>{suit}</span>
		</div>
		<div className="text-3xl font-noto flex flex-row flex-wrap justify-evenly items-center">
			<span>{suit}</span>
			<span>{suit}</span>
		</div>

		<div className="rotate-180 flex flex-row justify-between items-center">
			{/* bottom left */}
			<div className="flex flex-col justify-start items-center">
				<span className="text-2xl">{rankLabel}</span>
				<span className="text-lg font-noto">{suit}</span>
			</div>
			
			<RankHeader rank={rank} suit={suit} />
			
			{/* bottom right */}
			<div className="flex flex-col justify-start items-center">
				<span className="text-2xl">{rankLabel}</span>
				<span className="text-lg font-noto">{suit}</span>
			</div>
		</div>
	</div>
}
