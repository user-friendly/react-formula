/**
 * Perks data.
 * 
 * TODO These are the perks to be picked!.
 * 		Use as template for the complete perks data package.
 */
export default {
	name: 'Skill Perks',
	
	vigour: [
		{
			name: '2H',
			perks: [
				'Wood Chopper',
				'On the Edge',
				'Shield breaker',
				'Terror',
				'Thick Hides',
				'Vandal',
			]
		},
	],
	
	control: [
		{
			name: 'Bow',
			persk: [
				'Dead Aim',
				'Rapid Fire',
				'Merry Men',
				'Skirmish Phase Master',
			],
		},
	],
	
	endurance: [
		{
			name: 'Riding',
			perks: [
				'Nomadic Traditions',
				'Sweeping Wind',
				'Shepherd',
				{ 
					name: 'Mounted Patrols',
					skill: 225,
					comment: 'prisoner escape chance -50% both, party leader and govener',
				},
			],
		},
		{
			name: 'Athletics',
			perks: [
				'Imposing Stature',
				'Durable',
				'Strong',
				'Ignore Pain',
				'Mighty Blow',
			],
		},
		{
			name: 'Smithing',
			perks: [
				'Charcoal Maker',
				'Curious Smelter/Smit',
				'Experienced Smith',
				'Practical Smelter',
				'Vigorous Smith',
				'Practical Smith',
				'Enduring Smith',
				'Sharpened Edge',
			],
		},
	],

	cunning: [
		{
			name: 'Scouting',
			perks: [
				'Day Travler',
				'Desert Born',
				'Forced March',
				'Tracker',
				'Beast Whisperer',
				{
					name: 'Keen Sight',
					skill: 225,
					comment: 'prisoner escape chance -50% both, party leader only',
				},
			],
		},

		{
			name: 'Tactics',
			perks: [
				{
					name: 'Horde Leader',
					skill: 75,
					comment: 'Pick all first row skills',
				},
			],
		},
	],

	social: [
		{
			name: 'Charm',
			perks: [
				'Warlord',
				'Meaningful Favors',
				'Natural Leader',
				'Parade',
				'Immortal Charm',
			],
		},
		{
			name: 'Leadership',
			perks: [
				'Combat Tips',
				'Stout Defender',
				'Loyalty and Honor',
				'Presence',
				'Uplifting Spirit',
				'Lead by Example/Trusted Commander',
				'Talent Magnet',
				'Ultimate Leader (last skill)',
			],
		},
	],

	intelligence: [
		
	],
}





















