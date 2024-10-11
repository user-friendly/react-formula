export default ({children}) => {
	const output = messages.map((m, i) => (
		<div key={i} className="flex border border-zinc-300 rounded-lg m-4 p-4">
			<span className="font-bold mr-2">{m.user}:</span>
			{m.text}
		</div>
	))

	return <div className="md:ml-48 md:max-w-xl">{output}</div>
}

const messages = [
	{
		user: 'azab',
		text: 'Hey programmers!',
	},
	{
		user: 'rchenz',
		text: 'sup alvin',
	},
	{
		user: 'misoon',
		text: 'does anyone want to grab coffee on wednesday?',
	},
	{
		user: 'akim',
		text: 'Im down for it! How about 1pm?',
	},
	{
		user: 'rchenz',
		text: 'works for me too.',
	},
	{
		user: 'misoon',
		text: 'sounds good, see yall then',
	},
	{
		user: 'azab',
		text: "I love me some gud coffee, I'll be there.",
	},
	{
		user: 'myoon',
		text: "I'll come a lil later with marcus",
	},
	{
		user: 'marcav',
		text: 'word.',
	},
]
