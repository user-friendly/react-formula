
import {Link} from 'react-router-dom'

const Hero = () => {
	return <div className="flex justify-center">
		<div className="w-full max-w-6xl py-32 px-6 flex flex-col-reverse md:flex-row justify-center items-center">
			<div className="md:max-w-[450px] md:text-5xl text-4xl font-ubuntu font-medium ">
				Something <span className="text-yellow-500">Catchy</span> and <span className="text-red-600">Technological</span>
				<br />
				<Link to="#" className="
					inline-block my-10 py-3 px-12 border-4 border-violet-800 font-medium text-2xl text-violet-600
				">Learn More</Link>
			</div>
			
			<img className="mt-28 mb-16 md:w-[420px] lg:w-[680px] md:m-0"
			 src="https://static-task-assets.react-formula.com/963190.png" title="Hashtag" />
		</div>
	</div>
}

export default Hero
