
const FeatureItem = ({image, title, desc}) => {
	return <div className="m-8 w-[300px]">
		<div><img className="w-[120px]" src={image} /></div>
		<div className="mt-4 mb-2 font-ubuntu text-2xl">{title}</div>
		<div className="font-roboto text-slate-600">{desc}</div>
	</div>
}

export default FeatureItem
