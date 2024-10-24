const Title = (props) => {
	return (
		<div className="p-2 m-2 border-4 border-violet-400 text-violet-600">
			<div>Title</div>
			<div className="text-3xl text-center text-black">{props.message}</div>
		</div>
	)
}

export default Title
