
import { useState, useEffect } from 'react'

const ENDPOINT_URL = 'https://api.react-formula.com/learning-api/demos/teammates-project/profiles'

const ProfileCard = ({profile}) => {
	return <div className="flex rounded-xl overflow-clip my-4 shadow-md">
		<div className="bg-teal-500 p-3">
			<img className="w-32 rounded-full border-4 border-green-700" src={profile.image} />
		</div>
		<div className="p-4 flex-1 flex flex-col justify-center items-start bg-white">
			<div className="text-2xl text-gray-500">{profile.name}</div>
			<div className="text-lg font-bold text-teal-400">{profile.title}</div>
			<div className="text-gray-500">{profile.email}</div>
		</div>
	</div>
}

export default (props) => {
	const [profiles, setProfiles] = useState([])
	
	const fetchProfiles = () => {
		fetch(ENDPOINT_URL)
			.then(r => r.json())
			.then(d => setProfiles(d))
	}
	
	useEffect(() => {
		fetchProfiles()
		// Cleanup function.
		// return () => {}
	},[])
	
	const items = profiles.map((p, i) => {
		return <ProfileCard profile={p} key={i} />
	})
	
	return <div className="flex flex-col items-center">
		<div className="w-full max-w-lg">
			{items}
		</div>
	</div>
}
