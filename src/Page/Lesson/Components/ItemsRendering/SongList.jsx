const SongItem = ({children, song}) => {
	return (
		<div className="m-4 p-4 rounded-lg flex bg-orange-400">
			<div className="text-4xl self-center mr-2">▶</div>
			<div className="text-lg flex-1 flex flex-row justify-between">
				<div className="flex flex-col items-start text-white">
					<span className="text-xl">{song.title}</span>
					<span>{song.artist}</span>
				</div>
				<div className="flex flex-col items-end text-neutral-200">
					<span>{song.album}</span>
					<span>
						{Math.floor(song.duration / 60)}:
						{String(song.duration % 60).padStart(2, '0')}
					</span>
				</div>
			</div>
		</div>
	)
}

export default ({children}) => {
	return (
		<div className="md:self-center md:w-[38rem]">
			{songs.map((s, i) => (
				<SongItem song={s} key={i} />
			))}
		</div>
	)
}

const songs = [
	{
		title: 'Levitating',
		artist: 'Dua Lipa',
		album: 'Future Nostalgia',
		duration: 203,
	},
	{
		title: 'Sulfur',
		artist: 'Slipknot',
		album: 'All Hope is Gone',
		duration: 277,
	},
	{
		title: 'Watermelon Sugar',
		artist: 'Harry Styles',
		album: 'Fine Line',
		duration: 174,
	},
	{
		title: 'Uptown Funk',
		artist: 'Mark Ronson ft. Bruno Mars',
		album: 'Uptown Special',
		duration: 271,
	},
	{
		title: 'Radioactive',
		artist: 'Imagine Dragons',
		album: 'Night Visions',
		duration: 187,
	},
	{
		title: 'Rolling in the Deep',
		artist: 'Adele',
		album: '21',
		duration: 228,
	},
	{
		title: 'Bad Romance',
		artist: 'Lady Gaga',
		album: 'The Fame Monster',
		duration: 295,
	},
	{
		title: 'Memories',
		artist: 'Maroon 5',
		album: 'Memories (Single)',
		duration: 189,
	},
	{
		title: 'Havana',
		artist: 'Camila Cabello ft. Young Thug',
		album: 'Camila',
		duration: 217,
	},
	{
		title: 'Old Town Road',
		artist: 'Lil Nas X ft. Billy Ray Cyrus',
		album: 'Old Town Road (Single)',
		duration: 113,
	},
	{
		title: 'Circles',
		artist: 'Post Malone',
		album: "Hollywood's Bleeding",
		duration: 215,
	},
]
