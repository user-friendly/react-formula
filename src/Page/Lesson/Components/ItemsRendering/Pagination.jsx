
import { useState } from 'react'

import _ from 'lodash'

const ListItem = ({children, data}) => {
	return <div style={{backgroundImage: `url(${data.image})`}}
		className="w-80 h-80 m-4 bg-cover bg-center rounded-xl flex justify-end items-start"
	>
		<span className="text-white bg-neutral-600/50 backdrop-blur-sm py-1 px-2 m-2 rounded-lg">👍 {data.likes}</span>
	</div>
}

const Pagination = ({children, data, pageSize, onClick}) => {
	if (data.length <= pageSize) {
		return <></>
	}
	
	const pages = _.range(0, Math.ceil(data.length / pageSize))
	
	return <div className="my-3">
		{pages.map(i => 
			<button onClick={e => onClick(e, i)}
				className="text-lg text-white bg-neutral-400 rounded-md px-3 py-1 mx-1"
				key={i}>{i+1}</button>
		)}
	</div>
}

export default ({children, displaySize = 6}) => {
	const [offset, setOffset] = useState(0)
	const [pageSize, setPageSize] = useState(displaySize)
	
	const paginator = <Pagination data={data} pageSize={pageSize} onClick={(e, p) => setOffset(p*pageSize)} />
	
	function updatePageSize(p) {
		setPageSize(p)
		setOffset(0)
	}
	
	const selected = 'text-white border-white bg-neutral-500'
	const notSelected = 'text-neutral-500 border-neutral-400 bg-white'
	
	return <div className="flex flex-col items-center text-neutral-600">
		<div className="text-5xl border-b-4 border-gray-400 pb-3 mb-7">Recent Posts</div>
		
		<div className="text-lg">
			<span>Set page size: </span>
			<button className={`text-lg border rounded-md px-3 py-1 mx-1 ${pageSize == 3 ? selected : notSelected }`}
				onClick={e => updatePageSize(3)}>3</button>
			<button className={`text-lg border rounded-md px-3 py-1 mx-1 ${pageSize == 6 ? selected : notSelected }`}
				onClick={e => updatePageSize(6)}>6</button>
			<button className={`text-lg border rounded-md px-3 py-1 mx-1 ${pageSize == 9 ? selected : notSelected }`}
				onClick={e => updatePageSize(9)}>9</button>
		</div>
		
		{paginator}
		
		{/* Lift this into a seperate component. */}
		<div className="max-w-6xl flex flex-wrap justify-center">
			{data.slice(offset, offset+pageSize).map((d, i) => <ListItem data={d} key={i} />)}
		</div>
		
		{paginator}
	</div>
}

const data = [
  {
    image: "https://static-task-assets.react-formula.com/620703.jpg",
    likes: 40,
  },
  {
    image: "https://static-task-assets.react-formula.com/637483.jpg",
    likes: 2,
  },
  {
    image: "https://static-task-assets.react-formula.com/673623.jpg",
    likes: 40,
  },
  {
    image: "https://static-task-assets.react-formula.com/694141.jpg",
    likes: 12,
  },
  {
    image: "https://static-task-assets.react-formula.com/784727.jpg",
    likes: 17,
  },
  {
    image: "https://static-task-assets.react-formula.com/800329.jpg",
    likes: 67,
  },
  {
    image: "https://static-task-assets.react-formula.com/827185.jpg",
    likes: 32,
  },
  {
    image: "https://static-task-assets.react-formula.com/860270.jpg",
    likes: 17,
  },
  {
    image: "https://static-task-assets.react-formula.com/907236.jpg",
    likes: 41,
  },
  {
    image: "https://static-task-assets.react-formula.com/939149.jpg",
    likes: 28,
  },
  {
    image: "https://static-task-assets.react-formula.com/046182.jpg",
    likes: 42,
  },
  {
    image: "https://static-task-assets.react-formula.com/066153.jpg",
    likes: 10,
  },
  {
    image: "https://static-task-assets.react-formula.com/082276.jpg",
    likes: 4,
  },
  {
    image: "https://static-task-assets.react-formula.com/138329.jpg",
    likes: 8,
  },
  {
    image: "https://static-task-assets.react-formula.com/139042.jpg",
    likes: 30,
  },
  {
    image: "https://static-task-assets.react-formula.com/211968.jpg",
    likes: 75,
  },
  {
    image: "https://static-task-assets.react-formula.com/264229.jpg",
    likes: 42,
  },
  {
    image: "https://static-task-assets.react-formula.com/273019.jpg",
    likes: 12,
  },
  {
    image: "https://static-task-assets.react-formula.com/277583.jpg",
    likes: 8,
  },
  {
    image: "https://static-task-assets.react-formula.com/325532.jpg",
    likes: 13,
  },
  {
    image: "https://static-task-assets.react-formula.com/334386.jpg",
    likes: 27,
  },
  {
    image: "https://static-task-assets.react-formula.com/369453.jpg",
    likes: 31,
  },
  {
    image: "https://static-task-assets.react-formula.com/417436.jpg",
    likes: 85,
  },
  {
    image: "https://static-task-assets.react-formula.com/446533.jpg",
    likes: 33,
  },
  {
    image: "https://static-task-assets.react-formula.com/499455.jpg",
    likes: 32,
  },
  {
    image: "https://static-task-assets.react-formula.com/562342.jpg",
    likes: 75,
  },
];
