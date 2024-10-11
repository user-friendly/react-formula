import {useState} from 'react'

import Form from './Components/Form'

const CatItem = (props) => {
	const {cat} = props

	return (
		<div className="relative z-[1] flex flex-col items-center rounded-lg bg-white h-56 max-w-lg w-full my-8">
			<div className="ml-36 flex items-end flex-1 pb-4 rounded-t-md max-w-[260px] w-full">
				<div className="relative">
					<div className="absolute block -skew-y-3 -inset-1 bg-rose-300"></div>
					<div className="relative text-3xl font-medium text-violet-700">
						{cat.name}
					</div>
				</div>
				<div className="ml-6 text-xl text-neutral-400">age {cat.age}</div>
			</div>
			<div className="relative z-[-1] flex bg-violet-700 w-full rounded-b-md pb-4 pl-6 pr-2">
				<div className="-mt-[80px] rounded-full overflow-clip shadow-inner w-32 h-32 border-4 border-white">
					<img className="relative z-[-1]" src={cat.imageUrl} />
				</div>
				<div className="mx-10 max-w-[260px] w-full py-4">
					<div className="text-lg text-teal-100">{cat.bio}</div>
				</div>
			</div>
			<i className="absolute scale-150 rotate-45 top-9 right-7 text-transparent/10 text-8xl">
				🐾
			</i>
		</div>
	)
}

export default () => {
	const [cats, setCats] = useState(initialCats)

	const [name, setName] = useState('')
	const [age, setAge] = useState(1)
	const [imageUrl, setImageUrl] = useState('')
	const [bio, setBio] = useState('')

	const catItems = cats.map((cat, idx) => <CatItem key={idx} cat={cat} />)

	const submitHandler = (e) => {
		e.preventDefault()
		console.log('new cat posted')
		setCats([
			{
				name: name,
				age: age,
				imageUrl: imageUrl,
				bio: bio,
			},
			...cats,
		])
		setName('')
		setAge(1)
		setImageUrl('')
		setBio('')
	}

	return (
		<div className="flex flex-col items-center justify-center py-10 bg-indigo-50">
			<Form
				onSubmit={submitHandler}
				className="flex flex-col bg-slate-50 rounded-lg overflow-clip shadow-lg min-w-96"
			>
				<h3 className="bg-purple-400 text-white text-center py-2 text-xl">
					Create a Cat Profile
				</h3>

				<div className="flex flex-col p-4">
					<div className="flex flex-col">
						<label htmlFor="name" className="text-slate-500 mx-2">
							Name
						</label>
						<input
							name="name"
							id="name"
							type="text"
							placeholder="name"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="m-2 p-2 rounded-md text-sm border border-slate-200"
						/>
					</div>

					<div className="flex">
						<div className="flex flex-col">
							<label htmlFor="age" className="text-slate-500 mx-2">
								Age
							</label>
							<input
								name="age"
								id="age"
								type="number"
								placeholder="age"
								required
								min={1}
								max={25}
								value={age}
								onChange={(e) => setAge(Number(e.target.value))}
								className="m-2 p-2 rounded-md text-sm border border-slate-200 w-14"
							/>
						</div>

						<div className="flex-1 flex flex-col">
							<label htmlFor="image" className="text-slate-500 mx-2">
								Image URL
							</label>
							<input
								name="image"
								id="image"
								type="text"
								placeholder="https://example.com/cat.png"
								required
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
								className="m-2 p-2 rounded-md text-sm border border-slate-200"
							/>
						</div>
					</div>

					<textarea
						name="bio"
						placeholder="bio"
						row={3}
						className="m-2 p-2 rounded-md text-sm border border-slate-200"
						required
						maxLength={80}
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
				</div>

				<input
					type="submit"
					className="mx-6 mb-4 p-2 bg-rose-200 rounded-md text-purple-800 text-xl cursor-pointer"
					value="Create"
				/>
			</Form>
			<div className="flex flex-col items-center w-full max-w-2xl">
				{catItems}
			</div>
		</div>
	)
}

const initialCats = [
	{
		name: 'Mittens',
		imageUrl: 'https://static-task-assets.react-formula.com/698552.jpg',
		bio: 'Chasing birds and sitting in enclosed spaces',
		age: 4,
	},
	{
		name: 'Biscuit',
		imageUrl: 'https://static-task-assets.react-formula.com/302683.jpg',
		bio: 'Staring out the window, scratching furniture, and treats',
		age: 6,
	},
	{
		name: 'Winnie',
		imageUrl: 'https://static-task-assets.react-formula.com/413459.jpg',
		bio: "Eating catnip and drinking out of cups that aren't hers.",
		age: 11,
	},
	{
		name: 'Tubbs',
		imageUrl: 'https://static-task-assets.react-formula.com/893293.jpg',
		bio: 'Naps in the sunlight, watching animal planet.',
		age: 3,
	},
	{
		name: 'Chester',
		imageUrl: 'https://static-task-assets.react-formula.com/416375.jpg',
		bio: 'Sitting in high places and stretching.',
		age: 8,
	},
	{
		name: 'Mr. Sparkles',
		imageUrl: 'https://static-task-assets.react-formula.com/561625.jpg',
		bio: 'Knocking over things and sleeping in clean laundry.',
		age: 11,
	},
]
