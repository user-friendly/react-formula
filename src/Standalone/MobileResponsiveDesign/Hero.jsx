
import {Link} from 'react-router-dom'

const Hero = () => {
	return <div className="flex justify-evenly">
		<div className="max-w-80">
			Something <span className="text-amber-400">Catchy</span> and <span className="text-red-400">Technological</span>
			<Link to="#" className="">Learn More</Link>
		</div>
		
		<div className="max-w-80">
			<img src="https://static-task-assets.react-formula.com/963190.png" title="Hashtag" />
		</div>
	</div>
}

export default Hero
