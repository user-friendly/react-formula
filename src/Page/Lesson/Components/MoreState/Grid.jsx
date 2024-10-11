import _ from 'lodash'

import {useState} from 'react'

const max = parseInt(480 / 30) ** 2

/*const Square = ({checked = false, onClick}) => {
	return <div onClick={onClick} className={`
		h-[30px] w-[30px] border-r border-b border-black cursor-pointer
	 	${checked ? 'bg-stone-700' : 'bg-stone-300 hover:bg-stone-400'}
		
	`}></div>
}*/

const Square = () => {
	const [checked, setChecked] = useState(false)

	return (
		<div
			onClick={(e) => setChecked(!checked)}
			className={`
		h-[30px] w-[30px] border-r border-b border-black cursor-pointer
	 	${checked ? 'bg-stone-700' : 'bg-stone-300 hover:bg-stone-400'}
	`}
		></div>
	)
}

export default ({children}) => {
	/*	const [map, setMap] = useState({})
	
	const updateHandler = (e, i) => {
		const newMap = {}
		newMap[i] = !map[i]
		setMap(_.create(map, newMap))
	}
	const squares = []
	for (let i = 0; i < max; i++)
		squares.push(<Square key={i} checked={!!map[i]} onClick={e => updateHandler(e, i)} />)*/

	const squares = []
	for (let i = 0; i < max; i++) squares.push(<Square key={i} />)

	return (
		<div
			className="
		self-center w-[481px] h-[481px] border-l border-t border-black
		flex flex-row flex-wrap justify-start items-start
	"
		>
			{squares}
		</div>
	)
}
