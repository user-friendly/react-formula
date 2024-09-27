/**
 * Skill group.
 */

import Skill from './Skill'

export default ({children, title}) => {
	
	
	return <>
		<h3>{title}</h3>
		<div className="pl-3 flex flex-col justify-start items-start">
			<Skill />
			<Skill />
		</div>
	</>
}
