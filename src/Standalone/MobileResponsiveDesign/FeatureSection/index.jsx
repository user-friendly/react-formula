
import FeatureItem from './FeatureItem'

let data = [{
  image: "https://static-task-assets.react-formula.com/259977.png",
  title: "Safe and Secure",
  description: "We use advanced encryption and will never sell your data, while you are looking.",
	},
	{
  image: "https://static-task-assets.react-formula.com/384389.png",
  title: "Debugging Help",
  description: "When errors occur, we will dispatch a group of skilled coding monkeys to assist.",
  },
  {
  image: "https://static-task-assets.react-formula.com/683765.png",
  title: "Artificially Intelligent",
  description: "We have more than a decade of experience copying from Google.",
  },
  {
  image: "https://static-task-assets.react-formula.com/657689.png",
  title: "Advanced Analytics",
  description: "We actually don't know what this means; but it sells well.",
  },
  {
  image: "https://static-task-assets.react-formula.com/742903.png",
  title: "Cloud Computing",
  description: "50% of the time, our servers are up 100% of the time.",
  },
  {
  image: "https://static-task-assets.react-formula.com/545388.png",
  title: "24/7 Customer Support",
  description: "We have catchy music that we'll play when we put you on hold for hours.",
}]

const FeatureSection = () => {
	return <div className="flex justify-center pb-64">
		<div className="w-full max-w-6xl flex flex-col items-center">
			<div className="px-2 mb-8 text-3xl text-center font-ubuntu">Proudly Disappointing Users, since 2016</div>
			
			<div className="flex flex-wrap justify-center">
				{data.map((i, k) => <FeatureItem key={k} title={i.title} desc={i.description} image={i.image} />)}
			</div>
		</div>
	</div>
}

export default FeatureSection
