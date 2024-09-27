/**
 * Bannerlord planner.
 */

import Router from '#Router'

import { SkillGroup } from './Components/Bannerlord'

const Bannerlord = () => {
	return <div className="
		py-2 px-4 rounded-xl bg-slate-300 md:w-[720px] mx-auto
	">
		<h1 className="my-2 text-center text-2xl">Bannerlord Perks Checklist</h1>
		
		<h2 className="text-xl mb-2">Important skills to pick:</h2>
		
		<form>
			<h3>Two Handed</h3>
			<div className="pl-3 flex flex-col justify-start items-start">
				<label className="cursor-pointer">
					<input className="cursor-pointer" name="wood_chopper" type="checkbox" defaultChecked={true} /> Wood Chopper
				</label>
				<label className="cursor-pointer">
					<input name="on_the_edge" type="checkbox" /> On the Edge
				</label>
			</div>
			
			<SkillGroup title="Bow" />
		</form>
	</div>
}

Router.setRoute('/bannerlord', <Bannerlord />)

export default Bannerlord
