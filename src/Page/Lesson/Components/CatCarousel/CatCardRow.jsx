
const CatCardRow = ({children, label, text}) => {
	return 	<div className="flex flex-row text-neutral-500">
		<div className="mr-2 font-bold w-full max-w-24">{label}</div>
		<div>{text}</div>
	</div>
}

export default CatCardRow
