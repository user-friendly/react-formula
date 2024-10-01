
import _ from 'lodash'

// import { useState, useEffect, useId } from 'react'

import TextInput from './Components/TextInput'

const WordItem = ({word}) => {
  return <div className="px-1 m-1 text-sm text-yellow-600 bg-yellow-200 border border-yellow-300">{word}</div>
}

export default ({children}) => {
	const submitHandler = (e) => {
		e.preventDefault()
		console.log(`Post form to API backend.`)
	}
	
	const worditems = words.map((w, i) => {
		return <WordItem word={w} key={i} />
	})
	
	return <div className="flex flex-col items-center">
		<form method="post" action="/" onSubmit={submitHandler}
			className="my-4"
		>
			<TextInput name="search" placeholder="enter a string" delay={500}
				className="px-4 py-2 bg-neutral-300 rounded-xl rounded-r-none outline-none
					border-2 border-r-0 border-transparent focus:border-green-400
				"
			/>
			<input type="submit" value="search"
				className="px-4 py-2 bg-green-400 text-white rounded-xl rounded-l-none cursor-pointer border-2 border-l-0 border-green-400"
			/>
		</form>
		
		<div className="flex flex-wrap justify-center w-full max-w-lg">
	  		{worditems}
		</div>
	</div>
}

const words = [
  "apple",
  "banana",
  "cherry",
  "dog",
  "elephant",
  "guitar",
  "happy",
  "island",
  "jazz",
  "kangaroo",
  "lemon",
  "mountain",
  "notebook",
  "ocean",
  "piano",
  "quasar",
  "rainbow",
  "sunset",
  "tiger",
  "umbrella",
  "balloon",
  "cactus",
  "diamond",
  "firefly",
  "gorilla",
  "hammer",
  "illusion",
  "jungle",
  "kiwi",
  "lighthouse",
  "mermaid",
  "nebula",
  "octopus",
  "parrot",
  "quokka",
  "rocket",
  "sunflower",
  "telescope",
  "unicorn",
  "volcano",
  "finite",
  "whale",
  "xylophone",
  "yoga",
  "zeppelin",
  "acoustic",
  "butterfly",
  "caramel",
  "dolphin",
  "volt",
  "atrition",
  "emerald",
  "abrasion",
  "fountain",
  "zoom",
  "opera",
  "gondola",
  "hologram",
  "outhouse",
  "apprehension",
  "veterinary",
  "infinity",
  "jubilee",
  "kaleidoscope",
  "lullaby",
  "collision",
  "marmalade",
  "nirvana",
  "toga",
  "opal",
  "paradise",
  "volition",
  "veteran",
  "quicksilver",
  "resonance",
  "serendipity",
  "tranquil",
  "utopia",
  "velvet",
  "whisper",
  "obtain",
  "yellow",
  "nose",
  "relaxation",
  "mountain",
  "elapse",
  "zephyr",
  "alchemy",
  "boulevard",
  "microscope",
  "cascade",
  "dandelion",
  "loom",
  "eclipse",
  "fandango",
  "octogon",
  "galaxy",
  "fixation",
  "volitile",
  "harmony",
  "insurmountable",
  "ignition",
  "quickly",
  "foretell",
  "dance",
  "jamboree",
  "kismet",
  "tusk",
  "labyrinth",
  "magnolia",
  "nostalgia",
  "oblivion",
  "paradox",
  "quintessence",
  "radiance",
  "serenity",
  "talisman",
  "universe",
  "lab",
  "vortex",
  "wanderlust",
  "xylograph",
  "yearning",
  "zest",
  "ambrosia",
  "benevolence",
  "celestial",
  "dusk",
];
